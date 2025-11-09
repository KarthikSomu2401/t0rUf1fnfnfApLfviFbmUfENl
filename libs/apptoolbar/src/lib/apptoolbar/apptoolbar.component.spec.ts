import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApptoolbarComponent } from './apptoolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('ApptoolbarComponent', () => {
  let component: ApptoolbarComponent;
  let fixture: ComponentFixture<ApptoolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ApptoolbarComponent,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ApptoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
