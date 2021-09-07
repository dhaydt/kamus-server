// import express
import express from "express";
import {
  cariEng,
  cariInd,
  getEng,
  getInd,
  getPopEngIn,
  getPopInEng,
} from "../controllers/translatorController.js";
import {
  cariGlos,
  getGlossarium,
  getPopGlos,
  postGlos,
} from "../controllers/glossariumController.js";
import {
  createKamus,
  destroyKamus,
  getGlobalRandom,
  getPop,
  postKamusRow,
  search,
  showKamus,
  updateKamus,
} from "../controllers/kamusController.js";
import {
  cariNama,
  getNama,
  getNamaAll,
  getPopNama,
  postNama,
} from "../controllers/namaController.js";
import { getReport, postReport } from "../controllers/reportController.js";

// import function from controller

// import Uploaded Images
import {
  getImg,
  getLastId,
  getSecondId,
  getThirdId,
  index,
  profile,
} from "../upload/routes.js";
import db from "../config/db.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { getUser } from "../controllers/userController.js";
// init express rout
const router = express.Router();

// Auth
router.get("/getUser", getUser);

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
// Global
router.get("/random", getGlobalRandom);

// KBBI
router.get("/kamus", showKamus);
router.get("/kamus/pop", getPop);
router.post("/kamus", createKamus);
router.post("/postkamus", postKamusRow);
router.put("/kamus/:id", updateKamus);
router.delete("/kamus/:id", destroyKamus);
router.get("/find/:kata", search);

// Glosarium
router.get("/glossarium", getGlossarium);
router.get("/istilah/pop", getPopGlos);
router.post("/postGlos", postGlos);
router.get("/findGlos/:kata", cariGlos);

// Arti nama
router.get("/nama", getNama);
router.get("/nama/pop", getPopNama);
router.get("/allNama", getNamaAll);
router.get("/findNama/:nama", cariNama);
router.post("/postNama", postNama);

// Translator
router.get("/kamusInd", getInd);
router.get("/engin/pop", getPopEngIn);
router.get("/translateInd/:kata", cariEng);
router.get("/ineng/pop", getPopInEng);
router.get("/kamusEng", getEng);
router.get("/translateEng/:kata", cariInd);

// report
router.get("/getReport", getReport);
router.post("/report", postReport);

// adv
router.get("/getAdv/:id", getImg);
router.post("/postAdv", index);
router.get("/getAdv", profile);
router.get("/getLastAdv", getLastId);
router.get("/getSecondAdv", getSecondId);
router.get("/getThirdAdv", getThirdId);

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
