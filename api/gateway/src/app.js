import express from "express";
import router from "./routes/index.js";
import swaggerConfig from "./config/swagger.config.js";
import { createLimiter } from "./middlewares/rateLimits.middleware.js";
import { debugLogger } from "./middlewares/debugLogger.middleware.js";

const app = express();

/**
 * @fileoverview Initializes the FakeCheck API application.
 *
 * This module configures and exports the main Express application instance,
 * applying essential middleware such as request parsing, logging, rate limiting,
 * and Swagger documentation. It also mounts the primary API router.
 *
 * @module app
 */

/**
 * @description Initializes Swagger API documentation.
 * 
 * Applies Swagger UI to the `/docs` endpoint, enabling interactive documentation
 * for developers and users to explore the API.
 */
swaggerConfig(app);

/**
 * @description Registers the debug logger middleware.
 * 
 * If `config.debug` is enabled, this middleware logs details of incoming requests,
 * including method, path, headers, and payload, depending on the configured verbosity.
 */
app.use(debugLogger);

/**
 * @description Parses incoming JSON request bodies.
 * 
 * Express middleware that populates `req.body` with parsed JSON content.
 */
app.use(express.json());

/**
 * @description Applies global rate limiter.
 * 
 * Middleware for generic rate limiting. This applies basic request throttling to all endpoints,
 * and is usually overridden or complemented by endpoint-specific rate limiters.
 */
app.use(createLimiter());

/**
 * @description Mounts the main application router.
 * 
 * All routes defined in `routes/index.js` are attached to the root path ("/").
 */
app.use("/", router);

/**
 * @exports
 * @type {express.Application}
 * 
 * The configured Express application instance, ready to be started by the server.
 */
export default app;
