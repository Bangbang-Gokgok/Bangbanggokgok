import { Router, Request, Response, NextFunction } from 'express';
import { userService, UserInfo } from '../../../services';

const adminRouter = Router();

adminRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userInfo: UserInfo = req.body;
    // 위 데이터를 사용자 db에 추가하기
    const newUser = await userService.addUser(userInfo);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

adminRouter.get('/list', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 전체 사용자 목록을 얻음
    const users = await userService.getUsers();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

adminRouter.get('/:_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params._id;
    const userData = await userService.getUserDataById(_id);

    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
});

adminRouter.put('/:_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params._id;
    const update: Partial<UserInfo> = req.body;

    // 사용자 정보를 업데이트함.
    const updatedUser = await userService.setUser(_id, update);

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

adminRouter.delete('/:_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params._id;
    const deleteResult = await userService.deleteUserData(_id);

    res.status(200).json(deleteResult);
  } catch (error) {
    next(error);
  }
});

export { adminRouter };
