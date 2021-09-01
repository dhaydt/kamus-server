import { getUserDb } from "../models/userModel.js";

export const getUser = (req, res) => {
  getUserDb((err, hasil) => {
    if (err) {
      res.send(err);
    } else {
      res.json(hasil);
    }
  });
};
