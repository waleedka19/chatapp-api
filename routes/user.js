const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const isAuth = require("../middleware/isAuth");
const userCntrl = require("../controllers/user");

router.patch(
  "/change-profile-pic",
  isAuth,
  upload.single("profilePicture"),
  userCntrl.patchProfilePic
);

module.exports = router;
