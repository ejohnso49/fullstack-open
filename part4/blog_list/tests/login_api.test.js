const { describe, test, beforeEach, after } = require("node:test");
const supertest = require("supertest");
const assert = require("node:assert");
const app = require("../app");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");
const api = supertest(app);

describe("Login API", async () => {
  beforeEach(async () => {
    await User.deleteMany({ username: "ejohnso49" });

    const newUser = {
      username: "ejohnso49",
      name: "Eric",
      password: "silly",
    };

    await api
      .post("/api/users")
      .send(newUser);
  });

  test("provides token when login successful", async () => {
    const loginRequest = {
      username: "ejohnso49",
      password: "silly",
    };

    const result = await api.post("/api/login").send(loginRequest);
    assert.strictEqual(result.status, 200);
    assert.strictEqual(result.body.username, loginRequest.username);
    const tokenData = jwt.decode(result.body.token);
    assert.strictEqual(tokenData.username, loginRequest.username);
  });

  test("returns 400 when username not found", async () => {
    const loginRequest = {
      username: "I don't exist",
      password: "whocares",
    };

    const result = await api.post("/api/login").send(loginRequest);
    assert.strictEqual(result.status, 400);
  });

  test("returns 403 when password is incorrect", async () => {
    const loginRequest = {
      username: "ejohnso49",
      password: "wrong",
    };

    const result = await api.post("/api/login").send(loginRequest);
    assert.strictEqual(result.status, 401);
  });
});

after(async () => {
  await mongoose.connection.close();
});
