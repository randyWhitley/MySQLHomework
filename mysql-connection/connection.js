let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",

   port: 3306,
  user: "root",
  password: "fruit",
  database: "employee_tracker_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected at " + connection.threadId + "\n");
});

module.exports = {connection};

