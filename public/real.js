const socket = io();
console.log("holas");
// socket.on("welcome", (message) => alert(message));
// socket.emit("new product", {
//   title: "medias",
//   photo: "photo.jpg",
//   price: 2.44,
//   stock: 90,
// });

socket.on("new success", (message) => alert(message));
