const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",

   port: 8080,

  user: "root",
  password: "mysql",
  database: "employee_tracker_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected at " + connection.threadId + "\n");
});

module.exports = connection;
