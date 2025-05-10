require('module-alias/register');
const config = require("@config");
const app = require("@src/app");
/**
 * @fileoverview Entry point for the FakeCheck API server.
 *
 * Loads environment variables, initializes application configuration,
 * and starts the Express server on the configured port.
 *
 * @module server
 */

/**
 * Starts the main HTTP server for the FakeCheck application.
 *
 * The server listens on the port defined in the application configuration.
 * When successfully started, a message is logged to the console indicating
 * the port number and the environment mode (e.g., development or production).
 *
 * This file should be used as the primary entry point of the application.
 *
 * @function
 */
app.listen(config.port, () => 
  console.log(`${config.appName} works at port ${config.port} [${config.env}]`)
);
