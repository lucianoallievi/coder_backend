class UserManager {
  static #users = [];

  // Cada usuario tiene las propiedades:
  // - id (código identificador)
  // - name (titulo)
  // - photo (ruta de imagen)
  // - email (precio)

  create(data) {
    if (!(data.name && data.photo && data.email))
      return console.log(
        "Datos faltantes. Obligatorios: name, photo, email. Enviados:",
        data
      );
    const user = {
      id:
        UserManager.#users.length === 0
          ? 1
          : UserManager.#users[UserManager.#users.length - 1].id + 1,
      name: data.name,
      photo: data.photo,
      email: data.email,
    };

    UserManager.#users.push(user);
  }

  read() {
    return UserManager.#users;
  }

  readOne(id) {
    return UserManager.#users.find((one) => one.id == id);
  }
}

const um = new UserManager();

um.create({
  name: "carlos",
  photo: "carlos.jpg",
  email: "carlos@dominio.com",
});

um.create({
  name: "roberto",
  //photo: "roberto.jpg",
  email: "roberto@dominio.com",
});

console.log(um.readOne(2));
