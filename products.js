const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb+srv://Store:ihge2660@mystoreproject.udmwjft.mongodb.net/store?retryWrites=true&w=majority";
const client = new MongoClient(uri);

exports.handler = async (event) => {
  await client.connect();
  const collection = client.db("store").collection("products");

  if (event.httpMethod === "GET") {
    const products = await collection.find({}).toArray();
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  }

  if (event.httpMethod === "POST") {
    const body = JSON.parse(event.body);
    await collection.insertOne(body);
    return { statusCode: 200, body: "تمت الإضافة" };
  }

  if (event.httpMethod === "DELETE") {
    const id = event.queryStringParameters.id;
    await collection.deleteOne({ _id: new ObjectId(id) });
    return { statusCode: 200, body: "تم الحذف" };
  }

  return { statusCode: 405, body: "Method Not Allowed" };
};
