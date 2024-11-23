const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");

const RoomParticipant = sequelize.define(
  "RoomParticipant",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Rooms", // Foreign key to Room model
        key: "id",
      },
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    role: {
      type: DataTypes.ENUM("host", "guest"),
      allowNull: false,
    },
    joinedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = RoomParticipant;
