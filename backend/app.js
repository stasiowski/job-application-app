const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const applicationRouter = require("./controllers/applications");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

// Central Express application setup for the backend API.
// It connects to MongoDB, parses JSON payloads, and mounts all route modules.
const app = express();

logger.info("connecting to", config.uri);

mongoose
  .connect(config.uri, { family: 4 })
  .then(() => logger.info("connected to mongoDB"))
  .catch((error) => logger.error(error));

// Allow controllers to read JSON request bodies from incoming requests.
app.use(express.json());

// Register each route group used by the frontend application.
app.use("/api/applications", applicationRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

module.exports = app;
