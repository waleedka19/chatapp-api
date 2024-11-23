const { Sequelize } = require("../dbconfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
exports.postSignup = async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const repass = req.body.repassword;

  if (password !== repass) {
    return res.status(400).json({ errMsg: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({
      where: {
        [Sequelize.Op.or]: [{ email: email }, { username: username }],
      },
    });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ errMsg: "Email already exists" });
      } else if (existingUser.username === username) {
        return res.status(400).json({ errMsg: "Username already exists" });
      }
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = await User.create({
      username: req.body.username,
      email: email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ msg: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error during user signup:", error);
    return res.status(500).json({ errMsg: "Internal server error" });
  }
};

exports.postLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res
        .status(400)
        .json({ errMsg: "A user with this email cannot be found" });
    }
    const checkpassword = await bcrypt.compare(password, user.password);
    if (!checkpassword) {
      return res.status(400).json({ errMsg: "Wrong password" });
    }
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "2h",
      }
    );
    res.status(200).json({ token: token });
  } catch (error) {
    console.error("Error during user login:", error);
    return res.status(500).json({ errMsg: "Internal server error" });
  }
};
