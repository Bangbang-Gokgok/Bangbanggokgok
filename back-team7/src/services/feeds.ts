import { Feed } from '../models';
import { Types } from 'mongoose';
import { Schema } from 'mongoose';
import { pageService } from './';
interface newLocation {
  lat: number;
  lng: number;
}
interface FeedInfo {
  userId: string | Types.ObjectId;
  userName: string;
  title: string;
  description: string;
  address: string;
  location: newLocation;
  like?: string[] | undefined;
  imageUrl?: string[] | undefined;
}
interface FeedData extends FeedInfo {
  _id: string;
}
class FeedService {
  //feed 추가
  async addFeed(feedInfo: FeedInfo): Promise<FeedData> {
    const createdNewFeed = await Feed.create(feedInfo);
    return createdNewFeed;
  }
  //전체 feed 조회
  async getFeed(): Promise<FeedData[]> {
    const feeds = await Feed.find({});

    return feeds;
  }
  // //전체 feed 조회 pagenation
  // async getFeedPage(page: any, perPage: any) {
  //   const feeds = await Feed.find({});
  //   let query = {}
  //   const [feedList, totalPage] = await pageService.getPaginatedFeeds(query, page, perPage);
  //   return [feedList,totalPage];
  // }
  //특정 feed 조회
  async getFeedById(_id: string): Promise<FeedData> {
    // 우선 해당 상품이 db에 존재하는지 확인
    const feed = await Feed.findOne({ _id });
    if (!feed) {
      const error = new Error('해당 피드가 존재하지 않습니다. 다시 확인해 주세요.');
      error.name = 'NotFound';
      throw error;
    }
    return feed;
  }
  //유저_id로 feed 조회
  async getFeedByUserId(userId: string | Types.ObjectId): Promise<FeedData[]> {
    // 우선 해당 상품이 db에 존재하는지 확인
    const feed = await Feed.find({ userId });
    if (!feed) {
      const error = new Error('해당 피드가 존재하지 않습니다. 다시 확인해 주세요.');
      error.name = 'NotFound';
      throw error;
    }
    return feed;
  }
  // //유저_id로 feed 조회 pagenation
  // async getFeedByUserIdPage(
  //   userId: string | Types.ObjectId,
  //   page: any,
  //   perPage: any
  // ): Promise<FeedData[]> {
  //   // 우선 해당 상품이 db에 존재하는지 확인
  //   const feed = await Feed.find({ userId });
  //   if (!feed) {
  //     const error = new Error('해당 피드가 존재하지 않습니다. 다시 확인해 주세요.');
  //     error.name = 'NotFound';
  //     throw error;
  //   }
  //   const [productList, totalPage] = await pageService.getPaginatedFeeds(page, perPage);
  //   return feed;
  // }
  // 피드 정보 수정
  async setFeed(_id: string, update: Partial<FeedInfo>) {
    // 업데이트 진행
    const updatedFeed = await Feed.findOneAndUpdate({ _id }, update, { returnOriginal: false });
    if (!updatedFeed) {
      const error = new Error('업데이트에 실패하였습니다.');
      error.name = 'NotFound';
      throw error;
    }
    return updatedFeed;
  }

  // 피드 정보 삭제
  async deleteFeedData(_id: string): Promise<{ result: string }> {
    const { deletedCount } = await Feed.deleteOne({ _id });
    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      const error = new Error(`${_id} 피드 삭제에 실패하였습니다`);
      error.name = 'NotFound';
      throw error;
    }

    return { result: 'success' };
  }
}

const feedService = new FeedService();
export { feedService };
