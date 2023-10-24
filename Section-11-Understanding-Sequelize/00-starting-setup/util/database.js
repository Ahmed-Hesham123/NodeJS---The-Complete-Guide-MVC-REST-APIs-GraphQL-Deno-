const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "nodecomplete123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
