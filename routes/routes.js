// import express
import express from "express";
import {
  cariEng,
  cariInd,
  filtersEng,
  filtersInd,
  getEng,
  getEngCad,
  getInd,
  getIndCad,
  getPopEngIn,
  getPopInEng,
  hapusEnginCadangan,
  hapusIdEngCadangan,
  hapusKamInd,
  hapusKamusEng,
  postEngIn,
  postIdEng,
  updateEng,
  updateInd,
} from "../controllers/translatorController.js";
import {
  cariGlos,
  filtersGlos,
  getGlossarium,
  getGlossariumCadangan,
  getIstilahCadangan,
  getPopGlos,
  hapusIsManual2,
  hapusIstilahCadangan,
  hapusIstilahUtama,
  postGlos,
  postGlosarium2,
  updateGlos,
  updateIstilah,
} from "../controllers/glossariumController.js";
import {
  createKamus,
  destroyKamus,
  destroyKamusCadangan,
  filtersManual,
  filtersTable,
  getGlobalRandom,
  getPop,
  postKamusRow,
  search,
  showKamus,
  showKamusCadangan,
  updateKamus,
} from "../controllers/kamusController.js";
import {
  cariNama,
  destroyNama,
  destroyNamaCadangan,
  filtersNama,
  getNama,
  getNamaAll,
  getNamaCadangan,
  getPopNama,
  postNama,
  updateNama,
} from "../controllers/namaController.js";
import {
  destroyReport,
  getReport,
  postReport,
} from "../controllers/reportController.js";

// import function from controller

// import Uploaded Images
import {
  getAtasJudul,
  getAtasLainnya,
  getAtasRelated,
  getAtasShared,
  getBawahJudul,
  getImg,
  getLastId,
  getSecondId,
  getSideAtas,
  getSideBawah,
  getSideTengah,
  getThirdId,
  index,
  profile,
} from "../upload/routes.js";
import db from "../config/db.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import {
  destroyAdv,
  destroyUser,
  getUser,
} from "../controllers/userController.js";
import { filterInd } from "../models/translatorModel.js";
// init express rout
const router = express.Router();

// Global
router.get("/random", getGlobalRandom);

// KBBI
router.get("/kamus", showKamus);
router.get("/kamusCadangan", showKamusCadangan);
router.get("/kamus/pop", getPop);
router.post("/kamus", createKamus);
router.post("/postkamus", postKamusRow);
router.put("/kamusCadangan/:id", updateKamus);
router.delete("/kamus/:id", destroyKamus);
router.delete("/kamusCadangan/:id", destroyKamusCadangan);
router.get("/find/:kata", search);

// Glosarium
router.get("/glossarium", getGlossarium);
router.get("/glossariumCadangan", getGlossariumCadangan);
router.put("/glossariumCadangan/:id", updateGlos);
router.get("/glossariumCadangan2", getIstilahCadangan);
router.put("/glossariumCadangan2/:id", updateIstilah);
router.get("/istilah/pop", getPopGlos);
router.post("/postGlos", postGlos);
router.post("/postGlos2", postGlosarium2);
router.get("/findGlos/:kata", cariGlos);
router.delete("/glossarium/:id", hapusIstilahUtama);
router.delete("/glossariumCadangan/:id", hapusIstilahCadangan);
router.delete("/glossariumCadangan2/:id", hapusIsManual2);

// Arti nama
router.get("/nama", getNama);
router.get("/nama/pop", getPopNama);
router.get("/allNama", getNamaAll);
router.get("/allNamaCadangan", getNamaCadangan);
router.put("/allNamaCadangan/:id", updateNama);
router.get("/findNama/:nama", cariNama);
router.post("/postNama", postNama);
router.delete("/allNama/:id", destroyNama);
router.delete("/allNamaCadangan/:id", destroyNamaCadangan);

// Translator
// in-eng
router.get("/kamusInd", getInd);
router.get("/engInCadangan", getEngCad);
router.put("/engInCadangan/:id", updateEng);
router.post("/postEng", postEngIn);
router.get("/translateInd/:kata", cariEng);
router.get("/engin/pop", getPopEngIn);
router.delete("/engInCadangan/:id", hapusEnginCadangan);
router.delete("/kamusInd/:id", hapusKamusEng);

// eng-in
router.get("/ineng/pop", getPopInEng);
router.get("/kamusEng", getEng);
router.get("/translateEng/:kata", cariInd);
router.delete("/kamusEng/:id", hapusKamInd);
router.delete("/kamusEngCad/:id", hapusIdEngCadangan);
router.put("/kamusEngCad/:id", updateInd);
router.get("/kamusEngCad/", getIndCad);
router.post("/postInd", postIdEng);

// report
router.get("/getReport", getReport);
router.delete("/getReport/:id", destroyReport);
router.post("/report", postReport);

// adv
router.get("/getAdv/:id", getImg);
router.post("/postAdv", index);
router.get("/getAdv", profile);
router.delete("/getAdv/:id", destroyAdv);
router.get("/getLastAdv", getLastId);
router.get("/getSecondAdv", getSecondId);
router.get("/getThirdAdv", getThirdId);

// Adv main
router.get("/getAtasJudul", getAtasJudul);
router.get("/getBawahJudul", getBawahJudul);
router.get("/getAtasRelated", getAtasRelated);
router.get("/getAtasLainnya", getAtasLainnya);
router.get("/getAtasShared", getAtasShared);
//Adv side
router.get("/getSideAtas", getSideAtas);
router.get("/getSideTengah", getSideTengah);
router.get("/getSideBawah", getSideBawah);

// table FILTER
router.get("/filKbbi/:kata", filtersTable);
router.get("/filKbbiManual/:kata", filtersManual);
router.get("/filGlos/:kata", filtersGlos);
router.get("/filNama/:kata", filtersNama);
router.get("/filEng/:kata", filtersEng);
router.get("/filInd/:kata", filtersInd);

// pagination
const resultPerPage = 30;
router.get("/kbbiPagi", (req, res) => {
  let sql = "SELECT * FROM kamus";
  db.query(sql, (err, result) => {
    if (err) throw err;
    const numOfResults = result.length;
    const numberOfPages = Math.ceil(numOfResults / resultPerPage);

    let page = req.query.page ? Number(req.query.page) : 1;

    if (page > numberOfPages) {
      res.redirect("/?page=" + encodeURIComponent(numberOfPages));
    } else if (page < 1) {
      res.redirect("/?page=" + encodeURIComponent("1"));
    }

    const startingLimit = (page - 1) * resultPerPage;
    sql = `SELECT * FROM kamus LIMIT ${startingLimit}, ${resultPerPage}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      let iterator = page - 5 < 1 ? 1 : page - 5;
      let endingLink =
        iterator + 9 <= numberOfPages
          ? iterator + 9
          : page + (numberOfPages - page);
      if (endingLink < page + 4) {
        iterator -= page + 4 - numberOfPages;
      }
      res.json({ data: result, page, iterator, endingLink, numberOfPages });
    });
  });
});

// Auth
router.get("/getUser", getUser);
router.delete("/getUser/:id", destroyUser);

router.post("/register", (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE email = ?`,
    [req.body.email],
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: "Email sudah dipakai!",
        });
      } else {
        bcrypt.hash(req.body.password, 8, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          } else {
            db.query(
              `INSERT INTO users SET id = ?, username = ?, email = ?, password = ?`,
              [uuidv4(), req.body.username, req.body.email, hash],
              (err, result) => {
                if (err) {
                  console.log(err);
                  return res.status(400).send({
                    msg: "Password / Email salah",
                    stat: err,
                  });
                } else {
                  return res.status(201).send({
                    msg: "Registered!",
                    data: result,
                  });
                }
              }
            );
          }
        });
      }
    }
  );
});
router.post("/login", (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE email = ?`,
    [req.body.email],
    (err, result) => {
      if (err) {
        return res.status(400).send({
          msg: "Password / Email salah",
          stat: err,
        });
      }

      if (!result.length) {
        return res.status(400).send({
          msg: "Email atau password salah!",
        });
      }

      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          if (bErr) {
            return res.status(401).send({
              msg: "Password salah",
            });
          }

          if (bResult) {
            const token = jwt.sign(
              {
                email: result[0].email,
                userId: result[0].id,
              },
              `SECRETKEY`,
              {
                expiresIn: "7d",
              }
            );

            db.query(
              `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            );
            return res.status(200).send({
              msg: "Logged In",
              Auth: true,
              token,
              user: result[0],
            });
          }

          return res.status(401).send({
            msg: "Email atau Password salah",
          });
        }
      );
    }
  );
});
// router.post("/kamuss", (req, res) => {
//   //
// });

// // Get Single Product
// router.get("/products/:id", showProductById);

// // Create New Product
// router.post("/products", createProduct);

// // Update Product
// router.put("/products/:id", updateProduct);

// // Delete Product
// router.delete("/products/:id", deleteProduct);

export default router;
