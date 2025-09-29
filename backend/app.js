const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");

const authMiddleware = require("./middleware/authenticate.js");
const technologyRoutes = require("./routes/technologies.js");
const authRoutes = require("./routes/auth.js");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(compression());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Technology Radar API" });
});

// Protected + public routes
app.use("/technologies", authMiddleware, technologyRoutes);
app.use("/auth", authRoutes);

module.exports = app;
