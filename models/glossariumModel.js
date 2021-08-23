import db from "../config/db.js";

export const getGlossariumDb = (res) => {
  db.query("SELECT * FROM istilah", (err, hasil) => {
    if (err) {
      console.log(err);
      res(err, null);
    } else {
      res(null, hasil);
    }
  });
};

export const cariGlosDb = (kata, res) => {
  db.query(
    "SELECT * FROM  istilah WHERE judul_glos = ?",
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

export const postGlosDb = (glosarium, res) => {
  db.query(
    "INSERT INTO istilah_manual (judul_glos, bid_glos, isi_glos, judul_seo, perfix_glos) VALUES ?",
    [
      glosarium.map((glos) => [
        glos.judul_glos,
        glos.bid_glos,
        glos.isi_glos,
        glos.judul_seo,
        glos.perfix_glos,
      ]),
    ],
    (err, hasil) => {
      if (err) {
        console.log(err);
        res(err, null);
      } else {
        res(null, hasil);
      }
    }
  );
};
