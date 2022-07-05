import express from 'express';
import mongoose from 'mongoose';
// import cors from 'cors';
// import passport from 'passport';
// import cookieParser from 'cookie-parser';
import 'dotenv/config';
// import { apiRouter, authRouter } from './routes';
// import { errorHandler, getUserFromJWT } from './middlewares';
// import { usePassport } from './passport';
// import webSocket from './socket';
// import path from 'path';

// usePassport();
const app = express();
// app.use(cors());

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

// app.use(cookieParser());

const PORT = process.env.PORT;

// app.use(passport.initialize());

// app.use(getUserFromJWT);

// app.use('/api', apiRouter);
// app.use('/auth', authRouter);

// app.use(errorHandler);

const server = app.listen(PORT, () => console.log(`server is running ${PORT}`));

// // socket
// webSocket(server);

// app.use(express.static(path.join(__dirname, '/../frontend/build'))); // 리액트 정적 파일 제공

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
// }); // 라우트 설정
const DB_URL =
  process.env.MONGODB_URL ||
  'MongoDB 서버 주소가 설정되지 않았습니다.\n./models/index.ts나 .env 파일을 확인해 주세요. \n';

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on('connected', () => console.log('정상적으로 MongoDB 서버에 연결되었습니다.  ' + DB_URL));
db.on('error', (error: Error) =>
  console.error('\nMongoDB 연결에 실패하였습니다...\n' + DB_URL + '\n' + error)
);
