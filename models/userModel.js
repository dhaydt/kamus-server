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
