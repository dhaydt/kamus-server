import db from "../config/db.js";

export const getIndDb = (res) => {
  db.query("SELECT * FROM en_id", (err, hasil) => {
    if (err) {
      res(err, null);
    } else {
      res(null, hasil);
    }
  });
};

export const getEngDb = (res) => {
  db.query("SELECT * FROM id_eng", (err, hasil) => {
    if (err) {
      res(err, null);
    } else {
      res(null, hasil);
    }
  });
};

export const cariIndDb = (kata, res) => {
  db.query(
    "SELECT * FROM en_id WHERE judul_artikel = ?",
    [kata],
    (err, hasil) => {
      if (err) {
        res(err, null);
      } else {
        res(null, hasil);
      }
    }
  );
};

export const cariEngDb = (kata, res) => {
  db.query(
    "SELECT * FROM id_eng WHERE judul_artikel = ?",
    [kata],
    (err, hasil) => {
      if (err) {
        res(err, null);
      } else {
        res(null, hasil);
      }
    }
  );
};
