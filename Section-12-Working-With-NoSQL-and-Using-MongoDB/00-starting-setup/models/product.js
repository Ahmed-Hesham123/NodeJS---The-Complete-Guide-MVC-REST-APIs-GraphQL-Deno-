const mongodb = require("mongodb");

const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  async save() {
    try {
      const db = getDb();
      let dbOp;
      if (this._id) {
        // Update the product
        dbOp = db
          .collection("products")
          .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
      } else {
        dbOp = db.collection("products").insertOne(this);
      }
      const result = await dbOp;
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  static async fetchAll() {
    try {
      const db = getDb();
      const products = await db.collection("products").find().toArray();
      console.log(products);
      return products;
    } catch (err) {
      console.log(err);
    }
  }

  static async findById(prodId) {
    try {
      const db = getDb();
      const product = await db
        .collection("products")
        .find({ _id: new mongodb.ObjectId(prodId) })
        .next();
      console.log(product);
      return product;
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteById(prodId) {
    try {
      const db = getDb();
      const result = await db
        .collection("products")
        .deleteOne({ _id: new mongodb.ObjectId(prodId) });
      console.log("Deleted");
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Product;
