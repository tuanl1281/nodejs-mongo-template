import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { mongodb } from '@app/configurations/environment.configuration';

const initial = () => {
  let database;

  beforeAll(async () => {
    let mongoUri = mongodb?.url;
    const mongoOptions = mongodb.options;

    if (!mongoUri) {
      database = await MongoMemoryServer.create();
      mongoUri = await database.getUri();
    }

    await mongoose.connect(mongoUri, mongoOptions);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    if (database) {
      await database.stop();
    }
  });
};

export default {
  initial,
};
