import { ComponentFixture } from '@angular/core/testing';
import { DashoardComponent } from './dashboard.component';
import { StoriesFacade } from '@ks/stories-store';
import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

describe('DashoardComponent', () => {
  let component: DashoardComponent;
  let fixture: ComponentFixture<DashoardComponent>;
  let service: StoriesFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashoardComponent, BrowserModule],
      providers: [
        provideHttpClient(),
        StoriesFacade,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashoardComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(StoriesFacade);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.showComments()).toBe(false);
    expect(component.storyTypes).toBeDefined();
    expect(component.storyLimit).toEqual([10, 25, 50]);
  });


  it('should hide comments panel when closeComments is called', () => {
    component.showComments.set(true);
    component.closeComments();
    expect(component.showComments()).toBe(false);
  });

  it('should compute relative time correctly', () => {
    const now = Math.floor(Date.now() / 1000);
    const hourAgo = now - 3600;
    const result = component.computedTime(hourAgo);
    expect(result).toMatch(/1 hour/);
  });

  describe('Error handling', () => {
    it('should handle errors when fetching comments', () => {
      jest.spyOn(service, 'fetchComments').mockImplementation(() => {
        throw new Error('Failed to fetch comments');
      });

      expect(() => component.clicked([1, 2, 3])).not.toThrow();
      expect(component.showComments()).toBe(true);
    });
  });
});
