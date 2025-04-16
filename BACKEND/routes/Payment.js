const router = require("express").Router();

const { createPayment } = require("../controllers/payment");

router.post("/payment", createPayment);

module.exports = router;
