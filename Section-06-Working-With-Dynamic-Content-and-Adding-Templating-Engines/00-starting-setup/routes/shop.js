const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  const products = adminData.products;

  // For Pug
  // res.render("shop", {
  //   prods: products,
  //   pageTitle: "Shop",
  //   path: "/",
  // });

  // For Handlebars
  // res.render("shop", {
  //   prods: products,
  //   pageTitle: "Shop",
  //   path: "/",
  //   hasProducts: products.length > 0,
  //   activeShop: true,
  //   productCSS: true
  // });

  // For EJS
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
  });
});

module.exports = router;
