const mongoose = require("mongoose");
const config = require("./utils/config");
require("dotenv").config();

if (process.env.MONGODB_CONNECTION_STRING === undefined) {
  console.log("Missing connection string definition in .env");
  process.exit(1);
}

const url = config.MONGODB_CONNECTION_STRING;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "Arpan be training",
  important: false,
});

note.save().then(() => {
  console.log("note saved!");
  mongoose.connection.close();
});
