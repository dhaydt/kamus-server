import {
  cariEngDb,
  cariIndDb,
  delKamInd,
  delKamusEng,
  delKataEngin,
  delKataIdeng,
  getCadanganEngDb,
  getCadanganIndDb,
  getEngDb,
  getIndDb,
  getPopEngInDb,
  getPopInEngDb,
  postEnginDb,
  postInEngDb,
  putEng,
  putInd,
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

export const getPopEngIn = (req, res) => {
  getPopEngInDb((err, hasil) => {
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

export const getPopInEng = (req, res) => {
  getPopInEngDb((err, hasil) => {
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

export const hapusKamusEng = (req, res) => {
  const id = req.params.id;
  delKamusEng(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const hapusKamInd = (req, res) => {
  const id = req.params.id;
  delKamInd(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// cadangan

export const postEngIn = (req, res) => {
  const data = req.body.data;
  var stringData = JSON.stringify(data);
  var enIng = JSON.parse(stringData);
  postEnginDb(enIng, (err, hasil) => {
    if (err) {
      res.send(err);
    } else {
      res.json(hasil);
    }
  });
};

export const updateEng = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  putEng(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const getEngCad = (req, res) => {
  getCadanganEngDb((err, hasil) => {
    if (err) {
      res.send(err);
    } else {
      res.json(hasil);
    }
  });
};

export const hapusEnginCadangan = (req, res) => {
  const id = req.params.id;
  delKataEngin(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const postIdEng = (req, res) => {
  const data = req.body.data;
  var stringData = JSON.stringify(data);
  var idEng = JSON.parse(stringData);
  postInEngDb(idEng, (err, hasil) => {
    if (err) {
      res.send(err);
    } else {
      res.json(hasil);
    }
  });
};

export const updateInd = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  putInd(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const getIndCad = (req, res) => {
  getCadanganIndDb((err, hasil) => {
    if (err) {
      res.send(err);
    } else {
      res.json(hasil);
    }
  });
};

export const hapusIdEngCadangan = (req, res) => {
  const id = req.params.id;
  delKataIdeng(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
