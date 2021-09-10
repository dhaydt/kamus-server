import mysql from "mysql2";

// create the connection to database
const db = mysql.createConnection({
  host: "localhost",
  // user: "root",
  user: "admin",
  // password: "11111",
  password: "",
  database: "kamusdb",
});

export default db;
