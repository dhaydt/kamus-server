import mysql from "mysql2";

// create the connection to database
const db = mysql.createConnection({
  host: "localhost",
  // user: "root",
  // password: "11111",
  user: "admin",
  password: "",
  database: "kamusdb",
});

export default db;
