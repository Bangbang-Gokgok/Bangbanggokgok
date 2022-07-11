import { Router, Request, Response, NextFunction } from 'express';
import { userService, UserInfo } from '../../../services';
import { adminRouter } from './admin';
// import { adminCheck } from '../../../middlewares';
import { Types } from 'mongoose';

const userRouter = Router();

declare global {
  namespace Express {
    interface User {
      _id: Types.ObjectId | string;
      authority: string;
      email: string;
      name: string;
      // refreshToken: string;
      profileImage?: string | undefined;
      contactNumber?: number | undefined;
      location?: object | undefined;
      friends?: Array<string> | undefined;
    }
  }
}

// userRouter.use('/admin', isAdmin, adminRouter);
userRouter.use('/admin', adminRouter);

// 로컬 로그인 - 현재 없으므로 주석 처리
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

userRouter.get('/user', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user) {
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

userRouter.get('/list', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.get('/:_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params._id;
    const userData = await userService.getUserDataById(_id);

    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
});

userRouter.put('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user) {
      const _id: Types.ObjectId | string = req.user._id;
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

userRouter.delete('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user) {
      const _id: Types.ObjectId | string = req.user._id;
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
