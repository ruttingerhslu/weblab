import express from "express";

import authorize from "../middleware/authorize.js";

import Technology from "../models/technology.js";

const router = express.Router();

router.post("/", authorize("admin"), async (req, res) => {
  try {
    const { publish, ...rest } = req.body;
    const technology = new Technology({
      ...rest,
      publishedAt: publish ? new Date() : null,
    });
    const saved = await technology.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", authorize("admin"), async (req, res) => {
  try {
    const { publish, ...rest } = req.body;

    const updated = await Technology.findByIdAndUpdate(
      req.params.id,
      {
        ...rest,
        publishedAt: publish ? new Date() : null,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true },
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
