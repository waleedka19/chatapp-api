const express = require("express");
const router = express.Router();
const authCntrl = require("../controllers/auth");

router.post("/signup", authCntrl.postSignup);

router.post("/login", authCntrl.postLogin);

module.exports = router;
