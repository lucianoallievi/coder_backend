class OrderManager {
  static #orders = [];

  create(data) {
    if (!(data.pid && data.uid && data.quantity && data.state))
      return console.log(
        "Datos faltantes. Obligatorios: pid, uid, quantity, state. Enviados:",
        data
      );
    const order = {
      id:
        OrderManager.#orders.length === 0
          ? 1
          : OrderManager.#orders[OrderManager.#orders.length - 1].id + 1,
      pid: data.pid,
      uid: data.uid,
      quantity: data.quantity,
      state: data.state,
    };
    OrderManager.#orders.push(order);
    return order;
  }

  read() {
    return OrderManager.#orders;
  }

  readOne(uid) {
    return OrderManager.#orders.filter((each) => each.uid == uid);
  }

  destroy(id) {
    OrderManager.#orders = OrderManager.#orders.filter(
      (users) => users.id != id
    );
    return OrderManager.#orders;
  }

  update(oid, quantity, state) {
    const index = OrderManager.#orders.findIndex((order) => order.id == oid);
    if (index !== -1) {
      OrderManager.#orders[index].quantity = quantity;
      OrderManager.#orders[index].state = state;

      return OrderManager.#orders[index];
    }
    return false;
  }
}

const om = new OrderManager();

om.create({ pid: 2, uid: 3, quantity: 40, state: "created" });
om.create({ pid: 4, uid: 9, quantity: 55, state: "created" });
om.create({ pid: 5, uid: 6, quantity: 23, state: "created" });
om.create({ pid: 5, uid: 6, quantity: 23, state: "created" });
//console.log(om.read());

console.log(om.readOne(2));
om.destroy(2);

console.log(om.read());

om.update(3, 55, "sold");

console.log(om.readOne(6));
