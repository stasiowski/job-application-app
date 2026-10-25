const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const applicationRouter = require("./controllers/applications");

const app = express();

logger.info("connecting to", config.uri);

mongoose
  .connect(config.uri, { family: 4 })
  .then(console.log("connected to mongoDB"))
  .catch((error) => logger.error(error));

app.use(express.json());

app.use("/api/applications", applicationRouter);

module.exports = app;
