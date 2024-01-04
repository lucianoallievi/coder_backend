import fs from "fs";
import crypto from "crypto";

class UserManager {
  static #path = "./data/fs/files/users.json";
  static #encode = "utf-8";
  static #writeToFS(data) {
    fs.writeFileSync(UserManager.#path, data);
  }
  static #readFromFS() {
    if (fs.existsSync(UserManager.#path)) {
      return fs.readFileSync(UserManager.#path, UserManager.#encode);
    } else return "[]";
  }

  create(data) {
    if (!(data.name && data.photo && data.email))
      return console.log(
        "Datos faltantes. Obligatorios: name, photo, email. Enviados:",
        data
      );

    const users = JSON.parse(UserManager.#readFromFS());

    const user = {
      //id: users.length === 0 ? 1 : users[users.length - 1].id + 1,
      id: crypto.randomBytes(12).toString("hex"),
      name: data.name,
      photo: data.photo,
      email: data.email,
    };

    users.push(user);

    UserManager.#writeToFS(JSON.stringify(users, null, 2));
  }

  read() {
    return JSON.parse(UserManager.#readFromFS());
  }

  readOne(id) {
    const users = JSON.parse(UserManager.#readFromFS());
    return users.find((each) => each.id == id);
  }

  destroy(id) {
    let users = JSON.parse(UserManager.#readFromFS());
    users = users.filter((users) => users.id != id);
    UserManager.#writeToFS(JSON.stringify(users, null, 2));
    return users;
  }
}

const users = new UserManager();
export default users;
