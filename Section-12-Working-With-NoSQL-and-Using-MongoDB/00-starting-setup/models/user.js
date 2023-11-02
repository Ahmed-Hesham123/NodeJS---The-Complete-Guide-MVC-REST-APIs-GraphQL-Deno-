const { getDb } = require("../util/database");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  async save() {
    try {
      const db = getDb();
      return db.collection("users").insertOne(this);
    } catch (err) {
      console.log(err);
    }
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }
    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  async getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((i) => {
      return i.productId;
    });
    const products = await db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray();
    const cartWithQuantities = products.map((p) => ({
      ...p,
      quantity: this.cart.items.find((i) => {
        return i.productId.toString() === p._id.toString();
      }).quantity,
    }));
    return cartWithQuantities;
  }

  deleteItemFromCart(productId) {
    const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString();
    });
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }

  async addOrder() {
    try {
      const db = getDb();
      const products = await this.getCart();
      const order = {
        items: products,
        user: {
          _id: new ObjectId(this._id),
          name: this.name,
        },
      };
      await db.collection("orders").insertOne(order);
      this.cart = { items: [] };
      return db
        .collection("users")
        .updateOne(
          { _id: new ObjectId(this._id) },
          { $set: { cart: { items: [] } } }
        );
    } catch (err) {
      console.log(err);
    }
  }

  async getOrders() {
    try {
      const db = getDb();
      const orders = await db.collection("orders").find({"user._id": new ObjectId(this._id)}).toArray();
      return orders;
    } catch (err) {
      console.log(err);
    }
  }

  static async findById(userId) {
    try {
      const db = getDb();
      // We wrote findOne() here instead of find() and that won't return a cursor so we don't have to call next() after it.
      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(userId) });
      console.log(user);
      return user;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = User;
