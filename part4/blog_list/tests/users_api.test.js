const bcrypt = require("bcrypt");
const { describe, test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/user");
const Blog = require("../models/blogs");
const helper = require("./test_helper");

const api = supertest(app);

describe("addition of a user", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();

    for (let i = 0; i < helper.initialBlogs.length; i++) {
      const blog = new Blog({ ...helper.initialBlogs[i], user: user.id });
      await blog.save();
      user.blogs = user.blogs.concat(blog._id);
      await user.save();
    }
  });

  test("creation succeeds with new username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "ejohnso49",
      name: "Eric",
      password: "silly",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map(user => user.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails with proper status code and message if username already exists", async () => {
    const usersAtStart = await helper.usersInDb();
    assert.strictEqual(usersAtStart[0].username, "root");

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "rootsy",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("expected \"username\" to be unique"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("creation fails if username or password are too short", async () => {
    const usersAtStart = await helper.usersInDb();

    let newUser = {
      username: "no",
      name: "I'm gonna fail",
      password: "doesn't matter",
    };

    let result = await api.post("/api/users").send(newUser).expect(400).expect("Content-Type", /application\/json/);
    assert(result.body.error.includes("Username too short"));

    newUser = {
      username: "better",
      name: "Gonna fail too",
      password: "no",
    };

    result = await api.post("/api/users").send(newUser).expect(400).expect("Content-Type", /application\/json/);
    assert(result.body.error.includes("Password too short"));

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("get users retrieves expected list", async () => {
    const usersAtStart = await helper.usersInDb();

    const result = await api.get("/api/users");
    assert.deepStrictEqual(result.body, usersAtStart);
  });
});

after(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});
