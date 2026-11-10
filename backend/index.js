const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

// This is the server entry point: start the Express app and bind it to the configured port.
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
