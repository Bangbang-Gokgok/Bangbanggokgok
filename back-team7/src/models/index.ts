import mongoose from 'mongoose';
import { UserSchema } from './schemas';

// const DB_URL =
//   process.env.MONGODB_URL ||
//   'MongoDB 서버 주소가 설정되지 않았습니다.\n./models/index.ts나 .env 파일을 확인해 주세요. \n';

// mongoose.connect(DB_URL);
// const db = mongoose.connection;

// db.on('connected', () => console.log('정상적으로 MongoDB 서버에 연결되었습니다.  ' + DB_URL));
// db.on('error', (error: Error) =>
//   console.error('\nMongoDB 연결에 실패하였습니다...\n' + DB_URL + '\n' + error)
// );

// export const User = mongoose.model('User', UserSchema);
