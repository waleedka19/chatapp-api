require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const sequelize = require("./dbconfig");
const Room = require("./models/room");
const RoomParticipant = require("./models/roomParticipant");
const User = require("./models/user");
const Message = require("./models/message");
const authRoutes = require("./routes/auth");
const roomRoutes = require("./routes/room");
const messageRoutes = require("./routes/messages");
const userRoutes = require("./routes/user");

app = express();

port = process.env.PORT;

app.use("/uploads", express.static("uploads"));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to enable CORS
app.use(cors());

app.use(authRoutes);
app.use(roomRoutes);
app.use(messageRoutes);
app.use(userRoutes);

User.hasOne(Room, { foreignKey: "hostId", as: "hostedRooms" });
Room.belongsTo(User, { foreignKey: "hostId", as: "host" });

Room.hasMany(RoomParticipant, { foreignKey: "roomId", as: "participants" });
RoomParticipant.belongsTo(Room, { foreignKey: "roomId", as: "room" });

User.hasMany(RoomParticipant, {
  foreignKey: "userId",
  as: "roomParticipations",
});
RoomParticipant.belongsTo(User, { foreignKey: "userId", as: "user" });

Room.hasMany(Message, { foreignKey: "roomId", as: "messages" });
Message.belongsTo(Room, { foreignKey: "roomId", as: "room" });

User.hasMany(Message, { foreignKey: "senderId", as: "messages" });
Message.belongsTo(User, { foreignKey: "senderId", as: "sender" });

sequelize
  .sync({ force: false })
  .then(() => {
    const server = app.listen(port, () => {
      const io = require("./socket").init(server);
      console.log(`Server is running on port ${port}`);
      io.on("connection", (socket) => {
        console.log("client conectted");
      });
    });
  })
  .catch((error) => console.error("Error syncing database:", error));
