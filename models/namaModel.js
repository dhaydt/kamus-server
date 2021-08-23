import db from "../config/db.js";

//random
export const getNamaDb = (res) => {
  db.query("SELECT * FROM nama ORDER BY RAND() LIMIT 50", (err, hasil) => {
    if (err) {
      console.log(err);
      res(err, null);
    } else {
      res(null, hasil);
    }
  });
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
      res(null, hasil);
    }
  });
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
