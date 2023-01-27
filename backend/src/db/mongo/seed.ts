import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

import { RequestModel } from '../models/request';

dotenv.config();

import seedData from './seed_data.json';

const clearDb = async () => {
  console.log('deleting all requests');
  await RequestModel.deleteMany({});
  console.log('all requests deleted');
};

const seedRequests = async () => {
  console.log('adding seed data for requests');
  await Promise.all(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    seedData.map(async (request: any) => {
      const newRequest = new RequestModel(request);
      return newRequest.save();
    })
  );
};

const logRequests = async () => {
  console.log('logging seeded requests');
  const requests = await RequestModel.find({});
  console.log(requests);
};

mongoose.set('strictQuery', false);

// Only seeds DB if there is at least one request
const seedDB = async (guaranteeSeed = false) => {
  const numRequests = await RequestModel.count({});

  if (numRequests < 0 || guaranteeSeed) {
    await clearDb();
    await seedRequests();
    await logRequests();
  }
};

export { seedDB };
