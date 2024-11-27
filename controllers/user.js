const User = require("../models/user");

exports.patchProfilePic = async (req, res) => {
  const userId = req.userId;
  const filePath = req.file?.path;

  try {
    if (!filePath) {
      return res.status(400).json({ errMsg: "no file provided " });
    }
    const [updatedRows] = await User.update(
      { profilePicture: filePath },
      { where: { id: userId } }
    );

    if (updatedRows === 0) {
      return res
        .status(404)
        .json({ errMsg: "User not found or no changes made" });
    }
    const updatedUser = await User.findByPk(userId);
    return res.status(200).json({
      message: "Profile picture updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error changing profile pic:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
