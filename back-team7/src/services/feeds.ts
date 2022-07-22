import { Feed } from '../models';
import { Types } from 'mongoose';
import { Schema } from 'mongoose';
import { pageService } from './pages';
import mongodb = require('mongodb');
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
  likes: object;
  imageUrl?: string[] | undefined;
  profileImageUrl?: string[] | undefined;
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

    return feeds.reverse();
  }

  //특정 feed 조회
  async getFeedById(_id: string): Promise<FeedData> {
    // 우선 해당 상품이 db에 존재하는지 확인
    const feed = await Feed.findOne({ _id });
    if (!feed) {
      const error = new Error('요청한 id에 해당하는 피드가 존재하지 않습니다.');
      error.name = 'NotFound';
      throw error;
    }
    return feed;
  }
  //유저_id로 feed 조회
  async getFeedsByUserId(userId: string | Types.ObjectId): Promise<FeedData[]> {
    // 우선 해당 상품이 db에 존재하는지 확인
    const feeds = await Feed.find({ userId });
    if (!feeds) {
      const error = new Error('요청한 userId에 해당하는 피드가 존재하지 않습니다.');
      error.name = 'NotFound';
      throw error;
    }
    return feeds.reverse();
  }
  async setFeedsNewName(userId: string, userName: string) {
    const feeds = await Feed.updateMany({ userId }, { $set: { userName } });
  }

  async setFeedsNewProfileImage(userId: string, profileImageUrl: string[]) {
    const feeds = await Feed.updateMany({ userId }, { $set: { profileImageUrl } });
  }

  // 피드 정보 수정
  async setFeed(_id: string, update: Partial<FeedInfo>, user: any) {
    // 업데이트 진행
    if (user._id !== update.userId && user.authority !== 'admin') {
      const error = new Error('작성자만 수정할 수 있습니다.');
      error.name = 'Forbidden';
      throw error;
    }
    const updatedFeed = await Feed.findOneAndUpdate({ _id }, update, { returnOriginal: false });
    if (!updatedFeed) {
      const error = new Error('업데이트에 실패하였습니다. id와 update 내용을 확인 바랍니다.');
      error.name = 'NotFound';
      throw error;
    }

    return updatedFeed;
  }

  async likesBulkUpdate(writes: Array<mongodb.AnyBulkWriteOperation>) {
    Feed.bulkWrite(writes);
  }

  // 피드 정보 삭제
  async deleteFeedData(
    _id: string,
    user: any,
    userId: string | undefined
  ): Promise<{ result: string }> {
    if (user._id !== userId && user.authority !== 'admin') {
      const error = new Error('작성자만 수정할 수 있습니다.');
      error.name = 'Forbidden';
      throw error;
    }
    const { deletedCount } = await Feed.deleteOne({ _id });
    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      const error = new Error(`요청한 id에 해당하는 피드를 찾지 못해 삭제에 실패하였습니다.`);
      error.name = 'NotFound';
      throw error;
    }

    return { result: 'success' };
  }
  //전체 feed 조회 pagenation
  async getFeedPage(page: any, perPage: any) {
    const feeds = await Feed.find({});
    let query = { feeds };
    const [feedList, totalPage] = await pageService.getPaginatedFeeds(query, page, perPage);
    return [feedList, totalPage];
  }
  //유저_id로 feed 조회 pagenation
  async getFeedsByUserIdPage(userId: string | Types.ObjectId, page: any, perPage: any) {
    // 우선 해당 상품이 db에 존재하는지 확인
    const feed = await Feed.find({ userId });
    if (!feed) {
      const error = new Error('요청한 userId에 해당하는 피드가 존재하지 않습니다.');
      error.name = 'NotFound';
      throw error;
    }
    let query = { feed };
    const [feedList, totalPage] = await pageService.getPaginatedFeeds(query, page, perPage);
    return [feedList, totalPage];
  }
}

const feedService = new FeedService();
export { feedService };
