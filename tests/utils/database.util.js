import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const initial = () => {
  let database;

  beforeAll(async () => {
    database = await MongoMemoryServer.create();

    const mongoUri = await database.getUri();
    const mongoOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(mongoUri, mongoOptions);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await database.stop();
  });
};

export default {
  initial,
};
