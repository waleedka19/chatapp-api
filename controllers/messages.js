const { Sequelize } = require("../dbconfig");
const Room = require("../models/room");
const RoomParticipant = require("../models/roomParticipant");
const Message = require("../models/message");

exports.postMessage = async (req, res) => {
  const roomid = req.params.roomid;
  const message = req.body.message;
  const userid = req.userId;

  try {
    if (!userid || !roomid || !message) {
      return res.status(400).json({
        errMsg: "user or roomid or message is missing ",
        userid,
        message,
        userid,
      });
    }
    const sendMessage = await Message.create({
      roomId: roomid,
      senderId: userid,
      message: message,
    });

    return res.status(201).json({ msg: "message sent", data: sendMessage });
  } catch (error) {
    console.error("Error during sending message :", error);
    return res.status(500).json({ errMsg: "Internal server error" });
  }
};

exports.getAllMessages = async (req, res) => {
  const roomid = req.params.roomid;

  try {
    if (!roomid) {
      return res.status(400).json({ errMsg: "there is no room found " });
    }
    const messages = await Message.findAll({
      where: { roomId: roomid },
      order: [["createdAt", "DESC"]],
    });
    if (!messages) {
      return res
        .status(200)
        .json({ message: "Send your first message in the room " });
    }
    return res.status(200).json({ messages: messages });
  } catch (error) {
    console.error("Error during geeting messages :", error);
    return res.status(500).json({ errMsg: "Internal server error" });
  }
};
