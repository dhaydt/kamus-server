// import connection
import db from "../config/db.js";

// Get global random

export const getGlobalDB = (res) => {
  kbbiRandom((err, hasil) => {
    if (err) {
      console.log(err);
    } else {
      res(null, hasil);
    }
  });
};

export const kbbiRandom = (res) => {
  db.query(
    "SELECT _id, kata FROM kamus ORDER BY RAND() LIMIT 10",
    (err, kbbi) => {
      if (err) {
        console.log(err);
        res(err, null);
      } else {
        istilahRandom((err, istilah) => {
          namaRandom((err, nama) => {
            engInRandom((err, engIn) => {
              inEngRandom((err, inEng) => {
                res(null, {
                  kbbi: kbbi,
                  istilah: istilah,
                  nama: nama,
                  engIn: engIn,
                  inEng: inEng,
                });
              });
            });
          });
        });
      }
    }
  );
};

const istilahRandom = (res) => {
  db.query(
    "SELECT id_glos, judul_glos FROM istilah ORDER BY RAND() LIMIT 10",
    (err, istilah) => {
      if (err) {
        console.log(err);
        // result(err);
      } else {
        res(null, istilah);
      }
    }
  );
};

const namaRandom = (res) => {
  db.query(
    "SELECT id, judul_nama FROM nama ORDER BY RAND() LIMIT 10",
    (err, nama) => {
      if (err) {
        console.log(err);
        // result(err);
      } else {
        // console.log(hasil);
        res(null, nama);
      }
    }
  );
};

const engInRandom = (res) => {
  db.query(
    "SELECT id, judul_artikel FROM en_id ORDER BY RAND() LIMIT 10",
    (err, engIn) => {
      if (err) {
        console.log(err);
        // result(err);
      } else {
        // console.log(hasil);
        res(null, engIn);
      }
    }
  );
};

const inEngRandom = (res) => {
  db.query(
    "SELECT id, judul_artikel FROM id_eng ORDER BY RAND() LIMIT 10",
    (err, inEng) => {
      if (err) {
        console.log(err);
        // result(err);
      } else {
        // console.log(hasil);
        res(null, inEng);
      }
    }
  );
};

// Get All Products
export const getKamus = (result) => {
  db.query("SELECT _id, kata, keterangan, view FROM kamus", (err, results) => {
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

export const searchWord = (word, result) => {
  db.query("SELECT * FROM kamus WHERE kata = ?", [word], (err, results) => {
    if (results == null) {
      result(null, { message: "data not found" });
    } else {
      getRelatedInEng(word, (err, hasil) => {
        getRandom((err, random) => {
          console.log({ kbbi: results, related: hasil, random: random });
          result(null, { kbbi: results, related: hasil, random: random });
          postView(word);
        });
      });
    }
  });
};

const getRandom = (res) => {
  db.query(
    "SELECT id, judul_nama, isi_nama FROM nama ORDER BY RAND() LIMIT 5",
    (err, random) => {
      if (err) {
        console.log(err);
      } else {
        res(null, random);
      }
    }
  );
};

const getRelatedInEng = (word, result) => {
  const data = "%" + word + "%";
  db.query(
    `SELECT id, judul_artikel, isi_artikel FROM id_eng WHERE judul_artikel LIKE ? LIMIT 5`,
    [data],
    (err, hasil) => {
      if (err) {
        console.log(err);
        // result(err);
      } else {
        // console.log(hasil);
        result(null, hasil);
      }
    }
  );
};

const postView = (word, result) => {
  db.query(`UPDATE kamus SET view = view+1 WHERE kata = ? LIMIT 1`, [word]);
};

export const getPopDb = (res) => {
  db.query(
    "SELECT _id, kata, view FROM kamus ORDER BY view DESC LIMIT 10",
    (err, result) => {
      if (err) {
        res(err, null);
      } else {
        res(null, result);
      }
    }
  );
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
