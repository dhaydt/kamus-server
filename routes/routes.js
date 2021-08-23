// import express
import express from "express";
import {
  cariEng,
  cariInd,
  getEng,
  getInd,
} from "../controllers/translatorController.js";
import {
  cariGlos,
  getGlossarium,
  postGlos,
} from "../controllers/glossariumController.js";
import {
  createKamus,
  destroyKamus,
  postKamusRow,
  search,
  showKamus,
  updateKamus,
} from "../controllers/kamusController.js";
import {
  cariNama,
  getNama,
  getNamaAll,
  postNama,
} from "../controllers/namaController.js";

// import function from controller

// init express router
const router = express.Router();

// Get All Product
router.get("/kamus", showKamus);
router.get("/nama", getNama);
router.get("/allNama", getNamaAll);
router.get("/glossarium", getGlossarium);
router.get("/kamusInd", getInd);
router.get("/kamusEng", getEng);
router.get("/find/:kata", search);
router.get("/findNama/:nama", cariNama);
router.get("/findGlos/:kata", cariGlos);
router.get("/translateEng/:kata", cariInd);
router.get("/translateInd/:kata", cariEng);
router.post("/kamus", createKamus);
router.post("/postkamus", postKamusRow);
router.post("/kamuss", (req, res) => {
  //
});
router.post("/postNama", postNama);
router.post("/postGlos", postGlos);
router.put("/kamus/:id", updateKamus);
router.delete("/kamus/:id", destroyKamus);

// // Get Single Product
// router.get("/products/:id", showProductById);

// // Create New Product
// router.post("/products", createProduct);

// // Update Product
// router.put("/products/:id", updateProduct);

// // Delete Product
// router.delete("/products/:id", deleteProduct);

// export default router
export default router;
