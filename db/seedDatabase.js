var mysql = require("mysql");
var fs = require("fs");
var readline = require("readline");
var myCon = mysql.createConnection({
  host: "localhost",
  port: "3306",
  database: "sequelized_burgers_db",
  user: "root",
  password: ""
});
var rl = readline.createInterface({
  input: fs.createReadStream("./db/seeds.sql"),
  // input: fs.createReadStream("./seeds.sql"), //this apparently is wrong
  terminal: false
});
rl.on("line", function(chunk) {
  myCon.query(chunk.toString("ascii"), function(err, sets, fields) {
    if (err) {
      console.log(err);
    }
  });
});
rl.on("close", function() {
  console.log("The sequelized_burgers_db has been seeded with sample data.");
  myCon.end();
});
