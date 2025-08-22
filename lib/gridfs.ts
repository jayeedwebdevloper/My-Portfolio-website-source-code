import { GridFSBucket } from "mongodb";
import { getDb } from "./db";

let bucket: GridFSBucket;

export async function getBucket() {
    if (!bucket) {
        const db = await getDb();
        bucket = new GridFSBucket(db, { bucketName: "photos" });
    }
    return bucket;
}
