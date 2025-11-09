import { TestBed } from '@angular/core/testing';
import { StoriesService } from './stories.service';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../constants/url.constants';
import { of } from 'rxjs';
import { IStory } from '../types/IStory';

describe('StoriesService', () => {
  let service: StoriesService;
  let httpClient: jest.Mocked<HttpClient>;

  const mockStory: IStory = {
    id: 1,
    title: 'Test Story',
    url: 'http://test.com',
    by: 'testuser',
    time: Math.floor(Date.now() / 1000),
    score: 100,
    descendants: 50,
    kids: [2, 3],
    type: 'story',
    text: '',
  };

  const mockComment: IStory = {
    id: 2,
    title: '',
    url: '',
    by: 'commenter',
    time: Math.floor(Date.now() / 1000),
    score: 1,
    descendants: 0,
    kids: [],
    type: 'comment',
    text: 'Test comment',
  };

  beforeEach(() => {
    httpClient = {
      get: jest.fn(),
    } as unknown as jest.Mocked<HttpClient>;

    TestBed.configureTestingModule({
      providers: [
        StoriesService,
        { provide: HttpClient, useValue: httpClient },
      ],
    });

    service = TestBed.inject(StoriesService);
  });

  describe('fetchStories', () => {
    it('should fetch stories with correct pagination', (done) => {
      // Mock story IDs response
      const mockIds = [1, 2, 3, 4, 5];
      httpClient.get.mockImplementation((url: string) => {
        if (url === `${baseURL}topstories.json`) {
          return of(mockIds);
        }
        if (url === `${baseURL}/item/1.json`) {
          return of(mockStory);
        }
        return of(null);
      });

      service.fetchStories(0, 1, 'top').subscribe((response) => {
        expect(httpClient.get).toHaveBeenCalledWith(
          `${baseURL}topstories.json`
        );
        expect(httpClient.get).toHaveBeenCalledWith(`${baseURL}/item/1.json`);
        expect(response.data.length).toBe(1);
        expect(response.status).toBe(5); // Total count
        expect(response.data[0]).toEqual(
          expect.objectContaining({
            id: mockStory.id,
            title: mockStory.title,
          })
        );
        done();
      });
    });
  });

  describe('fetchComments', () => {
    it('should fetch multiple comments', (done) => {
      const commentIds = [2, 3];
      httpClient.get.mockImplementation((url: string) => {
        if (url.includes('/2.json')) {
          return of(mockComment);
        }
        if (url.includes('/3.json')) {
          return of({ ...mockComment, id: 3 });
        }
        return of(null);
      });

      service.fetchComments(commentIds).subscribe((comments) => {
        expect(comments.length).toBe(2);
        expect(comments[0].id).toBe(2);
        expect(comments[1].id).toBe(3);
        expect(httpClient.get).toHaveBeenCalledTimes(2);
        done();
      });
    });

    it('should return empty array for empty comment ids', (done) => {
      service.fetchComments([]).subscribe((comments) => {
        expect(comments).toEqual([]);
        expect(httpClient.get).not.toHaveBeenCalled();
        done();
      });
    });

    it('should return empty array for null comment ids', (done) => {
      service
        .fetchComments(null as unknown as number[])
        .subscribe((comments) => {
          expect(comments).toEqual([]);
          expect(httpClient.get).not.toHaveBeenCalled();
          done();
        });
    });
  });

  describe('mapToStory', () => {
    it('should map complete story data', () => {
      const result = service.mapToStory(mockStory);
      expect(result).toEqual(mockStory);
    });

    it('should provide default values for missing fields', () => {
      const partialStory = {
        id: 1,
        title: 'Test',
      };

      const result = service.mapToStory(partialStory);

      expect(result).toEqual({
        id: 1,
        title: 'Test',
        url: '',
        by: '',
        time: 0,
        score: 0,
        descendants: 0,
        kids: [],
        type: '',
        text: '',
      });
    });

    it('should handle empty input', () => {
      const result = service.mapToStory({});

      expect(result).toEqual({
        id: 0,
        title: '',
        url: '',
        by: '',
        time: 0,
        score: 0,
        descendants: 0,
        kids: [],
        type: '',
        text: '',
      });
    });
  });
});
