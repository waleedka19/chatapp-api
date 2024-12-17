let io;

module.exports = {
  init: (httpserver) => {
    io = require("socket.io")(httpserver, {
      cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
      },
    });
    return io;
  },
  getIo: () => {
    if (!io) {
      throw new Error("Socket io is not running");
    }
    return io;
  },
};
