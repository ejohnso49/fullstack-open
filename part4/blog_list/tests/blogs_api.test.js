const { describe, test, beforeEach, after } = require("node:test");
const supertest = require("supertest");
const mongoose = require("mongoose");
const assert = require("node:assert");
const app = require("../app");
const Blog = require("../models/blogs");
const { initialBlogs, getBlogsFromDb } = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let i = 0; i < initialBlogs.length; i++) {
    const blog = new Blog(initialBlogs[i]);
    await blog.save();
  }
});

describe("getting blog posts", async () => {
  test("returns 200 and json", async () => {
    await api.get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returns expected number of blogs", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, initialBlogs.length);
  });

  test("returns blogs with property of id instead of _id", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(typeof response.body[0].id, "string");
    assert.strictEqual(response.body[0]._id, undefined);
  });
});

describe("posting blogs", async () => {
  test("post increases blogs count by 1", async () => {
    const newBlog = {
      author: "Joe Baloney",
      title: "Joe Baloneyies",
      url: "joe.baloney.example.com",
      likes: 10,
    };

    await api.post("/api/blogs").send(newBlog).expect(201).expect("Content-Type", /application\/json/);
    const blogs = await getBlogsFromDb();
    const titles = blogs.map(blog => blog.title);

    assert.strictEqual(blogs.length, initialBlogs.length + 1);
    assert(titles.includes("Joe Baloneyies"));
  });

  test("post without likes defaults to 0", async () => {
    const newBlog = {
      author: "Big Dummy",
      title: "A Big One",
      url: "big.dummy.com",
    };

    const response = await api.post("/api/blogs").send(newBlog);
    assert.strictEqual(response.body.likes, 0);
  });

  test("posts without titles return 400", async () => {
    const newBlog = {
      author: "An author",
      url: "meaningless.com",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });

  test("posts without url return 400", async () => {
    const newBlog = {
      author: "Another author",
      title: "Missing URL",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

describe("deleting blogs", () => {
  test("succeeds with 204 when id is valid", async () => {
    const blogs = await getBlogsFromDb();
    const deleteId = blogs[0].id;

    await api.delete(`/api/blogs/${deleteId}`).expect(204);
    const blogsAfter = await getBlogsFromDb();

    assert.strictEqual(blogsAfter.length, blogs.length - 1);
  });
});

describe("updating blogs", () => {
  test("succeeds when id is valid", async () => {
    const blogs = await getBlogsFromDb();
    const newBlog = {
      ...blogs[0],
      likes: 5000,
    };

    await api.put(`/api/blogs/${newBlog.id}`).send(newBlog).expect(200);
  });
});

after(async () => {
  await mongoose.connection.close();
});
