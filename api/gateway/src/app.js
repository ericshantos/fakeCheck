import express from "express";
import router from "./routes/index.js";
import swaggerConfig from "./config/swaggerConfig.js";  // Importação estática

const app = express();

/**
 * Express application instance.
 * 
 * This module sets up and configures the Express application, applying necessary
 * middleware and mounting the route handlers. It serves as the main entry point
 * for the application server.
 * 
 * @module app
 */

/**
 * Configures Swagger documentation for the API.
 * 
 * This integrates Swagger configuration into the Express app to enable interactive API documentation.
 * 
 * @function
 * @memberof module:app
 */
swaggerConfig(app);

/**
 * Middleware to parse incoming JSON requests.
 * 
 * This middleware automatically parses the incoming JSON request body 
 * and makes it available in `req.body` for subsequent route handlers.
 * 
 * @function
 * @memberof module:app
 */
app.use(express.json());

/**
 * Mounts the router on the root path ("/").
 * 
 * All incoming requests are passed through the router, which is configured 
 * in the `index.js` file located in the routes directory.
 * 
 * @function
 * @memberof module:app
 */
app.use("/", router);

/**
 * Exports the configured Express application.
 * 
 * This allows other modules or files to use this Express instance, 
 * typically to start the server or to be used in testing setups.
 * 
 * @exports
 * @type {express.Application}
 */
export default app;
