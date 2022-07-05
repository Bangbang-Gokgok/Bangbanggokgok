import { Router, Request, Response, NextFunction } from 'express';
import { userService } from '../../services';

const userRouter = Router();

userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userInfo = req.body;
    // 위 데이터를 사용자 db에 추가하기
    const newUser = await userService.addUser(userInfo);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userRouter.get('/list', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 전체 사용자 목록을 얻음
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

userRouter.put('/:_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params._id;
    const update = req.body;

    // 사용자 정보를 업데이트함.
    const updatedUser = await userService.setUser(_id, update);

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

userRouter.delete('/:_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params._id;
    const deleteResult = await userService.deleteUserData(_id);

    res.status(200).json(deleteResult);
  } catch (error) {
    next(error);
  }
});

export { userRouter };
