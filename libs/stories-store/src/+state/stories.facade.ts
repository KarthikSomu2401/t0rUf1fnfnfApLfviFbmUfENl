import { inject } from '@angular/core';
import { StoriesStore } from './stories.store';
import { StoryType } from '@ks/shared';
import { PageEvent } from '@angular/material/paginator';

export class StoriesFacade {
  readonly storiesStore = inject(StoriesStore);
  readonly stories = this.storiesStore.stories;
  readonly comments = this.storiesStore.comments;
  readonly type = this.storiesStore.type;
  readonly count = this.storiesStore.count;

  readonly storyTypechange = (type: StoryType) =>
    this.storiesStore.updateStoryType(type);

  readonly fetchComments = (kids: number[]) =>
    this.storiesStore.fetchComments(kids);

  readonly onPageChange = (event: PageEvent) =>
    this.storiesStore.updatePageEvent(event);
}
