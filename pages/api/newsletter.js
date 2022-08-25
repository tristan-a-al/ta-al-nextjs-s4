import { connectDatabase, insertDocument } from "../../helpers/db-util";

// import { MongoClient } from "mongodb";

// async function connectDatabase() {
//   const client = await MongoClient.connect(url);

//   return client;
// }

// async function insertDocument(client, document) {
//   const db = client.db();

//   await db.collection("emails").insertOne(document);
// }

async function handler(request, response) {
  if (request.method === "POST") {
    const userEmail = request.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      response.status(422).json({ message: "Invalid email address." });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (e) {
      response
        .status(500)
        .json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      await insertDocument(client, "emails", { email: userEmail });
      client.close();
    } catch (e) {
      response.status(500).json({
        message: "Database connected, but inserting a document failed!",
      });
      return;
    }

    console.log(userEmail);
    response.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
