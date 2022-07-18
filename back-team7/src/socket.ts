import http from 'http';
import { Server } from 'socket.io';
import 'dotenv/config';
import { redisClient } from './server';

const DOMAIN = process.env.DOMAIN;

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
    socket.on('likeRequest', async (userId, feedId) => {
      const resource = 'likes';
      const key = `feeds:${resource}`;
      const users = await redisClient.hGet(key, feedId);
      let usersArr: string[];
      if (users) {
        usersArr = JSON.parse(users);
        const likes = usersArr.length;
        usersArr = usersArr.filter((e) => e !== userId);
        if (likes === usersArr.length) {
          usersArr.push(userId);
        }
      } else {
        usersArr = [userId];
      }
      await redisClient.hSet(key, feedId, JSON.stringify(usersArr));

      socket.emit('likeResponse', usersArr);
    });
    socket.on('disconnect', () => {});
  });
}
