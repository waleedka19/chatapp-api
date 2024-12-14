const Room = require("../models/room");
const RoomParticipant = require("../models/roomParticipant");
const User = require("../models/user");
const io = require("../socket");

const { Op } = require("sequelize");
exports.postRoom = async (req, res) => {
  const hostId = req.userId;
  try {
    const hasRoom = await RoomParticipant.findOne({
      where: { userId: hostId },
    });

    if (hasRoom) {
      return res.status(400).json({ errMsg: "you have a room" });
    }

    const room = await Room.create({ hostId });

    await RoomParticipant.create({
      roomId: room.id,
      userId: hostId,
      role: "host",
    });

    res.status(201).json({ message: "Room created successfully", room });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteRoom = async (req, res) => {
  const hostId = req.userId;
  const roomId = req.params.roomid;
  try {
    const room = await Room.findOne({ where: { id: roomId, hostId: hostId } });

    if (!room) {
      return res.status(400).json({ errMsg: "You did not create this room" });
    }

    await Room.destroy({ where: { id: roomId } });

    return res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll({
      include: [
        {
          model: User,
          as: "host",
          attributes: ["id", "username", "profilePicture"],
        },
      ],
    });
    io.getIo().emit("rooms", { action: "get", rooms: rooms });

    return res.status(200).json({ rooms: rooms });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.postJoinRoom = async (req, res) => {
  const userId = req.userId;
  const roomid = req.body.roomid;

  try {
    const existingRoom = await RoomParticipant.findOne({ where: { userId } });
    if (existingRoom) {
      return res
        .status(400)
        .json({ message: "You are already in another room" });
    }

    const room = await Room.findByPk(roomid);
    console.log(room);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    const guestCount = await RoomParticipant.count({
      where: {
        roomId: roomid,
        role: "guest",
      },
    });

    if (guestCount > 0) {
      return res.status(400).json({ message: "Room is already full" });
    }

    await RoomParticipant.create({
      roomId: roomid,
      userId: userId,
      role: "guest",
    });

    return res.status(200).json({ message: "Joined room successfully", room });
  } catch (error) {
    console.error("Error joinning rooms:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getOneRoom = async (req, res) => {
  const roomId = req.params.roomid;
  const userId = req.userId;

  try {
    const room = await Room.findOne({
      where: { id: roomId },
      include: [
        {
          model: RoomParticipant,
          as: "participants",
          include: {
            model: User,
            as: "user",
            attributes: ["id", "username", "profilePicture"],
          },
        },
      ],
    });

    if (!room) {
      return res.status(404).json({ errMsg: "Room not found" });
    }

    const userRole = room.participants.find(
      (participant) => participant.userId === userId
    );

    if (!userRole) {
      return res
        .status(403)
        .json({ errMsg: "You are not authorized to view this room" });
    }

    res.status(200).json({
      room,
      userRole: userRole.role,
      participants: room.participants.map((p) => ({
        id: p.user.id,
        username: p.user.username,
        profilePicture: p.user.profilePicture,
        role: p.role,
      })),
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ errMsg: "Internal server error" });
  }
};

exports.postLeaveRoom = async (req, res) => {
  const userId = req.userId;
  const roomId = req.params.roomid;
  try {
    const isJoined = await RoomParticipant.findOne({
      where: { userId: userId, roomId: roomId },
    });
    if (!isJoined) {
      return res.status(400).json({ message: "you are not in this room " });
    }
    await RoomParticipant.destroy({
      where: { userId: userId, roomId: roomId },
    });

    return res
      .status(200)
      .json({ message: "You have left the room successfully" });
  } catch (error) {
    console.error("Error leaving the room:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
