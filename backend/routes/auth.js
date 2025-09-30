const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authenticate = require("../middleware/authenticate.js");
const authorize = require("../middleware/authorize.js");

const User = require("../models/user.js");
const LoginLog = require("../models/loginLog.js");

const router = express.Router();

router.post("/register", authenticate, authorize("admin"), async (req, res) => {
  try {
    const { email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      email,
      password: hashedPassword,
      role: role || "user",
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    if (user.role === "admin") {
      try {
        await LoginLog.create({
          userId: user._id,
          username: user.username || user.email,
          ipAddress: req.ip,
          userAgent: req.get("User-Agent"),
        });
      } catch (logErr) {
        console.error("Failed to log admin login:", logErr.message);
      }
    }

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
