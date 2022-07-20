import { Router, Request, Response, NextFunction } from 'express';
import { userService, UserInfo } from '../../services';
import { upload } from '../../middlewares/';
import { getPostImageList } from '../../utils/img';
import { Types } from 'mongoose';
import { redisClient } from '../../server';

const userRouter = Router();

type RedisHashValue = {
  [key: string]: boolean;
};

declare global {
  namespace Express {
    interface User {
      _id: string;
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

// 회원가입 API - 미구현, 주석 처리
// userRouter.post('/user', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const userInfo: UserInfo = req.body;
//     // 위 데이터를 사용자 db에 추가하기
//     const newUser = await userService.addUser(userInfo);
//     res.status(201).json(newUser);
//   } catch (error) {
//     next(error);
//   }
// });

//회원 프로필 API
userRouter.get('/user', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.cookies.refreshToken) {
      const user = await userService.getUserDataByRefreshToken(req.cookies.refreshToken);
      res.json(user);
    } else {
      const error = new Error('refreshToken이 없습니다.');
      error.name = 'Unauthorized';
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

//친구 목록 API
userRouter.get('/friends', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user) {
      const userId = req.user._id;
      const resource = 'friends';
      const key = `users:${resource}`;
      const friends = await redisClient.hGet(key, userId);
      const friendsObject = friends ? JSON.parse(friends) : {};
      res.status(200).json(friendsObject);
    } else {
      const error = new Error('login된 user 정보가 없습니다.');
      error.name = 'Unauthorized';
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

// 친구 추가 및 취소 API(테스트용으로 GET, PUT으로 변경할 것)
userRouter.put('/friends/:_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user) {
      const userId = req.user._id;
      const friendId = req.params._id;
      const resource = 'friends';
      const key = `users:${resource}`;
      const friends = await redisClient.hGet(key, userId);
      let friendsObject: RedisHashValue = {};
      if (friends) {
        friendsObject = JSON.parse(friends);
        if (friendsObject[friendId]) {
          delete friendsObject[friendId];
        } else {
          friendsObject[friendId] = true;
        }
        // friendNum = friendsArr.length;
        // friendsArr = friendsArr.filter((e) => e !== friendId);
        // if (friendNum === friendsArr.length) {
        //   friendsArr.push(friendId);
        //   friendNum += 1;
        // } else {
        //   friendNum -= 1;
        // }
      } else {
        friendsObject[friendId] = true;
      }
      await redisClient.hSet(key, userId, JSON.stringify(friendsObject));
      res.status(200).json();
    } else {
      const error = new Error('login된 user 정보가 없습니다.');
      error.name = 'Unauthorized';
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

//전체 회원 조회 API
userRouter.get('/list', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user) {
      const keyword = req.query.keyword ? req.query.keyword.toString() : '';
      const users = await userService.getUsers(keyword, req.user.authority);
      res.status(200).json(users);
    } else {
      const error = new Error('login된 user 정보가 없습니다.');
      error.name = 'Unauthorized';
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

//특정 회원 조회 API
userRouter.get('/:_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params._id;
    const userData = await userService.getUserDataById(_id);

    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
});

//회원 정보 수정 API
userRouter.put(
  '/user',
  upload.array('profileImage', 1),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.user) {
        const _id: Types.ObjectId | string = req.user._id;

        const update = req.body; // any 처리 필요
        update.location = JSON.parse(update.location);
        if (req.files!.length) {
          const postImages = getPostImageList(
            req.files as {
              [fieldname: string]: Express.Multer.File[];
            }
          );
          update.profileImage = postImages;
        }
        // 사용자 정보를 업데이트함.
        const updatedUser = await userService.setUser(_id, update);

        res.status(200).json(updatedUser);
      } else {
        const error = new Error('login된 user 정보가 없습니다.');
        error.name = 'Unauthorized';
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
);

//회원 탈퇴 API
userRouter.delete('/user', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user) {
      const _id: Types.ObjectId | string = req.user._id;
      const resource = 'friends';
      const key = `users:${resource}`;
      //Redis 친구 data 삭제
      await redisClient.hDel(key, _id);
      //mongoDB 회원 data 삭제
      const deleteResult = await userService.deleteUserData(_id);

      res.status(200).json(deleteResult);
    } else {
      const error = new Error('login된 user 정보가 없습니다.');
      error.name = 'Unauthorized';
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

export { userRouter };
