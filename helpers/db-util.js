import { MongoClient } from "mongodb";
const url =
  "mongodb+srv://CheeseAdvocate:ion4yxagT77BITj8@ta-al-mdb-cluster.ypoozwp.mongodb.net/?retryWrites=true&w=majority";
// const un = "CheeseAdvocate";
// const pw = "ion4yxagT77BITj8";
// const SORT_ASC = +1;
// const SORT_DESC = -1;

export async function connectDatabase() {
  const client = await MongoClient.connect(url);

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find()
    .sort(sort)
    .toArray();

    return documents;
}
