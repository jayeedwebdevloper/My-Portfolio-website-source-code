import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI!;
if (!uri) throw new Error("Please add MONGO_URI to .env.local");

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    if (!(global as any)._mongoClientPromise) {
        client = new MongoClient(uri);
        (global as any)._mongoClientPromise = client.connect();
    }
    clientPromise = (global as any)._mongoClientPromise;
} else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export default clientPromise;

export async function getDb() {
    const c = await clientPromise;
    return c.db("jayeeddb");
}