import {
  cariNamaDb,
  delNama,
  delNamaCadangan,
  getNamaAllDb,
  getNamaCadanganDb,
  getNamaDb,
  getPopNamaDb,
  postNamaDb,
  putNama,
} from "../models/namaModel.js";

export const getNama = (req, res) => {
  getNamaDb((err, hasil) => {
    if (err) {
      res.send(err);
    } else {
      res.json(hasil);
    }
  });
};

export const getPopNama = (req, res) => {
  getPopNamaDb((err, hasil) => {
    if (err) {
      res.send(err);
    } else {
      res.json(hasil);
    }
  });
};

export const getNamaAll = (req, res) => {
  getNamaAllDb((err, hasil) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(hasil);
    }
  });
};

export const cariNama = (req, res) => {
  const nama = req.params.nama;
  cariNamaDb(nama, (err, hasil) => {
    if (err) {
      res.send(err);
    } else {
      console.log(hasil);
      res.json(hasil);
    }
  });
};

export const postNama = (req, res) => {
  const data = req.body.data;
  var stringData = JSON.stringify(data);
  var artiNama = JSON.parse(stringData);
  postNamaDb(artiNama, (err, hasil) => {
    if (err) {
      res.send(err);
    } else {
      res.json(hasil);
    }
  });
};

export const destroyNama = (req, res) => {
  const id = req.params.id;
  delNama(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Nama cadangan

export const getNamaCadangan = (req, res) => {
  getNamaCadanganDb((err, hasil) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(hasil);
    }
  });
};

export const updateNama = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  putNama(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const destroyNamaCadangan = (req, res) => {
  const id = req.params.id;
  delNamaCadangan(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
