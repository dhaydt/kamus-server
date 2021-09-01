import { getReportDb, postReportDb } from "../models/reportModel.js";

export const getReport = (req, res) => {
  getReportDb((err, hasil) => {
    if (err) {
      res.send(err);
    } else {
      res.json(hasil);
    }
  });
};

export const postReport = (req, res) => {
  const data = req.body;
  postReportDb(data, (err, hasil) => {
    if (err) {
      res.send(err);
    } else {
      res.json(hasil);
    }
  });
};
