const request = require("supertest");
const app = require("../app.js");
const Technology = require("../models/technology.js");
const jwt = require("jsonwebtoken");

test("should create and save technology", async () => {
  const techData = {
    name: "Pair Programming",
    category: "Techniques",
    maturity: "Adopt",
    description:
      "Collaborative programming with two developers at one workstation.",
    classification: "Best Practice",
    publishedAt: new Date("2025-01-10"),
    createdAt: new Date("2025-01-01"),
  };
  const tech = new Technology(techData);
  const savedTech = await tech.save();

  expect(savedTech._id).toBeDefined();
  expect(savedTech.name).toBe(techData.name);
  expect(savedTech.description).toBe(techData.description);
  expect(savedTech.createdAt).toBe(techData.createdAt);

  await expect(new Technology({ name: "" }).save()).rejects.toThrow();
});

test("POST /technologies creates a new technology", async () => {
  const token = jwt.sign({ id: "123", role: "admin" }, process.env.JWT_SECRET);

  const res = await request(app)
    .post("/technologies")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "React",
      category: "Techniques",
      maturity: "Adopt",
      description: "UI library for building UIs",
      classification: "Well established",
      publish: true,
    });

  expect(res.status).toBe(201);
  expect(res.body.name).toBe("React");
  expect(res.body._id).toBeDefined();
});
