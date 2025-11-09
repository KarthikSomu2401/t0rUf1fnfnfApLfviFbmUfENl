import { signalStore, withHooks, withState } from '@ngrx/signals';
import { IResponse, IStory, StoriesService, StoryType } from '@ks/shared';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { updateStories, withStoriesMethods } from './stories.methods';

export type StoriesState = {
  stories: IStory[];
  comments: IStory[];
  type: StoryType;
  start: number;
  limit: number;
  count: number;
};

export const initialState: StoriesState = {
  stories: [],
  comments: [],
  type: 'top',
  start: 0,
  limit: 10,
  count: 0,
};

export const StoriesStore = signalStore(
  { providedIn: 'root' },
  withState<StoriesState>(initialState),
  withStoriesMethods(),
  withHooks({
    onInit(store, storiesService = inject(StoriesService)) {
      storiesService
        .fetchStories(store.start(), store.limit(), store.type())
        .pipe(tap((stories: IResponse<IStory[]>) => updateStories(store, stories)))
        .subscribe();
    },
  }),
  withDevtools('stories')
);
