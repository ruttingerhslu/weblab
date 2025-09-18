import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { run } from "./db.js";
import authMiddleware from "./middleware/authenticate.js";

import technologyRoutes from "./routes/technologies.js";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Technology Radar API" });
});

run().then(() => {
  app.use("/technologies", authMiddleware, technologyRoutes);
  app.use("/auth", authRoutes);

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
