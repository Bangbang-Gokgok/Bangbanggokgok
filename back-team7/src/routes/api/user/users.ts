import { Router, Request, Response, NextFunction } from 'express';
import { userService, UserInfo } from '../../../services';
import { adminRouter } from './admin';
import { isAdmin } from '../../../middlewares';
import { Types } from 'mongoose';

const userRouter = Router();

userRouter.use('/admin', isAdmin, adminRouter);

// userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const userInfo: UserInfo = req.body;
//     // 위 데이터를 사용자 db에 추가하기
//     const newUser = await userService.addUser(userInfo);
//     res.status(201).json(newUser);
//   } catch (error) {
//     next(error);
//   }
// });

userRouter.get('/', async (req: any, res: Response, next: NextFunction) => {
  try {
    if (req.user) {
      // const _id: Types.ObjectId = req.user._id;
      // const userData = await userService.getUserDataById(_id);
      // res.status(200).json(userData);
      res.json(req.user);
    } else {
      const error = new Error('user 정보가 없습니다.');
      error.name = 'NotFound';
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

userRouter.put('/', async (req: any, res: Response, next: NextFunction) => {
  try {
    if (req.user) {
      const _id: Types.ObjectId = req.user._id;
      const update: Partial<UserInfo> = req.body;

      // 사용자 정보를 업데이트함.
      const updatedUser = await userService.setUser(_id, update);

      res.status(200).json(updatedUser);
    } else {
      const error = new Error('user 정보가 없습니다.');
      error.name = 'NotFound';
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

userRouter.delete('/', async (req: any, res: Response, next: NextFunction) => {
  try {
    if (req.user) {
      const _id: Types.ObjectId = req.user._id;
      const deleteResult = await userService.deleteUserData(_id);

      res.status(200).json(deleteResult);
    } else {
      const error = new Error('user 정보가 없습니다.');
      error.name = 'NotFound';
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

export { userRouter };
