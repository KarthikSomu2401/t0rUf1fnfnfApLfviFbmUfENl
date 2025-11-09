import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
  WritableSignal,
} from '@angular/core';
import { ApptoolbarComponent } from '@ks/apptoolbar';
import { StoriesFacade } from '@ks/stories-store';
import { MatSelectModule } from '@angular/material/select';
import {
  computedTimeDifference,
  STORY_TYPE_CHOICES,
  StoryType,
} from '@ks/shared';
import { StoryCardComponent } from '@ks/story-card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ks-dashboard',
  imports: [
    ApptoolbarComponent,
    MatSelectModule,
    StoryCardComponent,
    MatPaginatorModule,
    MatIconModule,
  ],
  providers: [StoriesFacade],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashoardComponent {
  private readonly service = inject(StoriesFacade);

  readonly storiesData = this.service.stories;
  readonly commentsData = this.service.comments;
  readonly count = this.service.count;
  readonly storyTypes = STORY_TYPE_CHOICES;
  readonly storyLimit = [10, 25, 50];

  readonly showComments: WritableSignal<boolean> = signal(false);

  onStorySourceChange = (type: StoryType) => this.service.storyTypechange(type);

  onPageChange = ($event: PageEvent) => this.service.onPageChange($event);

  clicked = (event: number[]) => {
    this.service.fetchComments(event);
    this.showComments.set(true);
  };

  closeComments = () => this.showComments.set(false);

  computedTime = (time: number): string => computedTimeDifference(time);
}
