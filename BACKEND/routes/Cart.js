const router = require("express").Router();
const {
  addCart,
  editCart,
  deleteCart,
  getUserCart,
  getAllCarts,
} = require("../controllers/cart");
const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../controllers/verifyToken");

router.post("/add", verifyToken, addCart);
router.put("/edit/:id", verifyTokenAndAuthorization, editCart);
router.delete("/delete/:id", verifyTokenAndAuthorization, deleteCart);
router.get("/find/:userId", verifyTokenAndAuthorization, getUserCart);
router.get("/", verifyTokenAndAdmin, getAllCarts);

module.exports = router;
