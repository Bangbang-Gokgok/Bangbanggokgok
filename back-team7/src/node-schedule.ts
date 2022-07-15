import schedule from 'node-schedule';
import { redisClient, changed } from './server';
import { userService, feedService } from './services';

//스케줄러 - 변경된 데이터가 있을 경우 1분마다 redis에서 mongoDB로 data 전송
export const scheduler = schedule.scheduleJob('*/1 * * * *', async () => {
  // if (changed.size) {
  //   const changedArr = [...changed];
  //   for (const key of changedArr) {
  //     if (typeof key === 'string') {
  //       const [collection, _id, resource] = key.split(':');
  //       switch (collection) {
  //         case 'feeds':
  //           const likes = await redisClient.sMembers(key);
  //           feedService.setFeed(_id, { likes });
  //         case 'users':
  //           const friends = await redisClient.sMembers(key);
  //           userService.setUser(_id, { friends });
  //       }
  //     }
  //   }
  //   changed.clear();
  // }
});
