import {
  delKamus,
  getGlobalDB,
  getKamus,
  getPopDb,
  postKamus,
  postKamusDb,
  putKamus,
  searchWord,
} from "../models/kamusModel.js";

// Get global

export const getGlobalRandom = (req, res) => {
  getGlobalDB((err, global) => {
    if (err) {
      res.send(err);
    } else {
      res.json(global);
    }
  });
};

// Get All Products
export const showKamus = (req, res) => {
  getKamus((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const getPop = (req, res) => {
  getPopDb((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const createKamus = (req, res) => {
  const data = req.body;
  postKamus(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const postKamusRow = (req, res) => {
  const data = req.body.data;
  var stringData = JSON.stringify(data);
  var records = JSON.parse(stringData);
  console.log(records);
  // console.log(resultMap);
  // const records = req.body.data;
  postKamusDb(records, (err, hasil) => {
    if (err) {
      res.send(err);
    } else {
      res.json(hasil);
    }
  });
};

export const updateKamus = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  putKamus(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const destroyKamus = (req, res) => {
  const id = req.params.id;
  delKamus(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const search = (req, res) => {
  const word = req.params.kata;
  console.log(word);
  searchWord(word, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      console.log(results);
      res.json(results);
    }
  });
};
