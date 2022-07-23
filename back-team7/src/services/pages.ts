import { model } from 'mongoose';
import { FeedSchema } from '../models/schemas';
import { ReviewSchema } from '../models/schemas';
const Feed = model('feeds', FeedSchema);
const Review = model('reviews', ReviewSchema);

class PageService {
  async getPaginatedFeeds(query: any, page: any, perPage: any) {
    const [total, feedList] = await Promise.all([
      Feed.countDocuments(query),
      Feed.find({ query })
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage),
    ]);

    const totalPage = Math.ceil(total / perPage);

    return [feedList, totalPage];
  }

  async getPaginatedReviews(query: any, page: any, perPage: any) {
    const [total, reviewList] = await Promise.all([
      Review.countDocuments(query),
      Review.find({ query })
        .sort()
        .skip(perPage * (page - 1))
        .limit(perPage),
    ]);

    const totalPage = Math.ceil(total / perPage);

    return [reviewList, totalPage];
  }
}
const pageService = new PageService();
export { pageService };
