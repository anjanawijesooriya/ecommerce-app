const router = require("express").Router();
const {
  register,
  login,
  edit,
  deleteUser,
  getUser,
  getUsers,
  stats,
} = require("../controllers/auth");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/verifyToken");

router.post("/register", register);
router.post("/login", login);
router.put("/:id", verifyTokenAndAuthorization, edit);
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);
router.get("/find/:id", verifyTokenAndAdmin, getUser);
router.get("/", verifyTokenAndAdmin, getUsers);
router.get("/stats", verifyTokenAndAdmin, stats);

module.exports = router;
