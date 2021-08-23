// import connection
import db from "../config/db.js";

// Get All Products
export const getKamus = (result) => {
  db.query("SELECT * FROM kamus", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const postKamus = (data, result) => {
  db.query("INSERT INTO kamus SET ?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const putKamus = (data, id, result) => {
  db.query(
    "UPDATE kamus SET kata = ?, keterangan = ?, type = ? WHERE _id = ?",
    [data.kata, data.keterangan, data.type, id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

export const delKamus = (id, result) => {
  db.query("DELETE FROM kamus WHERE _id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const searchWord = (word, result) => {
  db.query("SELECT * FROM kamus WHERE kata = ?", [word], (err, results) => {
    if (results === null) {
      result(null, { message: "data not found" });
    } else {
      result(null, results);
    }
  });
};

export const postKamusDb = (records, result) => {
  db.query(
    "INSERT INTO kamus_manual (kata, keterangan) VALUES ?",
    [records.map((record) => [record.kata, record.keterangan])],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};
