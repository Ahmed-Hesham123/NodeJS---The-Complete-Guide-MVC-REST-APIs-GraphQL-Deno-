const express = require("express");

const app = express();

// app.use("/", (req, res, next) => {
//     console.log("Ahmed");
//     next()
// });

// app.use((req, res, next) => {
//     console.log("Ahmed Hesham");
//     res.send("<h1>Ahmed Hesham</h1>")
// });

app.use("/users", (req, res, next) => {
  console.log("Page Users");
  res.send("<h2>Ahmed Hesham</h2>");
});

app.use("/", (req, res, next) => {
  console.log("NodeJS Developer");
  res.send("<h1>Ahmed Hesham</h1>");
});

app.listen(3000);
