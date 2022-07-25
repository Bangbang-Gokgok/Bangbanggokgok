import http from 'http';
import { Server } from 'socket.io';
import 'dotenv/config';
import { redisClient } from './server';

const DOMAIN = process.env.DOMAIN;

type RedisHashValue = {
  [key: string]: boolean;
};

export function ws(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: DOMAIN,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    // socket.on('followRequest', async (userId, friendId) => {
    //   const resource = 'friends';
    //   const key = `users:${resource}`;
    //   const friends = await redisClient.hGet(key, userId);
    //   let friendsArr: string[];
    //   if (friends) {
    //     friendsArr = JSON.parse(friends);
    //     const friendNum = friendsArr.length;
    //     friendsArr = friendsArr.filter((e) => e !== friendId);
    //     if (friendNum === friendsArr.length) {
    //       friendsArr.push(friendId);
    //     }
    //   } else {
    //     friendsArr = [friendId];
    //   }
    //   await redisClient.hSet(key, userId, JSON.stringify(friendsArr));
    //   socket.emit('followResponse', friendsArr);
    // });
    // socket.on('likeListRequest', async (feedId) => {
    //   const resource = 'likes';
    //   const key = `feeds:${resource}`;
    //   const users = await redisClient.hGet(key, feedId);
    //   const usersObject = users ? JSON.parse(users) : {};
    //   io.emit('likeListResponse', usersObject);
    // });
    socket.on('likeRequest', async (userId: string, feedId: string, index?: number) => {
      const resource = 'likes';
      const key = `feeds:${resource}`;
      const users = await redisClient.hGet(key, feedId);
      let usersObject: RedisHashValue = {};
      if (users) {
        usersObject = JSON.parse(users);
        if (usersObject[userId]) {
          delete usersObject[userId];
        } else {
          usersObject[userId] = true;
        }
        // const likes = usersObject.length;
        // usersObject = usersObject.filter((e) => e !== userId);
        // if (likes === usersObject.length) {
        // usersObject.push(userId);
        // }
      } else {
        usersObject[userId] = true;
      }
      await redisClient.hSet(key, feedId, JSON.stringify(usersObject));

      io.emit('likeResponse', usersObject, index);
    });
    socket.on('disconnect', () => {});
  });
}
