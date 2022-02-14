import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  var signin: (id?: string) => string[];
}

jest.mock('../nats-wrapper');
jest.setTimeout(100000);

let mongo: any;

process.env.STRIPE_KEY =
  'sk_test_51J812AEVYb5LWxk8q7pwjcFjrwaJ81JkB0jkJPAyFZEVWbitD0jDCIFLvFyzzBI7M3hAZnGSM3N7xlTt5d8UawYg00rzTLzrvH';

beforeAll(async () => {
  process.env.JWT_KEY = 'dsfdfefsd';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  // build a JWT payload {id, email}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  // Create JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Ojbect. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string thats the cookie with the encoded data
  return [`express:sess=${base64}`];
};
