const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("../app.js");
const Technology = require("../models/technology.js");

let techId;

beforeEach(async () => {
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
  techId = savedTech._id.toString();
});

const adminToken = () =>
  jwt.sign({ id: "123", role: "admin" }, process.env.JWT_SECRET);

test("needs maturity and classification if published", async () => {
  expect.assertions(2);

  try {
    const techData = {
      name: "Pair Programming",
      category: "Techniques",
      description:
        "Collaborative programming with two developers at one workstation.",
      publishedAt: new Date("2025-01-10"),
      createdAt: new Date("2025-01-01"),
    };
    const tech = new Technology(techData);
    await tech.validate();
  } catch (err) {
    expect(err.errors.maturity).toBeDefined();
    expect(err.errors.classification).toBeDefined();
  }
});

test("POST /technologies creates a new technology", async () => {
  const res = await request(app)
    .post("/technologies")
    .set("Authorization", `Bearer ${adminToken()}`)
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

test("cant post faulty technology", async () => {
  const res = await request(app)
    .post("/technologies")
    .set("Authorization", `Bearer ${adminToken()}`)
    .send({
      name: "React",
      category: "Techniques",
      // missing properties
    });

  expect(res.status).toBe(400);
});

test("PUT /technologies/:id updates a technology", async () => {
  const res = await request(app)
    .put(`/technologies/${techId}`)
    .set("Authorization", `Bearer ${adminToken()}`)
    .send({
      name: "Pair Programming",
      category: "Techniques",
      maturity: "Hold",
      description:
        "Collaborative programming with two developers at one workstation.",
      classification: "Not best practice anymore",
      publish: true,
    });

  expect(res.status).toBe(200);
  expect(res.body.classification).toBe("Not best practice anymore");
});

test("DELETE /technologies/:id deletes a technology", async () => {
  const res = await request(app)
    .delete(`/technologies/${techId}`)
    .set("Authorization", `Bearer ${adminToken()}`);

  expect(res.status).toBe(200);
  expect(res.body.message).toBe("Technology deleted");

  const check = await Technology.findById(techId);
  expect(check).toBeNull();
});

test("GET /technologies returns all technologies", async () => {
  const res = await request(app)
    .get("/technologies")
    .set("Authorization", `Bearer ${adminToken()}`);

  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThanOrEqual(1);
  expect(res.body[0].name).toBe("Pair Programming");
});

test("GET /technologies/published returns only published technologies", async () => {
  await Technology.create({
    name: "Unpublished Tech",
    category: "Techniques",
    maturity: "Assess",
    description: "Not published",
    classification: "Experimental",
    publishedAt: null,
  });

  const res = await request(app)
    .get("/technologies/published")
    .set("Authorization", `Bearer ${adminToken()}`);

  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.every((t) => t.publishedAt)).toBe(true);
});

test("POST /technologies/bulk inserts multiple technologies", async () => {
  const res = await request(app)
    .post("/technologies/bulk")
    .set("Authorization", `Bearer ${adminToken()}`)
    .send([
      {
        name: "React",
        category: "Languages & Frameworks",
        maturity: "Adopt",
        description: "UI library",
        classification: "Well established",
        publish: true,
      },
      {
        name: "Rust",
        category: "Languages & Frameworks",
        maturity: "Trial",
        description: "Systems programming",
        classification: "Emerging",
        publish: false,
      },
    ]);

  expect(res.status).toBe(201);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBe(2);
  expect(res.body[0].name).toBe("React");
  expect(res.body[1].name).toBe("Rust");
});

test("POST /technologies/bulk rejects non-array payload", async () => {
  const res = await request(app)
    .post("/technologies/bulk")
    .set("Authorization", `Bearer ${adminToken()}`)
    .send({ name: "Not an array" });

  expect(res.status).toBe(400);
  expect(res.body.error).toBe("Expected an array");
});
