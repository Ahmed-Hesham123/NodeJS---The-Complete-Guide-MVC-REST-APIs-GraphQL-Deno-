const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");

const app = express();

// For EJS
app.set("view engine", "ejs");
app.set("views", "views/EJS");

// For Pug
// app.set("view engine", "pug");
// app.set("views", "views/Pug");

// For Handlebars
// app.engine(
//   "hbs",
//   expressHbs({
//     layoutsDir: "views/Handlebars/layouts",
//     defaultLayout: "main-layout",
//     extname: "hbs",
//   })
// );
// app.set("view engine", "hbs");
// app.set("views", "views/Handlebars");

const adminData = require("./routes/index");
const usersData = require("./routes/users");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminData.routes);
app.use(usersData);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

app.listen(3000);
