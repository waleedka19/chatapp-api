require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./dbconfig");
const authRoutes = require("./routes/auth");
const roomRoutes = require("./routes/room");
app = express();

port = process.env.PORT;
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to enable CORS
app.use(cors());

app.use(authRoutes);
app.use(roomRoutes);
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.error("Error syncing database:", error));
