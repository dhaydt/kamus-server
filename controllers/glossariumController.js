import {
  cariGlosDb,
  getGlossariumCadanganDb,
  getGlossariumDb,
  getIstilahCadanganDb,
  getPopIstilahDb,
  hapusIstilah,
  hapusIstilahManual,
  hapusManual2,
  postGlos2,
  postGlosDb,
  putGlos,
  putIstilah,
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

export const getPopGlos = (req, res) => {
  getPopIstilahDb((err, hasil) => {
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

export const postGlosarium2 = (req, res) => {
  const data = req.body.data;
  var stringData = JSON.stringify(data);
  var glosarium = JSON.parse(stringData);
  postGlos2(glosarium, (err, hasil) => {
    if (err) {
      res.send(err);
    } else {
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

export const updateGlos = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  putGlos(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const updateIstilah = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  putIstilah(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const hapusIstilahUtama = (req, res) => {
  const id = req.params.id;
  hapusIstilah(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// istilah tambahan

export const getGlossariumCadangan = (req, res) => {
  getGlossariumCadanganDb((err, hasil) => {
    if (err) {
      res.send(err);
    } else {
      res.json(hasil);
    }
  });
};

export const getIstilahCadangan = (req, res) => {
  getIstilahCadanganDb((err, hasil) => {
    if (err) {
      res.send(err);
    } else {
      res.json(hasil);
    }
  });
};

export const hapusIstilahCadangan = (req, res) => {
  const id = req.params.id;
  hapusIstilahManual(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const hapusIsManual2 = (req, res) => {
  const id = req.params.id;
  hapusManual2(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
