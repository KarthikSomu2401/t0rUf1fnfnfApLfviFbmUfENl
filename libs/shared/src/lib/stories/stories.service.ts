import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../constants/url.constants';
import { catchError, forkJoin, map, mergeMap, Observable, of, tap } from 'rxjs';
import { IStory } from '../types/IStory';
import { StoryType } from '../constants/story.types';
import { IResponse } from '../types/IResponse';

@Injectable({
  providedIn: 'root',
})
export class StoriesService {
  private readonly http: HttpClient = inject(HttpClient);

  fetchStories(
    start: number,
    limit: number,
    type: StoryType
  ): Observable<IResponse<IStory[]>> {
    let count = 0;
    return this.http
      .get<number[]>(`${baseURL}${type}stories.json`)
      .pipe(
        catchError((error) => {
          console.error('Failed fetching story IDs', error);
          return of([] as number[]);
        }),
        tap((ids) => (count = ids.length)),
        map((ids) => ids.slice(start, start + limit)),
        map((slicedIds) =>
          slicedIds.map((id) =>
            this.http.get<Partial<IStory>>(`${baseURL}/item/${id}.json`).pipe(
              catchError((error) => {
                console.error(`Failed fetching story ${id}`, error);
                return of({} as Partial<IStory>);
              })
            )
          )
        ),
        mergeMap((requests) => forkJoin(requests)),
        map((stories) => {
          return {
            data: stories.map((story) => this.mapToStory(story)),
            status: count,
          } as IResponse<IStory[]>;
        }),
        catchError((error) => {
          console.error('Failed fetching stories', error);
          return of({ data: [], status: 0 } as IResponse<IStory[]>);
        })
      );
  }

  fetchComments(ids: number[]): Observable<IStory[]> {
    if (!ids || ids.length === 0) {
      return of([]);
    }

    const commentRequests = ids.map((id) =>
      this.http.get<Partial<IStory>>(`${baseURL}/item/${id}.json`)
    );

    return forkJoin(commentRequests).pipe(
      map((comments) => comments.map((comment) => this.mapToStory(comment))),
      catchError((error) => {
        console.error('Error in fetching comments', error);
        return of([] as IStory[]);
      })
    );
  }

  mapToStory(data: Partial<IStory>): IStory {
    return {
      by: data.by || '',
      id: data.id || 0,
      text: data.text || '',
      descendants: data.descendants || 0,
      kids: data.kids || [],
      score: data.score || 0,
      time: data.time || 0,
      title: data.title || '',
      type: data.type || '',
      url: data.url || '',
    };
  }
}
