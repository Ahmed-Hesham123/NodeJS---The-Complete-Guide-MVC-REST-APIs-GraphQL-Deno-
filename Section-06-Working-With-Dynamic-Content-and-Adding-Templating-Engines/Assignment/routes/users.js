const express = require("express");

const adminData = require("./index");

const router = express.Router();

router.get("/users", (req, res, next) => {
  const users = adminData.users;

  res.render("users", {
    users: users,
    pageTitle: "Users",
    path: "/",
    hasUsers: users.length > 0
  });
});

module.exports = router;
