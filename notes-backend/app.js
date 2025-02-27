const config = require("./utils/config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const notesRouter = require("./controllers/notes");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

const app = express();

mongoose.set("strictQuery", false);

logger.info("Connecting to", config.MONGODB_CONNECTION_STRING);

mongoose.connect(config.MONGODB_CONNECTION_STRING)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch(error => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
