const { test, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two notes", async () => {
  const response = await api.get("/api/notes");

  assert.strictEqual(response.body.length, 2);
});

test("the first note is about Arpan", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map(e => e.content);
  console.log(contents);
  assert.strictEqual(contents.includes("Arpan be training"), true);
});

after(async () => {
  await mongoose.connection.close();
});
