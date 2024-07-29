import roles from "@/utils/roles";
import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  //   console.log("body", req.body);
  const { store_name, user_name, name } = req.body;
  const client = new MongoClient(uri);
  if (req.method === "POST") {
    const database = client.db("StoresRatingApp");
    const collection = database.collection("ratings");
    let query = { user_name, store_name, name };
    // console.log(query);
    let ratingInfo = await collection.findOne(query);
    // console.log("dblist", dblist);
    // const list = [];
    // for await (const doc of dblist) {
    //   list.push(doc);
    // }
    // console.log("list", ratingInfo);
    try {
      res.status(200).json({ message: "success", ratingInfo });
    } catch (error) {
      let errormsg;
      errormsg = error?.response?.data.error.message;
      console.log("error in backend get user list api", errormsg);
      res.status(200).json({ message: "error", data: errormsg });
    } finally {
      client.close();
    }
  }
}