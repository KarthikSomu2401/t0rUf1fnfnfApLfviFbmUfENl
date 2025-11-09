import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoryCardComponent } from './story-card.component';
import { IStory } from '@ks/shared';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('StoryCardComponent', () => {
  let component: StoryCardComponent;
  let fixture: ComponentFixture<StoryCardComponent>;

  const mockStory: IStory = {
    id: 1,
    title: 'Test Story',
    url: 'http://test.com',
    by: 'testuser',
    time: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
    score: 100,
    descendants: 50,
    kids: [2, 3, 4],
    type: 'story',
    text: ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoryCardComponent,
        MatCardModule,
        MatButtonModule,
        MatIconModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StoryCardComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('story', mockStory);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
