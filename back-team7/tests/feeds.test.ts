import * as db from './utils/db';
import { feedService, userService, pageService } from '../src/services';
let _id: string = '';

beforeAll(async () => {
  await db.connect();

  // id가 test인 게시글 5개
  for (let i = 0; i < 5; i++) {
    const feed = await feedService.addFeed({
      userId: 'test',
      userName: 'test name',
      title: 'test title',
      description: 'test description',
      address: 'test address',
      location: { lat: 0, lng: 0 },
      likes: {},
      imageUrl: ['test.png'],
    });
    _id = feed._id.toString();
  }

  // id가 test0~4인 게시글 5개
  for (let i = 0; i < 5; i++) {
    const feed = await feedService.addFeed({
      userId: `test${i}`,
      userName: 'test name',
      title: 'test title',
      description: 'test description',
      address: 'test address',
      location: { lat: 0, lng: 0 },
      likes: {},
      imageUrl: ['test.png'],
    });
  }
  const user = await userService.addUser({
    authority: 'test',
    email: 'test@naver.com ',
    name: 'test',
  });
});
afterAll(async () => await db.close());

describe('게시글 불러오기 TEST', () => {
  test('전체 게시글 불러오기 성공', async () => {
    const feedList = await feedService.getFeed();
    expect(Array.isArray(feedList)).toBe(true);
    expect(feedList.length).toBeLessThanOrEqual(10);
  });

  test('ObjectId로 한 개의 게시글 불러오기 성공', async () => {
    const feed = await feedService.getFeedById(_id);
    expect(feed._id.toString()).toEqual(_id);
    expect(feed.description).toEqual('test description');
  });

  test('ObjectId로 한 개의 게시글 불러오기 실패 - 존재하지 않는 게시글', async () => {
    const failFeedId = 'test';
    await expect(feedService.getFeedById(failFeedId)).rejects.toThrow();
  });

  test('게시글 가져오기(페이지네이션) 성공', async () => {
    const query = await feedService.getFeed();
    const page = 1;
    const perPage = 2;
    const [feedList, totalPage] = await pageService.getPaginatedFeeds(query, page, perPage);
    expect(Object.keys(feedList).length).toBe(2);
  });
});

describe('게시글 추가 TEST', () => {
  test('게시글 추가 성공', async () => {
    const feed = await feedService.addFeed({
      userId: 'test123',
      userName: 'test2 name',
      title: 'test2 title',
      description: 'test2 description',
      address: 'test2 address',
      location: { lat: 0, lng: 0 },
      likes: {},
      imageUrl: ['test.png'],
    });
    expect(typeof feed).toBe('object');
    expect(feed.userId).toEqual('test123');
  });
});

describe('게시글 삭제 TEST', () => {
  test('게시글 삭제 성공', async () => {
    const feed = await feedService.addFeed({
      userId: 'test123',
      userName: 'test2 name',
      title: 'test2 title',
      description: 'test2 description',
      address: 'test2 address',
      location: { lat: 0, lng: 0 },
      likes: {},
      imageUrl: ['test.png'],
    });
    const result = await feedService.deleteFeedData(
      'test123',
      {
        _id: '123',
        authority: 'user',
        email: 'test@naver.com ',
        name: 'test3',
      },
      '123'
    );
    expect(result).toBe('success');
  });
});
