const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");
const Room = sequelize.define(
  "Room",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    hostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // Foreign key to User model
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
  }
);

module.exports = Room;
