import { Router, Request, Response, NextFunction } from 'express';
import { feedService } from '../../services';
import { upload } from '../../middlewares/';
import { Types } from 'mongoose';
import { getPostImageList } from '../../utils/img';
import { redisClient } from '../../server';
const feedRouter = Router();

feedRouter.post(
  '/',
  upload.array('imageUrl'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //  if (req.user) {
      //    const _id: Types.ObjectId | string = req.user._id;
      const feedInfo = req.body;
      if (req.files) {
        const postImages = getPostImageList(
          req.files as {
            [fieldname: string]: Express.Multer.File[];
          }
        );
        feedInfo.imageUrl = postImages;
      }

      //feedInfo.userId = _id;
      //console.log(img);
      // 위 데이터를 사용자 db에 추가하기
      const newFeed = await feedService.addFeed(feedInfo);
      res.status(201).json(newFeed);
      //}
    } catch (error) {
      next(error);
    }
  }
);
feedRouter.get('/list', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 전체 피드 목록을 얻음
    const feeds = await feedService.getFeed();

    res.status(200).json(feeds);
  } catch (error) {
    next(error);
  }
});
feedRouter.get('/:_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params._id;
    // _id 값으로 검색
    const feedData = await feedService.getFeedById(_id);
    res.status(200).json(feedData);
  } catch (error) {
    next(error);
  }
});
feedRouter.get('/:_id/like', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const feedId = req.params._id;
    const userId = req.user!._id;
    // _id 값으로 검색
    redisClient.sAdd(`feeds:like:${feedId}`, `${userId}`);
    const like = await redisClient.sCard(`feeds:like:${feedId}`);
    // const feedData = await feedService.getFeedById(_id);
    res.status(200).json(like);
  } catch (error) {
    next(error);
  }
});

feedRouter.get('/user/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    // userName 값으로 검색
    const feedData = await feedService.getFeedByUserId(userId);

    res.status(200).json(feedData);
  } catch (error) {
    next(error);
  }
});

feedRouter.put('/:_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params._id;
    const update = req.body;

    // 피드를 업데이트함.
    const updatedFeed = await feedService.setFeed(_id, update);

    res.status(200).json(updatedFeed);
  } catch (error) {
    next(error);
  }
});

feedRouter.delete('/:_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params._id;
    //피드 삭제
    const deleteResult = await feedService.deleteFeedData(_id);
    res.status(200).json(deleteResult);
  } catch (error) {
    next(error);
  }
});

export { feedRouter };
