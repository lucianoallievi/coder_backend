import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import Order from "./models/order.model.js";

import notFoundOne from "../../utils/notFoundOne.js";

class MongoManager {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const one = await this.model.create(data);
      return one._id;
    } catch (error) {
      throw error;
    }
  }

  async read({ filter, order }) {
    try {
      let options;
      //options = { ...options, lean: true };
      const all = await this.model.find(filter);
      //.populate("user_id")
      //.populate("product_id")
      //.sort(order);
      // const all = await this.model.find(filter, options);
      if (all.length === 0) {
        const error = new Error("There are no documents.");
        error.statusCode = 404;
        throw error;
      } else {
        return all;
      }
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const one = this.model.findById(id).lean();
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const opt = { new: true };
      const one = this.model.findByIdAndUpdate(id, data, opt);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async stats({ filter }) {
    try {
      let stats = await this.model.find(filter).explain("executionStats");
      // console.log(stats)
      stats = {
        quantity: stats.executionStats.nReturned,
        time: stats.executionStats.executionTimeMillis,
      };
      return stats;
    } catch (error) {
      throw error;
    }
  }

  async readByEmail({ filter }) {
    try {
      const all = await this.model.find(filter);

      if (all.length === 0) {
        const error = new Error("There are no documents.");
        error.statusCode = 404;
        throw error;
      } else {
        return all;
      }
    } catch (error) {
      throw error;
    }
  }
}
const users = new MongoManager(User);
const products = new MongoManager(Product);
const orders = new MongoManager(Order);

export { users, products, orders };
export default MongoManager;
