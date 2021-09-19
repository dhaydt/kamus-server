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
  db.query(
    "SELECT id, judul_nama, kelamin_nama, asal_nama, isi_nama, view FROM nama WHERE judul_nama = ? UNION ALL SELECT id, judul_nama, kelamin_nama, asal_nama, isi_nama, view FROM nama_manual WHERE judul_nama = ?",
    [nama, nama],
    (err, hasil) => {
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
    }
  );
};

export const filterNama = (kata, result) => {
  const word = "%" + kata + "%";
  db.query(
    "SELECT * FROM nama WHERE judul_nama LIKE ?",
    [word],
    (err, results) => {
      if (results == null) {
        result(null, { message: "data not found" });
      } else {
        result(null, results);
      }
    }
  );
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
  db.query(
    `UPDATE nama_manual SET view = view+1 WHERE judul_nama = ? LIMIT 1`,
    [nama]
  );
};

export const postNamaDb = (artiNama, res) => {
  db.query(
    "INSERT INTO nama_manual (judul_nama, kelamin_nama, asal_nama, isi_nama) VALUES ?",
    [
      artiNama.map((nama) => [
        nama.judul_nama,
        nama.kelamin_nama,
        nama.asal_nama,
        nama.isi_nama,
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

export const delNama = (id, result) => {
  db.query("DELETE FROM nama WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

// Nama Cadangan

export const getNamaCadanganDb = (res) => {
  db.query(
    "SELECT id, judul_nama, isi_nama,asal_nama, kelamin_nama, view  FROM nama_manual ORDER BY id",
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

export const putNama = (data, id, result) => {
  db.query(
    "UPDATE nama_manual SET judul_nama = ?, kelamin_nama = ?, asal_nama = ?, isi_nama = ? WHERE id = ?",
    [data.judul_nama, data.kelamin_nama, data.asal_nama, data.isi_nama, id],
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

export const delNamaCadangan = (id, result) => {
  db.query("DELETE FROM nama_manual WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
