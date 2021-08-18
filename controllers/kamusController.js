import {
  delKamus,
  getKamus,
  postKamus,
  putKamus,
  searchWord,
} from "../models/kamusModel.js";

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
