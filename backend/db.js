const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const bcrypt = require("bcrypt");

const User = require("./models/user.js");

dotenv.config({ path: path.resolve("../.env") });

async function initAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn("No ADMIN_EMAIL or ADMIN_PASSWORD provided in .env");
    return;
  }

  const existing = await User.findOne({ email });

  if (existing) {
    return;
  }

  const hashed = await bcrypt.hash(password, 10);

  const admin = new User({
    email,
    password: hashed,
    role: "admin",
  });

  await admin.save();
  console.log(`Admin user created: ${email}`);
}

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB Atlas");
    await initAdmin();
    return mongoose.connection;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

module.exports = { run };
