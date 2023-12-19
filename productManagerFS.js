const fs = require("fs"); // Importa el módulo 'fs' (sistema de archivos) de Node.js

class ProductManagerFS {
  static #path = "./data/products.json";
  static #encode = "utf-8";
  static #writeToFS(data) {
    fs.writeFileSync(ProductManagerFS.#path, data);
  }
  static #redFromFS() {
    if (fs.existsSync(ProductManagerFS.#path)) {
      return fs.readFileSync(ProductManagerFS.#path, ProductManagerFS.#encode);
    } else return "[]";
  }

  create(data) {
    if (!(data.title && data.photo && data.price && data.stock))
      return console.log(
        "Datos faltantes. Obligatorios: title, photo, price, stock. Enviados:",
        data
      );
    const products = JSON.parse(ProductManagerFS.#redFromFS()); //leo productos desde el fs
    const product = {
      // creo un nuevo producto
      id: products.length === 0 ? 1 : products[products.length - 1].id + 1,
      title: data.title,
      photo: data.photo,
      price: data.price,
      stock: data.stock,
    };

    products.push(product);
    ProductManagerFS.#writeToFS(JSON.stringify(products, null, 2));
  }

  read() {
    return JSON.parse(ProductManagerFS.#redFromFS());
  }

  readOne(id) {
    const products = JSON.parse(ProductManagerFS.#redFromFS());
    return products.find((each) => each.id == id);
  }
}

const data = null;

const pm = new ProductManagerFS();
pm.create({
  title: "medias",
  photo: "photo.jpg",
  price: 2.44,
  stock: 90,
});
pm.create({
  title: "zapatillas",
  photo: "photo.jpg",
  price: 20.5,
  stock: 50,
});

console.log(pm.read());

console.log(pm.readOne(3));
