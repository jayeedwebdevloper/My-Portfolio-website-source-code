import clientPromise from "./db";

export async function getCollections() {
    const client = await clientPromise;
    const db = client.db("jayeeddb");

    return {
        services: db.collection("services"),
        information: db.collection("information"),
        technology: db.collection("technology")
    };
}
