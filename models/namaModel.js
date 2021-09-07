import db from "../config/db.js";

//random
export const getNamaDb = (res) => {
  db.query("SELECT * FROM nama ORDER BY RAND() LIMIT 5", (err, hasil) => {
    if (err) {
      console.log(err);
      res(err, null);
    } else {
      res(null, hasil);
    }
  });
};

export const getPopNamaDb = (res) => {
  db.query(
    "SELECT id, judul_nama, view FROM nama ORDER BY view DESC LIMIT 10",
    (err, result) => {
      if (err) {
        res(err, null);
      } else {
        res(null, result);
      }
    }
  );
};

export const getNamaAllDb = (res) => {
  db.query("SELECT * FROM nama ORDER BY id", (err, hasil) => {
    if (err) {
      console.log(err);
      res(err, null);
    } else {
      res(null, hasil);
    }
  });
};

export const cariNamaDb = (nama, res) => {
  db.query("SELECT * FROM nama WHERE judul_nama = ?", [nama], (err, hasil) => {
    if (err) {
      res(err, null);
    } else {
      getRelatedEngIn(nama, (err, related) => {
        getNamaDb((err, random) => {
          res(null, { nama: hasil, related: related, random: random });
          postView(nama);
        });
      });
    }
  });
};

const getRelatedEngIn = (nama, result) => {
  const data = "%" + nama + "%";
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

const postView = (nama, result) => {
  db.query(`UPDATE nama SET view = view+1 WHERE judul_nama = ? LIMIT 1`, [
    nama,
  ]);
};

export const postNamaDb = (artiNama, res) => {
  db.query(
    "INSERT INTO nama_manual (judul_nama, kelamin_nama, asal_nama, isi_nama, perfix_nama) VALUES ?",
    [
      artiNama.map((nama) => [
        nama.judul_nama,
        nama.kelamin_nama,
        nama.asal_nama,
        nama.isi_nama,
        nama.perfix_nama,
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
