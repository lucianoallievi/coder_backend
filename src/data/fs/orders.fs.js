import fs from "fs";
import crypto from "crypto";

class OrderManager {
  static #path = "./src/data/fs/files/orders.json";
  static #encode = "utf-8";
  static #writeToFS(data) {
    fs.writeFileSync(OrderManager.#path, data);
  }
  static #readFromFS() {
    if (fs.existsSync(OrderManager.#path)) {
      return fs.readFileSync(OrderManager.#path, OrderManager.#encode);
    } else return "[]";
  }

  create(data) {
    if (!(data.pid && data.uid && data.quantity && data.state)) {
      console.log(
        "Datos faltantes. Obligatorios: pid, uid, quantity, state. Enviados:",
        data
      );
      return false;
    }
    const orders = JSON.parse(OrderManager.#readFromFS());
    const order = {
      id: crypto.randomBytes(12).toString("hex"),
      pid: data.pid,
      uid: data.uid,
      quantity: data.quantity,
      state: data.state,
    };

    orders.push(order);

    OrderManager.#writeToFS(JSON.stringify(orders, null, 2));

    return true;
  }

  read() {
    return JSON.parse(OrderManager.#readFromFS());
  }

  readOne(uid) {
    const orders = JSON.parse(OrderManager.#readFromFS());
    console.log(orders[0].uid);
    console.log(uid);
    const _orders = orders.filter((each) => each.uid == uid);
    console.log(_orders);
    return orders.filter((each) => each.uid == uid);
  }

  destroy(id) {
    let orders = JSON.parse(OrderManager.#readFromFS());
    orders = orders.filter((users) => users.id != id);
    OrderManager.#writeToFS(JSON.stringify(orders, null, 2));
    return orders;
  }

  update(oid, quantity, state) {
    let orders = JSON.parse(OrderManager.#readFromFS());
    const index = orders.findIndex((order) => order.id == oid);
    if (index !== -1) {
      orders[index].quantity = quantity;
      orders[index].state = state;
      OrderManager.#writeToFS(JSON.stringify(orders, null, 2));
      return orders[index];
    }
    return false;
  }
}

const orders = new OrderManager();

export default orders;
