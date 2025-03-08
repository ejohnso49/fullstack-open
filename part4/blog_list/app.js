const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const logger = require("./utils/logger");
const config = require("./utils/config");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

mongoose.set("strictQuery", false);

mongoose.connect(config.MONGODB_CONNECTION_STRING)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

module.exports = app;
