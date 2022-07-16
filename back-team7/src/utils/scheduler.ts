import { redisClient } from '../server';
import { userService, feedService } from '../services';

export const likesScheduler = async () => {
  const updates = await redisClient.hGetAll('feeds:likes');
  const writes = [];
  for (const _id in updates) {
    const likes = JSON.parse(updates[_id]);
    const write = {
      updateOne: {
        filter: { _id },
        update: { likes },
      },
    };
    writes.push(write);
  }
  feedService.likesBulkUpdate(writes);
};

export const friendsScheduler = async () => {
  const updates = await redisClient.hGetAll('users:friends');
  const writes = [];
  for (const _id in updates) {
    const friends = JSON.parse(updates[_id]);
    const write = {
      updateOne: {
        filter: { _id },
        update: { friends },
      },
    };
    writes.push(write);
  }
  userService.friendsBulkUpdate(writes);
};
