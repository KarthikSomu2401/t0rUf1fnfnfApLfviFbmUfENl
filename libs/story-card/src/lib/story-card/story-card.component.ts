import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  ViewEncapsulation,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { computedTimeDifference, IStory } from '@ks/shared';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ks-story-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './story-card.component.html',
  styleUrl: './story-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class StoryCardComponent {
  readonly story: InputSignal<IStory> = input.required<IStory>();
  readonly comments: OutputEmitterRef<number[]> = output<number[]>();

  computedTime = (time: number): string => computedTimeDifference(time);
}
