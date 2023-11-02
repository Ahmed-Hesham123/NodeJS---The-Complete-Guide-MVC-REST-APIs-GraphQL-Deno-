const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = async (callback) => {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://ahmedhesham:6qflSNtHmfCRvh4T@cluster0.uwyg1wy.mongodb.net/shop?retryWrites=true&w=majority"
    );
    console.log("Connected!");
    _db = client.db();
    callback();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

module.exports = { mongoConnect, getDb };
