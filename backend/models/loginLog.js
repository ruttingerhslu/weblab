import mongoose from "mongoose";

const loginLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: String,
  ipAddress: String,
  userAgent: String,
  loggedInAt: { type: Date, default: Date.now, index: { expires: "90d" } },
});

export default mongoose.model("LoginLog", loginLogSchema);
