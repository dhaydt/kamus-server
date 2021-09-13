import { delAdv, delUser, getUserDb } from "../models/userModel.js";

export const getUser = (req, res) => {
  getUserDb((err, hasil) => {
    if (err) {
      res.send(err);
    } else {
      res.json(hasil);
    }
  });
};

export const destroyUser = (req, res) => {
  const id = req.params.id;
  delUser(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const destroyAdv = (req, res) => {
  const id = req.params.id;
  delAdv(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
