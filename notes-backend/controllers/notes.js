const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.get("/:id", (request, response, next) => {
  const id = request.params.id;
  Note.findById(id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

notesRouter.delete("/:id", (request, response, next) => {
  const id = request.params.id;
  Note.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        response.status(204).end();
      } else {
        response.status(404).json({ error: "Note does not exist" });
      }
    })
    .catch(error => next(error));
});

notesRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  try {
    const result = await note.save();
    response.status(201).json(result);
  } catch (exception) {
    next(exception);
  }
});

notesRouter.put("/:id", (request, response, next) => {
  const { content, important } = request.body;

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" },
  )
    .then((updatedNote) => {
      if (response) {
        response.json(updatedNote);
      } else {
        response.status(404).json({ error: "Note does not exist" });
      }
    })
    .catch(error => next(error));
});

module.exports = notesRouter;
