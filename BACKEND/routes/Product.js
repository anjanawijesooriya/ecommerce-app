const router = require("express").Router();
const { verifyTokenAndAdmin } = require("../controllers/verifyToken");

const {
  addProduct,
  editProduct,
  deleteProduct,
  getProduct,
  getProducts,
} = require("../controllers/product");

router.post("/add", verifyTokenAndAdmin, addProduct);
router.put("/edit/:id", verifyTokenAndAdmin, editProduct);
router.delete("/delete/:id", verifyTokenAndAdmin, deleteProduct);
router.get("/find/:id", getProduct);
router.get("/", getProducts);

module.exports = router;
