import express from "express";
import router from "./routes/index.js";
import swaggerConfig from "./config/swagger.config.js";
import { createLimiter } from "./middlewares/rateLimits.middleware.js";

const app = express();

/**
 * Express application instance.
 * 
 * This module initializes and configures the Express application, 
 * applies global middleware, integrates API documentation via Swagger, 
 * and mounts route handlers. It serves as the main entry point for the server.
 * 
 * @module app
 */

/**
 * Integrates Swagger API documentation.
 * 
 * Applies Swagger configuration to the Express app, enabling
 * interactive documentation for all defined routes and endpoints.
 *
 * @function
 * @memberof module:app
 */
swaggerConfig(app);

/**
 * Parses incoming JSON requests.
 * 
 * Attaches middleware that parses JSON payloads in incoming requests
 * and makes them available in `req.body`.
 *
 * @function
 * @memberof module:app
 */
app.use(express.json());

/**
 * Applies rate limiting middleware.
 * 
 * This middleware helps protect the API from abuse by limiting 
 * the number of requests a client can make within a defined window.
 * 
 * @function
 * @memberof module:app
 */
app.use(createLimiter());

/**
 * Mounts the application routes.
 * 
 * All incoming HTTP requests to the root path ("/") are forwarded
 * to the main router, which handles the defined endpoints.
 *
 * @function
 * @memberof module:app
 */
app.use("/", router);

/**
 * Exports the configured Express application.
 * 
 * This export allows the app to be used in server initialization,
 * testing setups, or integration with other modules.
 * 
 * @exports
 * @type {express.Application}
 */
export default app;
