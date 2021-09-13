import db from "../config/db.js";

export const getUserDb = (result) => {
  db.query(
    "SELECT id, username, email, registered_at, last_login FROM users",
    (err, hasil) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, hasil);
      }
    }
  );
};

export const delUser = (id, result) => {
  db.query("DELETE FROM users WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const delAdv = (id, result) => {
  db.query("DELETE FROM adv WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
