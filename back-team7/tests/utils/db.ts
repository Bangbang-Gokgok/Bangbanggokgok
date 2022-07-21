import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;
const connect = async () => {
  mongod = await MongoMemoryServer.create();

  const uri = mongod.getUri();

  await mongoose.connect(uri);
};

const close = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

export { connect, close };
