const { describe, test, after, beforeEach, afterEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const Note = require("../models/note");
const User = require("../models/user");
const helper = require("./tests_helper");
const getToken = require("../utils/token");

const api = supertest(app);

describe("when there are some notes saved initially", async () => {
  beforeEach(async () => {
    await Note.deleteMany({});
    await Note.insertMany(helper.initialNotes);
  });

  test("notes are returned as json", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all notes are returned", async () => {
    const response = await api.get("/api/notes");

    assert.strictEqual(response.body.length, helper.initialNotes.length);
  });

  test("a specific note is within the returned notes", async () => {
    const response = await api.get("/api/notes");

    const contents = response.body.map(r => r.content);

    assert(contents.includes("Browser can execute only JavaScript"));
  });
});

describe("viewing a specific note", async () => {
  test("succeeds with a valid id", async () => {
    const notesAtStart = await helper.notesInDb();

    const noteToView = notesAtStart[0];

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.deepStrictEqual(resultNote.body, noteToView);
  });

  test("failed with statuscode 404 if note does not exist", async () => {
    const badId = await helper.nonExistingId();

    await api.get(`/api/notes/${badId}`).expect(404);
  });

  test("fails with statuscode 400 id is invalid", async () => {
    const invalidId = "1234125";
    await api.get(`/api/notes/${invalidId}`).expect(400);
  });
});

describe("addition of a new note", async () => {
  beforeEach(async () => {
    const sleepPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
    await sleepPromise;
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ name: "Test", username: "root", passwordHash });
    await user.save();
  });

  test("succeeds with valid data", async () => {
    const users = await helper.usersInDb();
    const testUser = users[0];
    const newNote = {
      content: "async/await simplifies making async calls",
      important: true,
      userId: testUser.id,
    };

    const token = getToken({ username: testUser.username, id: testUser.id });
    await api.post("/api/notes")
      .send(newNote)
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const notesAtEnd = await helper.notesInDb();
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1);

    const contents = notesAtEnd.map(n => n.content);
    assert(contents.includes("async/await simplifies making async calls"));
  });

  test("fails with statuscode 400 if data is invalid", async () => {
    const notesAtStart = await helper.notesInDb();
    const users = await helper.usersInDb();
    const testUser = users[0];
    const token = getToken({ username: testUser.username, id: testUser.id });
    const newNote = {
      important: true,
    };

    await api.post("/api/notes").send(newNote)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);

    const notesAtEnd = await helper.notesInDb();
    assert.deepStrictEqual(notesAtEnd, notesAtStart);
  });
});

describe("deletion of a note", () => {
  test("succeeds with statuscode 204 if id is valid", async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToDelete = notesAtStart[0];

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204);

    const notesAtEnd = await helper.notesInDb();
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length);

    const contents = notesAtEnd.map(r => r.content);
    assert(!contents.includes(noteToDelete.content));
  });
});

after(async () => {
  await mongoose.connection.close();
});
