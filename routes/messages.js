const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const messageCntrl = require("../controllers/messages");
router.get("/messages/:roomid", isAuth, messageCntrl.getAllMessages);

router.post("/message/:roomid", isAuth, messageCntrl.postMessage);

module.exports = router;
