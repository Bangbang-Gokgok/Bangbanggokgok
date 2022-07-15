import { Router, Request, Response, NextFunction } from 'express';
import { feedService } from '../../services';
import { upload } from '../../middlewares/';
import { Types } from 'mongoose';
import { getPostImageList } from '../../utils/img';
import { userService } from '../../services';
import { redisClient, changed } from '../../server';

const feedRouter = Router();

feedRouter.post(
  '/',
  upload.array('imageUrl', 5),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.user) {
        const _id: Types.ObjectId | string = req.user._id;

        const feedInfo = req.body;
        feedInfo.location = JSON.parse(feedInfo.location);
        if (req.files) {
          const postImages = getPostImageList(
            req.files as {
              [fieldname: string]: Express.Multer.File[];
            }
          );
          feedInfo.imageUrl = postImages;
        }

        feedInfo.userId = _id;

        // 위 데이터를 사용자 db에 추가하기
        const newFeed = await feedService.addFeed(feedInfo);
        res.status(201).json(newFeed);
      }
    } catch (error) {
      next(error);
    }
  }
);
feedRouter.get('/list', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 전체 피드 목록을 얻음
    const feeds = await feedService.getFeed();
    for (const feed of feeds) {
      const userInfo = await userService.getUserDataById(feed.userId);
      const userName = userInfo.name;
      feed.userName = userName;
    }
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
    const userInfo = await userService.getUserDataById(feedData.userId);
    const userName = userInfo.name;
    feedData.userName = userName;
    res.status(200).json(feedData);
  } catch (error) {
    next(error);
  }
});

feedRouter.get('/:_id/like', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const feedId = req.params._id;
    const userId = req.user!._id;
    const reaction = 'like';
    const key = `feeds:${feedId}:${reaction}`;
    changed.add(key);
    const newUser = await redisClient.sAdd(key, `${userId}`);

    if (!newUser) {
      redisClient.sRem(key, `${userId}`);
    }

    const like = await redisClient.sCard(key);
    res.status(200).json(like);
  } catch (error) {
    next(error);
  }
});

feedRouter.get('/list/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    // userName 값으로 검색
    const feedData = await feedService.getFeedByUserId(userId);
    for (const feed of feedData) {
      const userInfo = await userService.getUserDataById(feed.userId);
      const userName = userInfo.name;
      feed.userName = userName;
    }
    res.status(200).json(feedData);
  } catch (error) {
    next(error);
  }
});

feedRouter.put('/:_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params._id;
    const update = req.body; // any 처리 필요
    update.location = JSON.parse(update.location);
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
    //Redis 좋아요 data 삭제
    const reaction = 'like';
    const key = `feeds:${_id}:${reaction}`;
    await redisClient.del(key);
    //mongoDB data 삭제
    const deleteResult = await feedService.deleteFeedData(_id);
    res.status(200).json(deleteResult);
  } catch (error) {
    next(error);
  }
});

export { feedRouter };
