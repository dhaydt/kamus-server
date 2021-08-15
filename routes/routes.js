// import express
import express from "express";
import {
  createKamus,
  destroyKamus,
  showKamus,
  updateKamus,
} from "../controllers/kamusController.js";

// import function from controller

// init express router
const router = express.Router();

// Get All Product
router.get("/kamus", showKamus);
router.post("/kamus", createKamus);
router.post("/kamuss", (req, res) => {
  //
});
router.delete("/kamus/:id", destroyKamus);
router.put("/kamus/:id", updateKamus);

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
