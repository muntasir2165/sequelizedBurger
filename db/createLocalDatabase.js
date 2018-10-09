var mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: ""
});

// create the storedb database
connection.query("DROP DATABASE IF EXISTS sequelized_burgers_db", function(err) {
  if (err) {
    throw err;
  }
  connection.query("CREATE DATABASE sequelized_burgers_db", function(err) {
    if (err) {
      throw err;
    }
    console.log("The sequelized_burgers_db database has been created.");
    process.exit(0);
  });
});
