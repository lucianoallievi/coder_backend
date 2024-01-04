class ProductManager {
  static #products = [];

  // Cada producto tiene las propiedades:
  // - id (código identificador)
  // - title (titulo)
  // - photo (ruta de imagen)
  // - price (precio)
  // - stock (unidades disponibles)

  create(data) {
    if (!(data.title && data.photo && data.price && data.stock))
      return console.log(
        "Datos faltantes. Obligatorios: title, photo, price, stock. Enviados:",
        data
      );
    const product = {
      id:
        ProductManager.#products.length === 0
          ? 1
          : ProductManager.#products[ProductManager.#products.length - 1].id +
            1,
      title: data.title,
      photo: data.photo,
      price: data.price,
      stock: data.stock,
    };

    ProductManager.#products.push(product);
  }

  read() {
    return ProductManager.#products;
  }

  readOne(id) {
    return ProductManager.#products.find((one) => one.id == id);
  }

  destroy(id) {
    ProductManager.#products = ProductManager.#products.filter(
      (product) => product.id != id
    );
  }
}

const pm = new ProductManager();

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
pm.destroy(2);
console.log(pm.read());
