import { IResponse, IStory, StoriesService } from '@ks/shared';
import { initialState, StoriesStore } from './stories.store';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

describe('StoriesStore', () => {
  let store: InstanceType<typeof StoriesStore>;
  let service: StoriesService;
  let commentsSpy: any;
  let storiesSpy: any;

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

  const mockPageEvent: PageEvent = {
    previousPageIndex: 0,
    pageIndex: 3,
    pageSize: 10,
    length: 40,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoriesStore, StoriesService, provideHttpClient()],
    });

    service = TestBed.inject(StoriesService);
    store = TestBed.inject(StoriesStore);

    storiesSpy = jest.spyOn(service, 'fetchStories').mockReturnValue(
      of({
        data: [mockStory] as IStory[],
        status: 40,
      } as IResponse<IStory[]>)
    );

    commentsSpy = jest
      .spyOn(service, 'fetchComments')
      .mockReturnValue(of([mockComment] as IStory[]));
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('onInit', () => {
    expect(store.comments()).toStrictEqual(initialState.comments);
    expect(store.stories()).toStrictEqual(initialState.stories);
  });

  it('updatePageEvent', () => {
    store.updatePageEvent(mockPageEvent);
    expect(store.start()).toStrictEqual(30);
    expect(store.limit()).toStrictEqual(10);
  });

  it('fetchComments', () => {
    store.fetchComments([1,2,3]);
    expect(commentsSpy).toHaveBeenCalledTimes(1);
    expect(store.comments()).toStrictEqual([mockComment]);
  });

  it('fetchStories', () => {
    store.updateStoryType('new');
    expect(storiesSpy).toHaveBeenCalledTimes(1);
    expect(store.stories()).toStrictEqual([mockStory]);
  });
});
