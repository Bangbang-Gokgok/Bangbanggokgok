import { Review } from '../models';
import { Types } from 'mongoose';

interface ReviewInfo {
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
    return reviews;
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

  // 리뷰 정보 수정
  async setReview(_id: string, update: Partial<ReviewInfo>) {
    // 업데이트 진행
    const updatedReview = await Review.findOneAndUpdate({ _id }, update, { returnOriginal: false });
    if (!updatedReview) {
      const error = new Error('업데이트에 실패하였습니다.');
      error.name = 'NotFound';
      throw error;
    }
    return updatedReview;
  }

  // 리뷰 정보 삭제
  async deleteReviewData(_id: string): Promise<{ result: string }> {
    const { deletedCount } = await Review.deleteOne({ _id });
    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      const error = new Error(`${_id} 리뷰 삭제에 실패하였습니다`);
      error.name = 'NotFound';
      throw error;
    }

    return { result: 'success' };
  }
}

const reviewService = new ReviewService();
export { reviewService };
