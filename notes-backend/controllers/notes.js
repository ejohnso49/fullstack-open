const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");

notesRouter.get("/", async (request, response) => {
  const notes = await Note
    .find({})
    .populate("user", { username: 1, name: 1 });
  response.json(notes);
});

notesRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const note = await Note.findById(id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

notesRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  await Note.findByIdAndDelete(id);
  response.status(204).end();
});

notesRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = await User.findById(body.userId);

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user ? user.id : undefined,
  });

  const savedNote = await note.save();

  if (user) {
    user.notes = user.notes.concat(savedNote._id);
    await user.save();
  }

  response.status(201).json(savedNote);
});

notesRouter.put("/:id", async (request, response) => {
  const { content, important } = request.body;

  const updatedNote = await Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" },
  );

  if (updatedNote) {
    response.json(updatedNote);
  } else {
    response.status(404).json({ error: "Note does not exist" });
  }
});

module.exports = notesRouter;
