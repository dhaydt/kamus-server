import {
  cariEngDb,
  cariIndDb,
  getEngDb,
  getIndDb,
} from "../models/translatorModel.js";

export const getInd = (req, res) => {
  getIndDb((err, hasil) => {
    if (err) {
      res.send(err);
    } else {
      res.json(hasil);
    }
  });
};

export const getEng = (req, res) => {
  getEngDb((err, hasil) => {
    if (err) {
      res.send(err);
    } else {
      res.json(hasil);
    }
  });
};

export const cariInd = (req, res) => {
  const kata = req.params.kata;
  cariIndDb(kata, (err, hasil) => {
    if (err) {
      res.send(err);
    } else {
      res.json(hasil);
    }
  });
};

export const cariEng = (req, res) => {
  const kata = req.params.kata;
  cariEngDb(kata, (err, hasil) => {
    if (err) {
      res.send(err);
    } else {
      res.json(hasil);
    }
  });
};
