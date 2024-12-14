const { Sequelize } = require("../dbconfig");
const Room = require("../models/room");
const Message = require("../models/message");
const User = require("../models/user");
const io = require("../socket");

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
    // Fetch sender details for real-time updates
    const fullMessage = await Message.findOne({
      where: { id: sendMessage.id },
      include: {
        model: User,
        as: "sender",
        attributes: ["id", "username", "profilePicture"],
      },
    });

    io.getIo().emit("message", { action: "send", message: fullMessage });

    return res.status(201).json({ msg: "message sent", data: fullMessage });
  } catch (error) {
    console.error("Error during sending message :", error);
    return res.status(500).json({ errMsg: "Internal server error" });
  }
};

exports.getAllMessages = async (req, res) => {
  const roomid = req.params.roomid;

  try {
    if (!roomid) {
      return res.status(400).json({ errMsg: "Room ID is required" });
    }

    // Fetch messages with sender details
    const messages = await Message.findAll({
      where: { roomId: roomid },
      include: {
        model: User,
        as: "sender",
        attributes: ["id", "username", "profilePicture"],
      },
      order: [["createdAt", "ASC"]],
    });

    if (!messages.length) {
      return res
        .status(200)
        .json({ message: "No messages found", messages: [] });
    }

    return res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ errMsg: "Internal server error" });
  }
};
