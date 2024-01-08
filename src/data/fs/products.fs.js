import fs from "fs";
import crypto from "crypto";

class ProductManager {
  static #path = "./src/data/fs/files/products.json";
  static #encode = "utf-8";
  static #writeToFS(data) {
    fs.writeFileSync(ProductManager.#path, data);
  }
  static #readFromFS() {
    if (fs.existsSync(ProductManager.#path)) {
      return fs.readFileSync(ProductManager.#path, ProductManager.#encode);
    } else return "[]";
  }

  create(data) {
    if (!(data.title && data.photo && data.price && data.stock)) {
      console.log(
        "Datos faltantes. Obligatorios: title, photo, price, stock. Enviados:",
        data
      );
      return false;
    }
    const products = JSON.parse(ProductManager.#readFromFS()); //leo productos desde el fs
    const product = {
      // creo un nuevo producto
      //id: products.length === 0 ? 1 : products[products.length - 1].id + 1,
      id: crypto.randomBytes(12).toString("hex"),
      title: data.title,
      photo: data.photo,
      price: data.price,
      stock: data.stock,
    };

    products.push(product);
    ProductManager.#writeToFS(JSON.stringify(products, null, 2));
    return true;
  }

  read() {
    return JSON.parse(ProductManager.#readFromFS());
  }

  readOne(id) {
    const products = JSON.parse(ProductManager.#readFromFS());
    return products.find((each) => each.id == id);
  }

  destroy(id) {
    let products = JSON.parse(ProductManager.#readFromFS());
    const product = products.find((each) => each.id == id);
    if (product) {
      products = products.filter((product) => product.id != id);
      ProductManager.#writeToFS(JSON.stringify(products, null, 2));
      return product;
    } else {
      return false;
    }
  }

  update(id, data) {
    let products = JSON.parse(ProductManager.#readFromFS());
    const i = products.findIndex((product) => {
      return product.id == id;
    });
    if (i > -1) {
      products[i].title = data.title;
      products[i].photo = data.photo;
      products[i].price = data.price;
      products[i].stock = data.stock;
      ProductManager.#writeToFS(JSON.stringify(products, null, 2));
      return true;
    } else {
      return false;
    }
  }
}

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
