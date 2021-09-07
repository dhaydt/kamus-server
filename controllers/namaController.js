import {
  cariNamaDb,
  getNamaAllDb,
  getNamaDb,
  getPopNamaDb,
  postNamaDb,
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
