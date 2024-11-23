const Room = require("../models/room");
const RoomParticipant = require("../models/roomParticipant");
const User = require("../models/user");
exports.postRoom = async (req, res) => {
  const hostId = req.userId;
  try {
    const hasRoom = await Room.findOne({ where: { hostId: hostId } });

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
          attributes: ["id", "username"],
        },
      ],
    });

    return res.status(200).json({ rooms: rooms });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
