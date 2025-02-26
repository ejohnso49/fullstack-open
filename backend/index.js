const express = require('express');
const cors = require('cors');
const Note = require('./models/note');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

const requestLogger = (request, response, next) => {
  console.log('Method: ', request.method);
  console.log('Path: ', request.path);
  console.log('Body: ', request.body);
  console.log('---');
  next();
};

app.use(requestLogger);

app.get('/', (request, response) => {
  response.send('<h1>Hello world!</h1>');
});

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes);
  });
});

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  Note.findById(id).then(note => {
    response.json(note);
  });
});

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  Note.findByIdAndDelete(id)
    .then(result =>
      response.status(204).end()
    )
    .catch(error => next(error));

  response.status(204).end();
});

app.post('/api/notes', (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then(result => {
    response.json(result);
  });
});

const PORT = process.env.PORT;

app.listen(PORT);
console.log(`Server running on port ${PORT}`);

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: `unknown endpoint: ${request.originalUrl}` });
};

app.use(unknownEndpoint);
