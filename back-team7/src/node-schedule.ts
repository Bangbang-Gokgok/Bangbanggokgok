import schedule from 'node-schedule';
import { redisClient, changed } from './server';
import { feedService } from './services';

interface reactionInfo {
  key: string;
  feedId: string;
  reaction: string;
}

function isReactionInfo(object: any): object is reactionInfo {
  if (
    typeof object.key === 'string' &&
    typeof object.feedId === 'string' &&
    typeof object.reaction === 'string'
  ) {
    return true;
  }
  return false;
}

//스케줄러 - 변경된 데이터가 있을 경우 1분마다 redis에서 mongoDB로 data 전송
export const scheduler = schedule.scheduleJob('*/1 * * * *', async () => {
  if (changed.size) {
    const changedArr = [...changed];
    for (const reactionInfo of changedArr) {
      if (isReactionInfo(reactionInfo)) {
        const like = await redisClient.sMembers(reactionInfo.key);
        feedService.setFeed(reactionInfo.feedId, { like });
      }
    }
    changed.clear();
  }
});
