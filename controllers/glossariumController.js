import {
  cariGlosDb,
  getGlossariumDb,
  postGlosDb,
} from "../models/glossariumModel.js";

export const getGlossarium = (req, res) => {
  getGlossariumDb((err, hasil) => {
    if (err) {
      res.send(err);
    } else {
      res.json(hasil);
    }
  });
};

export const cariGlos = (req, res) => {
  const kata = req.params.kata;
  cariGlosDb(kata, (err, hasil) => {
    if (err) {
      res.send(err);
    } else {
      console.log(hasil);
      res.json(hasil);
    }
  });
};

export const postGlos = (req, res) => {
  const data = req.body.data;
  var stringData = JSON.stringify(data);
  var glosarium = JSON.parse(stringData);
  postGlosDb(glosarium, (err, hasil) => {
    if (err) {
      res.send(err);
    } else {
      res.json(hasil);
    }
  });
};
