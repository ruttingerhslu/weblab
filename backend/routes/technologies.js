const express = require("express");

const authorize = require("../middleware/authorize.js");
const Technology = require("../models/technology.js");

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

router.post("/bulk", authorize("admin"), async (req, res) => {
  try {
    const technologies = req.body;
    if (!Array.isArray(technologies)) {
      return res.status(400).json({ error: "Expected an array" });
    }

    const prepared = technologies.map(({ publish, ...rest }) => ({
      ...rest,
      publishedAt: publish ? new Date() : null,
    }));

    const saved = await Technology.insertMany(prepared);
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
