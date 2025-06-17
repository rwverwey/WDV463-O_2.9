import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
const dbName = 'migrainelog';

let db;

export async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db(dbName);
  }
  return db;
}
