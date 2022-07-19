import { Review } from '../models';
import { Types } from 'mongoose';
import { pageService } from './pages';

interface ReviewInfo {
  userId: string | Types.ObjectId;
  feedId: string;
  userName: string;
  contents: string;
}
interface ReviewData extends ReviewInfo {
  _id: string;
}
class ReviewService {
  //review 추가
  async addReview(reviewInfo: ReviewInfo): Promise<ReviewData> {
    const createdNewReview = await Review.create(reviewInfo);
    return createdNewReview;
  }
  //전체 review 조회
  async getReview(): Promise<ReviewData[]> {
    const reviews = await Review.find({});
    return reviews.reverse();
  }
  //특정 review 조회
  async getReviewById(_id: string): Promise<ReviewData> {
    // 우선 해당 상품이 db에 존재하는지 확인
    const review = await Review.findOne({ _id });
    if (!review) {
      const error = new Error('해당 리뷰가 존재하지 않습니다. 다시 확인해 주세요.');
      error.name = 'NotFound';
      throw error;
    }
    return review;
  }

  async getReviewByFeedId(feedId: string): Promise<ReviewData[]> {
    // 우선 해당 상품이 db에 존재하는지 확인
    const review = await Review.find({ feedId });
    if (!review) {
      const error = new Error('해당 리뷰가 존재하지 않습니다. 다시 확인해 주세요.');
      error.name = 'NotFound';
      throw error;
    }
    return review;
  }
  async getReviewByUserId(userId: string): Promise<ReviewData[]> {
    // 우선 해당 상품이 db에 존재하는지 확인
    const review = await Review.find({ userId });
    if (!review) {
      const error = new Error('해당 리뷰가 존재하지 않습니다. 다시 확인해 주세요.');
      error.name = 'NotFound';
      throw error;
    }
    return review.reverse();
  }

  // 리뷰 정보 수정
  async setReview(_id: string, update: Partial<ReviewInfo>, user: any) {
    // 업데이트 진행
    if (user._id !== update.userId && user.authority !== 'admin') {
      const error = new Error('작성자만 수정할 수 있습니다.');
      error.name = 'Access Denied';
      throw error;
    }
    const updatedReview = await Review.findOneAndUpdate({ _id }, update, { returnOriginal: false });
    if (!updatedReview) {
      const error = new Error('업데이트에 실패하였습니다.');
      error.name = 'NotFound';
      throw error;
    }
    return updatedReview;
  }

  // 리뷰 정보 삭제
  async deleteReviewData(
    _id: string,
    user: any,
    userId: string | undefined
  ): Promise<{ result: string }> {
    if (user._id !== userId && user.authority !== 'admin') {
      const error = new Error('작성자만 수정할 수 있습니다.');
      error.name = 'Access Denied';
      throw error;
    }
    const { deletedCount } = await Review.deleteOne({ _id });
    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      const error = new Error(`${_id} 리뷰 삭제에 실패하였습니다`);
      error.name = 'NotFound';
      throw error;
    }
    return { result: 'success' };
  }

  async getReviewPage(page: any, perPage: any) {
    const reviews = await Review.find({});
    let query = { reviews };
    const [reviewList, totalPage] = await pageService.getPaginatedReviews(query, page, perPage);
    return [reviewList, totalPage];
  }

  async getReviewByFeedIdPage(feedId: string, page: any, perPage: any) {
    // 우선 해당 상품이 db에 존재하는지 확인
    const review = await Review.find({ feedId });
    if (!review) {
      const error = new Error('해당 리뷰가 존재하지 않습니다. 다시 확인해 주세요.');
      error.name = 'NotFound';
      throw error;
    }
    let query = { review };
    const [reviewList, totalPage] = await pageService.getPaginatedReviews(query, page, perPage);
    return [reviewList, totalPage];
  }

  async getReviewByUserIdPage(userId: string, page: any, perPage: any) {
    // 우선 해당 상품이 db에 존재하는지 확인
    const review = await Review.find({ userId });
    if (!review) {
      const error = new Error('해당 리뷰가 존재하지 않습니다. 다시 확인해 주세요.');
      error.name = 'NotFound';
      throw error;
    }
    let query = { review };
    const [reviewList, totalPage] = await pageService.getPaginatedReviews(query, page, perPage);
    return [reviewList, totalPage];
  }
}

const reviewService = new ReviewService();
export { reviewService };
