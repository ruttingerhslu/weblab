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

router.get("/", async (req, res) => {
  try {
    const technologies = await Technology.find();
    res.json(technologies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
