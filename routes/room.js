const express = require("express");
const router = express.Router();

const roomCntrl = require("../controllers/room");
const isAuth = require("../middleware/isAuth");
router.post("/create-room", isAuth, roomCntrl.postRoom);

router.get("/rooms", isAuth, roomCntrl.getAllRooms);

router.post("/join-room", isAuth, roomCntrl.postJoinRoom);

router.post("/leave-room/:roomid", isAuth, roomCntrl.postLeaveRoom);

router.delete("/delete-room/:roomid", isAuth, roomCntrl.deleteRoom);

router.get("/room/:roomid", isAuth, roomCntrl.getOneRoom);

module.exports = router;
