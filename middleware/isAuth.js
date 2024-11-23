const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  const token = authHeader.split(" ")[1];
  try {
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization failed: No token provided" });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ message: "User not found" });
    }

    req.userId = decodedToken.id;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Authorization failed: Invalid token" });
  }
};
