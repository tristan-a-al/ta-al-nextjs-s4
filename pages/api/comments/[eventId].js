import { MongoClient } from "mongodb";
import { findDOMNode } from "react-dom";
import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

async function handler(request, response) {
  const eventId = request.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (e) {
    response.status(500).json({ message: "Failed to connect to the database" });
    return;
  }

  if (request.method === "POST") {
    /* Add server-side validation */
    const { email, name, text } = request.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      response.status(422).json({ message: "Invalid input" });
      return;
    }

    console.log(email, name, text);
    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
      client.close();
    } catch (e) {
      response
        .status(500)
        .json({ message: "Connect succeeded, adding record failed." });
      return;
    }
    // const db = client.db();

    // const result = await db.collection("comments").insertOne(newComment);

    console.log(result);

    newComment._id = result.insertedId;

    response.status(201).json({ message: "Added comment. " });
  }

  if (request.method === "GET") {
    /*  */
    // const dummyList = [
    //   { id: "c1", name: "Tristan", text: "This is a dummy comment." },
    //   { id: "c2", name: "Cameron", text: "This is a dummy comment!" },
    // ];

    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      response.status(200).json({ comments: documents });
      client.close();
    } catch (e) {
      response
        .status(500)
        .json({ message: "db Connect succeeded, db fetch comments failed" });
    }
    // const db = client.db();

    // const documents = await db
    //   .collection("comments")
    //   .find()
    //   .sort({ _id: -1 })
    //   .toArray();
  }
}

export default handler;
