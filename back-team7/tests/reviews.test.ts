import * as db from './utils/db';
import { feedService, userService, pageService, reviewService } from '../src/services';
let _id: string = '';
beforeAll(async () => {
  await db.connect();

  // id가 test인 게시글 5개
  for (let i = 0; i < 5; i++) {
    const review = await reviewService.addReview({
      userId: 'test',
      feedId: 'test feedId',
      userName: 'test name',
      contents: 'test content',
    });
    _id = review._id.toString();
  }

  // id가 test0~4인 게시글 5개
  for (let i = 0; i < 5; i++) {
    const review = await reviewService.addReview({
      userId: `test${i}`,
      feedId: `test feedId${i}`,
      userName: 'test name',
      contents: 'test content',
    });
  }
});
afterAll(async () => await db.close());

describe('리뷰 불러오기 TEST', () => {
  test('전체 리뷰 불러오기 성공', async () => {
    const reviewList = await reviewService.getReview();
    expect(Array.isArray(reviewList)).toBe(true);
    expect(reviewList.length).toBeLessThanOrEqual(10);
  });
});
