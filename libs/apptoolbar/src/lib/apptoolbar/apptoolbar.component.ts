import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'ks-apptoolbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './apptoolbar.component.html',
  styleUrl: './apptoolbar.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApptoolbarComponent {}
