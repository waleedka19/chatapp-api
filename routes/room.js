const express = require("express");
const router = express.Router();
const authCntrl = require("../controllers/auth");
const roomCntrl = require("../controllers/room");
const isAuth = require("../middleware/isAuth");
router.post("/create-room", isAuth, roomCntrl.postRoom);

router.get("/rooms", isAuth, roomCntrl.getAllRooms);

router.post("/join-room", isAuth);

router.delete("/delete-room/:roomid", isAuth, roomCntrl.deleteRoom);

router.get("/room/:roomid");

module.exports = router;
