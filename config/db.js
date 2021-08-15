import mysql from "mysql2";

// create the connection to database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "11111",
  database: "kamusdb",
});

export default db;
