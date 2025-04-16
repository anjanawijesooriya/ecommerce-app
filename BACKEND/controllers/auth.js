const User = require("../models/User");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

//register
exports.register = async (req, res) => {
  const { username, email } = req.body;
  const encryptedPassword = CryptoJS.AES.encrypt(
    req.body.password,
    process.env.PASS_SECRT
  ).toString();
  const newUser = new User({
    username,
    email,
    password: encryptedPassword,
  });
  try {
    const user = await newUser.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error creating User", error });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ message: "Wrong Credentials!" });
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SECRT
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== req.body.password) {
      return res.status(401).json({ message: "Wrong Credentials!" });
    }
    const { password, ...others } = user._doc;
    accessToken(others, 200, res);
  } catch (error) {
    return res.status(500).json({ message: "Error loggin in", error });
  }
};

//edit user
exports.edit = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRT
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User has been deleted..." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

//get user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json({ user: others });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

//get all users
exports.getUsers = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

//stats
exports.stats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      {
        $match: { createdAt: { $gte: lastYear } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error });
  }
};

const accessToken = (user, statusCode, res) => {
  const token = jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SEC,
    { expiresIn: "3d" }
  );

  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};
