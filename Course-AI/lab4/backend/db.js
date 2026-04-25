import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

export async function connectDB() {
  await client.connect();
  return client.db("rag_db");
}