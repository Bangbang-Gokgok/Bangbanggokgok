import { Router, Request, Response, NextFunction } from 'express';
import { feedService } from '../../services';

const feedRouter = Router();

feedRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const feedInfo = req.body;
    // 위 데이터를 사용자 db에 추가하기
    const newFeed = await feedService.addFeed(feedInfo);
    res.status(201).json(newFeed);
  } catch (error) {
    next(error);
  }
});

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
