const express = require("express");
const { getBalance } = require("../controllers/balanceController.js");
const router = express.Router();

router.get("/balance", getBalance);

module.exports = router;
