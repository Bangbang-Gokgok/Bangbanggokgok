import express from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { createClient } from 'redis';
import schedule from 'node-schedule';
import { Server } from 'socket.io';
// import path from 'path';

import 'dotenv/config';
import { apiRouter, authRouter } from './routes';
import { errorHandler, getUserFromJWT } from './middlewares';
import { userService, feedService } from './services';
import { usePassport } from './passport';
import { likesScheduler, friendsScheduler } from './utils/scheduler';

usePassport();

const app = express();
app.use(cors());

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

const PORT = Number(process.env.PORT);
const DOMAIN = process.env.DOMAIN;

app.use(passport.initialize());

app.use(getUserFromJWT);

app.use('/api', apiRouter);
app.use('/auth', authRouter);

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
  schedule.scheduleJob('*/1 * * * *', likesScheduler);
  schedule.scheduleJob('*/1 * * * *', friendsScheduler);
});

// app.use(express.static(path.join(__dirname, '/../frontend/build'))); // 리액트 정적 파일 제공

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
// }); // 라우트 설정
const DB_URL =
  process.env.MONGODB_URL ||
  'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.0';

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on('connected', () => console.log('정상적으로 MongoDB 서버에 연결되었습니다.  ' + DB_URL));
db.on('error', (error: Error) =>
  console.error(`\nMongoDB 연결에 실패하였습니다...\n ${DB_URL} \n  ${error}`)
);

export const redisClient = createClient({ url: process.env.REDIS_URL });

redisClient.on('ready', (err) => console.log('정상적으로 Redis 서버에 연결되었습니다.'));
redisClient.on('error', (error: Error) =>
  console.error(`\nRedis 연결에 실패하였습니다...\n ${DB_URL} \n  ${error}`)
);

redisClient.connect();

const io = new Server(server, {
  cors: {
    origin: DOMAIN,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (client) => {
  console.log(`클라이언트 연결 성공 - ID: ${client.id}`);
  client.on('event', (data) => {
    /* … */
  });
  client.on('disconnect', () => {
    console.log(`연결 종료 - ID: ${client.id}`);
  });
});
