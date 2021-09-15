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

export const getPopEngInDb = (res) => {
  db.query(
    "SELECT id, judul_artikel, view FROM en_id ORDER BY view DESC LIMIT 10",
    (err, result) => {
      if (err) {
        res(err, null);
      } else {
        res(null, result);
      }
    }
  );
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

export const getPopInEngDb = (res) => {
  db.query(
    "SELECT id, judul_artikel, view FROM id_eng ORDER BY view DESC LIMIT 10",
    (err, result) => {
      if (err) {
        res(err, null);
      } else {
        res(null, result);
      }
    }
  );
};

export const cariIndDb = (kata, res) => {
  db.query(
    "SELECT * FROM en_id WHERE judul_artikel = ? UNION ALL SELECT * FROM en_id_manual WHERE judul_artikel = ?",
    [kata, kata],
    (err, hasil) => {
      if (err) {
        res(err, null);
      } else {
        getRelatedIstilah(kata, (err, related) => {
          getRandom((err, random) => {
            res(null, { engin: hasil, related: related, random: random });
            postViewInd(kata);
          });
        });
      }
    }
  );
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

const getRelatedIstilah = (kata, result) => {
  const data = "%" + kata + "%";
  db.query(
    `SELECT id_glos, judul_glos, isi_glos FROM istilah WHERE judul_glos LIKE ? LIMIT 5`,
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

const postViewInd = (kata, result) => {
  db.query(`UPDATE en_id SET view = view+1 WHERE judul_artikel = ? LIMIT 1`, [
    kata,
  ]);
  db.query(
    `UPDATE en_id_manual SET view = view+1 WHERE judul_artikel = ? LIMIT 1`,
    [kata]
  );
};

export const cariEngDb = (kata, res) => {
  db.query(
    "SELECT * FROM id_eng WHERE judul_artikel = ? UNION ALL SELECT * FROM id_eng_manual WHERE judul_artikel = ?",
    [kata, kata],
    (err, hasil) => {
      if (err) {
        res(err, null);
      } else {
        getRelatedNama(kata, (err, related) => {
          getRand((err, random) => {
            res(null, { idEng: hasil, related: related, random: random });
            postViewEng(kata);
          });
        });
      }
    }
  );
};

const getRand = (res) => {
  db.query(
    "SELECT id_glos, judul_glos, isi_glos FROM istilah ORDER BY RAND() LIMIT 5",
    (err, random) => {
      if (err) {
        console.log(err);
      } else {
        res(null, random);
      }
    }
  );
};

const getRelatedNama = (kata, result) => {
  const data = "%" + kata + "%";
  db.query(
    `SELECT id, judul_nama, isi_nama FROM nama WHERE judul_nama LIKE ? LIMIT 5`,
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

const postViewEng = (kata, result) => {
  db.query(`UPDATE id_eng SET view = view+1 WHERE judul_artikel = ? LIMIT 1`, [
    kata,
  ]);
  db.query(
    `UPDATE id_eng_manual SET view = view+1 WHERE judul_artikel = ? LIMIT 1`,
    [kata]
  );
};

export const delKamusEng = (id, result) => {
  db.query("DELETE FROM en_id WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const delKamInd = (id, result) => {
  db.query("DELETE FROM id_eng WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

// post cadangan

export const postEnginDb = (enIng, res) => {
  db.query(
    "INSERT INTO en_id_manual (judul_artikel, isi_artikel) VALUES ?",
    [enIng.map((kata) => [kata.judul_artikel, kata.isi_artikel])],
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

export const getCadanganEngDb = (res) => {
  db.query("SELECT * FROM en_id_manual", (err, hasil) => {
    if (err) {
      res(err, null);
    } else {
      res(null, hasil);
    }
  });
};

export const delKataEngin = (id, result) => {
  db.query("DELETE FROM en_id_manual WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const postInEngDb = (idEng, res) => {
  db.query(
    "INSERT INTO id_eng_manual (judul_artikel, isi_artikel) VALUES ?",
    [idEng.map((kata) => [kata.judul_artikel, kata.isi_artikel])],
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

export const getCadanganIndDb = (res) => {
  db.query("SELECT * FROM id_eng_manual", (err, hasil) => {
    if (err) {
      res(err, null);
    } else {
      res(null, hasil);
    }
  });
};

export const delKataIdeng = (id, result) => {
  db.query("DELETE FROM id_eng_manual WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
