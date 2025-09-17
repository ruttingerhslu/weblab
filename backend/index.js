import express from "express";
import bodyParser from "body-parser";
import { run } from "./db.js";
import technologyRoutes from "./routes/technologies.js";

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World, MongoDB is connected!");
});

run().then(() => {
  app.use("/technologies", technologyRoutes);

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
