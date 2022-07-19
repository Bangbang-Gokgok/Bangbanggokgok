import { Router, Request, Response, NextFunction } from 'express';
import { feedService, reviewService } from '../../services';
import { Types } from 'mongoose';
const reviewRouter = Router();

reviewRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user) {
      const _id: Types.ObjectId | string = req.user._id;
      const reviewInfo = req.body;
      // 위 데이터를 사용자 db에 추가하기
      reviewInfo.userId = _id;
      const newReview = await reviewService.addReview(reviewInfo);
      res.status(201).json(newReview);
    }
  } catch (error) {
    next(error);
  }
});

reviewRouter.get('/list', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 전체 리뷰 목록을 얻음
    const reviews = await reviewService.getReview();

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});
reviewRouter.get('/:_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params._id;
    // _id 값으로 검색
    const reviewData = await reviewService.getReviewById(_id);

    res.status(200).json(reviewData);
  } catch (error) {
    next(error);
  }
});

reviewRouter.get('/list/feed/:feedId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const feedId = req.params.feedId;
    // _id 값으로 검색
    const reviewData = await reviewService.getReviewByFeedId(feedId);

    res.status(200).json(reviewData);
  } catch (error) {
    next(error);
  }
});
reviewRouter.get('/list/user/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    // userId 값으로 검색
    const reviewData = await reviewService.getReviewByUserId(userId);
    console.log('reviewData : ', reviewData);
    res.status(200).json(reviewData);
  } catch (error) {
    next(error);
  }
});

reviewRouter.put('/:_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id;
    const _id = req.params._id;
    const update = req.body;

    // 리뷰를 업데이트함.
    const updatedReview = await reviewService.setReview(_id, update, userId);

    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
});

reviewRouter.delete('/:_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user_id = req.user?._id;
    const userId = req.body.userId;
    const _id = req.params._id;
    //리뷰 삭제
    const deleteResult = await reviewService.deleteReviewData(_id, user_id, userId);
    res.status(200).json(deleteResult);
  } catch (error) {
    next(error);
  }
});
reviewRouter.get('page/list', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 전체 리뷰 목록을 얻음
    const { page, perPage } = req.query;
    const [reviewList, totalPage] = await reviewService.getReviewPage(page, perPage);
    res.status(200).json({ reviewList, totalPage });
  } catch (error) {
    next(error);
  }
});
reviewRouter.get(
  'page/list/feed/:feedId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const feedId = req.params.feedId;
      // _id 값으로 검색
      const { page, perPage } = req.query;
      const [reviewList, totalPage] = await reviewService.getReviewByFeedIdPage(
        feedId,
        page,
        perPage
      );
      res.status(200).json({ reviewList, totalPage });
    } catch (error) {
      next(error);
    }
  }
);
reviewRouter.get(
  'page/list/user/:userId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      // userId 값으로 검색
      const { page, perPage } = req.query;
      const [reviewList, totalPage] = await reviewService.getReviewByUserIdPage(
        userId,
        page,
        perPage
      );
      res.status(200).json({ reviewList, totalPage });
    } catch (error) {
      next(error);
    }
  }
);

export { reviewRouter };
