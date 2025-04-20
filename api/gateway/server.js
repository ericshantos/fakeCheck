import appConfig from "./src/config/app.config.js";
import app from './src/app.js';

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
app.listen(appConfig.port, () => 
  console.log(`${appConfig.appName} works at port ${appConfig.port} [${appConfig.env}]`)
);
