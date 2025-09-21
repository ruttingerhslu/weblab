import mongoose from "mongoose";

const technologySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  category: {
    type: String,
    enum: ["Techniques", "Tools", "Platforms", "Languages & Frameworks"],
    required: true,
  },
  maturity: {
    type: String,
    enum: ["Assess", "Trial", "Adopt", "Hold"],
    required: function () {
      return this.published === true; // only required if published
    },
    default: null,
    set: (v) => (v === "" ? null : v),
  },
  description: {
    type: String,
    required: true,
  },
  classification: {
    type: String,
    required: function () {
      return this.published === true; // only required if published
    },
    default: null,
    set: (v) => (v === "" ? null : v),
  },
  published: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Technology", technologySchema);
