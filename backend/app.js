const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");

const app = express();

logger.info("connecting to", config.uri);

module.exports = app;
