import { Router, Request, Response, NextFunction } from 'express';
import { userService } from '../../../services';

interface UserAuthority {
  authority: string;
}

const adminRouter = Router();

adminRouter.put('/:_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params._id;
    const update: UserAuthority = req.body;

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
