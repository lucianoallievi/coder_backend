const fs = require("fs");

class UserManagerFS {
  static #path = "./data/users.json";
  static #encode = "utf-8";
  static #writeToFS(data) {
    fs.writeFileSync(UserManagerFS.#path, data);
  }
  static #readFromFS() {
    if (fs.existsSync(UserManagerFS.#path)) {
      return fs.readFileSync(UserManagerFS.#path, UserManagerFS.#encode);
    } else return "[]";
  }

  create(data) {
    if (!(data.name && data.photo && data.email))
      return console.log(
        "Datos faltantes. Obligatorios: name, photo, email. Enviados:",
        data
      );

    const users = JSON.parse(UserManagerFS.#readFromFS());

    const user = {
      id: users.length === 0 ? 1 : users[users.length - 1].id + 1,
      name: data.name,
      photo: data.photo,
      email: data.email,
    };

    users.push(user);

    UserManagerFS.#writeToFS(JSON.stringify(users, null, 2));
  }

  read() {
    return JSON.parse(UserManagerFS.#readFromFS());
  }

  readOne(id) {
    const users = JSON.parse(UserManagerFS.#readFromFS());
    return users.find((each) => each.id == id);
  }
}

const um = new UserManagerFS();

um.create({
  name: "carlos",
  photo: "carlos.jpg",
  email: "carlos@dominio.com",
});

um.create({
  name: "roberto",
  photo: "roberto.jpg",
  email: "roberto@dominio.com",
});

console.log(um.read());
//console.log(um.readOne(2));
