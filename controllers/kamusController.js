import {
  delKamus,
  getKamus,
  postKamus,
  putKamus,
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
