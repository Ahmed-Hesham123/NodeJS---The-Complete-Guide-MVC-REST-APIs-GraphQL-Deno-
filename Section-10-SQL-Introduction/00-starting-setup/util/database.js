const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  // You must write your db Name that you have been declared in the SQL Server
  database: "myDBName",
  // You must write your db Password that you have been declared in the SQL Server when you was installing it
  password: "mypass",
});

module.exports = pool.promise();
