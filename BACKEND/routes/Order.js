const router = require("express").Router();
const {
  addOrder,
  editOrder,
  deleteOrder,
  getUserOrder,
  getAllOrders,
  getMonthlyIncome,
} = require("../controllers/order");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../controllers/verifyToken");

router.post("/add", verifyToken, addOrder);
router.put("/edit/:id", verifyTokenAndAdmin, editOrder);
router.delete("/delete/:id", verifyTokenAndAdmin, deleteOrder);
router.get("/find/:userId", verifyTokenAndAuthorization, getUserOrder);
router.get("/", verifyTokenAndAdmin, getAllOrders);
router.get("/income", verifyTokenAndAdmin, getMonthlyIncome);

module.exports = router;
