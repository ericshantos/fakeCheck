import router from "./routes/index.js";
import express from "express";

const app = express();

/**
 * Main Express application instance.
 * 
 * This module sets up the Express application, configures middleware, and mounts
 * the routes for the application. It serves as the main entry point for the server.
 * 
 * @module app
 */

/**
 * Middleware to parse incoming JSON requests.
 * 
 * @function
 * @memberof module:app
 */
app.use(express.json());

/**
 * Mounts the router on the root path ("/").
 * 
 * This handles all incoming requests by passing them to the configured routes 
 * in the `index.js` router.
 * 
 * @function
 * @memberof module:app
 */
app.use("/", router);

/**
 * Exports the configured Express application for use in other parts of the project.
 * 
 * @exports
 * @type {express.Application}
 */
export default app;
