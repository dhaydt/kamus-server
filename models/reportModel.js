import db from "../config/db.js";

export const getReportDb = (res) => {
  db.query("SELECT * FROM report ORDER BY id", (err, hasil) => {
    if (err) {
      res(err, null);
    } else {
      res(null, hasil);
    }
  });
};

export const postReportDb = (data, res) => {
  db.query("INSERT INTO report SET ?", [data], (err, hasil) => {
    if (err) {
      console.log(err);
      res(err, null);
    } else {
      res(null, hasil);
    }
  });
};

export const hapusReport = (id, result) => {
  db.query("DELETE FROM report WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
