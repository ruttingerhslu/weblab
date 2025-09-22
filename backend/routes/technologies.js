import express from "express";

import authorize from "../middleware/authorize.js";

import Technology from "../models/technology.js";

const router = express.Router();

router.post("/", authorize("admin"), async (req, res) => {
  try {
    const technology = new Technology(req.body);
    const saved = await technology.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", authorize("admin"), async (req, res) => {
  try {
    const updated = await Technology.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }, // return updated doc, validate against schema
    );

    if (!updated) {
      return res.status(404).json({ error: "Technology not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const technologies = await Technology.find();
    res.json(technologies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
