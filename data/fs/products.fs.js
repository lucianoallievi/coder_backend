import fs from "fs"; // Importa el módulo 'fs' (sistema de archivos) de Node.js

class ProductManager {
  static #path = "./data/fs/files/products.json";
  static #encode = "utf-8";
  static #writeToFS(data) {
    fs.writeFileSync(ProductManager.#path, data);
  }
  static #redFromFS() {
    if (fs.existsSync(ProductManager.#path)) {
      return fs.readFileSync(ProductManager.#path, ProductManager.#encode);
    } else return "[]";
  }

  create(data) {
    if (!(data.title && data.photo && data.price && data.stock))
      return console.log(
        "Datos faltantes. Obligatorios: title, photo, price, stock. Enviados:",
        data
      );
    const products = JSON.parse(ProductManager.#redFromFS()); //leo productos desde el fs
    const product = {
      // creo un nuevo producto
      id: products.length === 0 ? 1 : products[products.length - 1].id + 1,
      title: data.title,
      photo: data.photo,
      price: data.price,
      stock: data.stock,
    };

    products.push(product);
    ProductManager.#writeToFS(JSON.stringify(products, null, 2));
  }

  read() {
    return JSON.parse(ProductManager.#redFromFS());
  }

  readOne(id) {
    const products = JSON.parse(ProductManager.#redFromFS());
    return products.find((each) => each.id == id);
  }

  destroy(id) {
    let products = JSON.parse(ProductManager.#redFromFS());
    products = products.filter((product) => product.id != id);
    ProductManager.#writeToFS(JSON.stringify(products, null, 2));
    return products;
  }
}

const data = null;

// pm.create({
//   title: "medias",
//   photo: "photo.jpg",
//   price: 2.44,
//   stock: 90,
// });
// pm.create({
//   title: "zapatillas",
//   photo: "photo.jpg",
//   price: 20.5,
//   stock: 50,
// });

// console.log(pm.read());

// console.log(pm.readOne(3));

const products = new ProductManager();

export default products;
