import RedisClient from '../src/config/redis';
import { connect, disconnect } from 'mongoose';

beforeAll(async () => {
  await RedisClient.connect();
  await connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await RedisClient.disconnect();
  await disconnect();
});
