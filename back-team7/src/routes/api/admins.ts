import { Router, Request, Response, NextFunction } from 'express';
import { userService, feedService, reviewService } from '../../services';
import { redisClient } from '../../server';

const adminRouter = Router();

//피드 삭제 API
adminRouter.delete('/feeds/:_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params._id;
    const resource = 'likes';
    const key = `feeds:${resource}`;
    //Redis 좋아요 data 삭제
    await redisClient.hDel(key, _id);

    const deleteResult = await feedService.deleteFeedData(_id);

    res.status(200).json(deleteResult);
  } catch (error) {
    next(error);
  }
});

//리뷰 삭제 API
adminRouter.delete('/reviews/:_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params._id;
    //리뷰 삭제
    const deleteResult = await reviewService.deleteReviewData(_id);
    res.status(200).json(deleteResult);
  } catch (error) {
    next(error);
  }
});

//회원 권한 변경 API
adminRouter.put('/users/:_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params._id;
    const { authority } = req.body;
    // 사용자 정보를 업데이트함.
    const updatedUser = await userService.setUser(_id, { authority });

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

//회원 삭제 API
adminRouter.delete('/users/:_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params._id;
    const resource = 'friends';
    const key = `users:${resource}`;
    //Redis 친구 data 삭제
    await redisClient.hDel(key, _id);

    const deleteResult = await userService.deleteUserData(_id);

    res.status(200).json(deleteResult);
  } catch (error) {
    next(error);
  }
});

export { adminRouter };
