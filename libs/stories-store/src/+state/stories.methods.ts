import { updateState } from '@angular-architects/ngrx-toolkit';
import { StoriesState } from './stories.store';
import { IResponse, IStory, StoriesService, StoryType } from '@ks/shared';
import { signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

export const updateStories = (state: any, stories: IResponse<IStory[]>) =>
  updateState<StoriesState>(state, 'Update Stories', {
    stories: stories.data,
    count: stories.status,
  });

export const updateType = (state: any, type: StoryType) =>
  updateState<StoriesState>(state, 'Update Story type', {
    type,
  });

export const updateComments = (state: any, comments: IStory[]) =>
  updateState<StoriesState>(state, 'Update Comments', {
    comments,
  });

export const updatePageStats = (state: any, page: PageEvent) =>
  updateState<StoriesState>(state, 'Update Page Stats', {
    start: page.pageIndex * page.pageSize,
    limit: page.pageSize,
  });

export function withStoriesMethods() {
  return signalStoreFeature(
    { state: type<StoriesState>() },
    withMethods((store, storiesService = inject(StoriesService)) => ({
      updateStoryType: rxMethod<StoryType>(
        pipe(
          switchMap((type: StoryType) =>
            storiesService
              .fetchStories(store.start(), store.limit(), type)
              .pipe(
                tap((stories: IResponse<IStory[]>) => {
                  updateType(store, type);
                  updateStories(store, stories);
                })
              )
          )
        )
      ),
      updatePageEvent: rxMethod<PageEvent>(
        pipe(
          switchMap((page: PageEvent) =>
            storiesService
              .fetchStories(
                page.pageIndex * page.pageSize,
                page.pageSize,
                store.type()
              )
              .pipe(
                tap((stories: IResponse<IStory[]>) => {
                  updatePageStats(store, page);
                  updateStories(store, stories);
                })
              )
          )
        )
      ),
      fetchComments: rxMethod<number[]>(
        pipe(
          switchMap((ids: number[]) =>
            storiesService
              .fetchComments(ids)
              .pipe(
                tap((comments: IStory[]) => updateComments(store, comments))
              )
          )
        )
      ),
    }))
  );
}
