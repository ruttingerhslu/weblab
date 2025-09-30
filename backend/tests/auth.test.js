const request = require("supertest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = require("../app.js");
const User = require("../models/user.js");

beforeEach(async () => {
  await User.deleteMany({});

  const salt = await bcrypt.genSalt(10);

  const hashedUser = await bcrypt.hash("test1234", salt);
  const hashedAdmin = await bcrypt.hash("admin1234", salt);

  const userData = {
    email: "test@test.com",
    password: hashedUser,
    role: "user",
  };

  const adminData = {
    email: "admin@test.com",
    password: hashedAdmin,
    role: "admin",
  };

  await User.insertMany([userData, adminData]);
});

test("should not allow same email twice", async () => {
  const userData = {
    email: "test@test.com",
    password: "test1234",
    role: "admin",
  };

  const user = new User(userData);

  await expect(user.save()).rejects.toThrow();
});

test("should not allow faulty password", async () => {
  expect.assertions(1);

  try {
    const userData = {
      email: "test@mail.com",
      password: "2short",
      role: "admin",
    };

    const user = new User(userData);
    await user.validate();
  } catch (err) {
    expect(err.errors.password).toBeDefined();
  }
});

test("POST /auth/register registers a new user", async () => {
  const token = jwt.sign({ id: "123", role: "admin" }, process.env.JWT_SECRET);

  const res = await request(app)
    .post("/auth/register")
    .set("Authorization", `Bearer ${token}`)
    .send({
      email: "test@mail.com",
      password: "test1234",
      role: "admin",
    });

  expect(res.status).toBe(201);
  expect(res.body.message).toBe("User registered successfully");
});

test("POST /auth/login user", async () => {
  const res = await request(app).post("/auth/login").send({
    email: "test@test.com",
    password: "test1234",
  });

  expect(res.status).toBe(200);
  expect(jwt.verify(res.body.token, process.env.JWT_SECRET).role).toBe("user");
});

test("POST /auth/login admin", async () => {
  const res = await request(app).post("/auth/login").send({
    email: "admin@test.com",
    password: "admin1234",
  });

  expect(res.status).toBe(200);
  expect(jwt.verify(res.body.token, process.env.JWT_SECRET).role).toBe("admin");
});

test("cannot login with invalid credentials", async () => {
  const res = await request(app).post("/auth/login").send({
    email: "admin@test.com",
    password: "invalid",
  });

  expect(res.status).toBe(400);
  expect(res.body.message).toBe("Invalid credentials");
});
