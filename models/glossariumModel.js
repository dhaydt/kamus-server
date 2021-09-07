import db from "../config/db.js";

export const getGlossariumDb = (res) => {
  db.query(
    "SELECT id_glos, judul_glos, bid_glos, isi_glos, view FROM istilah",
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

export const getPopIstilahDb = (res) => {
  db.query(
    "SELECT judul_glos, view FROM istilah ORDER BY view DESC LIMIT 8",
    (err, result) => {
      if (err) {
        res(err, null);
      } else {
        res(null, result);
      }
    }
  );
};

export const cariGlosDb = (kata, res) => {
  db.query(
    "SELECT * FROM  istilah WHERE judul_glos = ?",
    [kata],
    (err, hasil) => {
      if (err) {
        res(err, null);
      } else {
        getRelatedEngIn(kata, (err, related) => {
          getRandom((err, random) => {
            // console.log({ istilah: hasil, related: related, random: random });
            res(null, { istilah: hasil, related: related, random: random });
          });
          postView(kata);
        });
      }
    }
  );
};

const getRandom = (res) => {
  db.query(
    "SELECT id, judul_artikel, isi_artikel FROM id_eng ORDER BY RAND() LIMIT 5",
    (err, random) => {
      if (err) {
        console.log(err);
      } else {
        res(null, random);
      }
    }
  );
};

const getRelatedEngIn = (kata, result) => {
  const data = "%" + kata + "%";
  db.query(
    `SELECT id, judul_artikel, isi_artikel FROM en_id WHERE judul_artikel LIKE ? LIMIT 5`,
    [data],
    (err, related) => {
      if (err) {
        console.log(err);
        // result(err);
      } else {
        // console.log(hasil);
        result(null, related);
      }
    }
  );
};

const postView = (kata, result) => {
  db.query(`UPDATE istilah SET view = view+1 WHERE judul_glos = ? LIMIT 1`, [
    kata,
  ]);
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
