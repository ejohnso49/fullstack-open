const { describe, test, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

const testUser = {
  username: "ejohnso49",
  password: "sillypassword",
};

describe("login", () => {
  test("Valid login returns token", async () => {
    await User.deleteMany({});

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(testUser.password, saltRounds);

    const newUser = new User({
      username: testUser.username,
      name: "Eric",
      passwordHash: passwordHash,
    });

    await newUser.save();

    const response = await api
      .post("/api/login")
      .send(testUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.username, testUser.username);
  });
});

after(async () => {
  await mongoose.connection.close();
});
