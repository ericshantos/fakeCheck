const express = require("express");
const debugLogger = require("./debugLogger.middleware");
const { createLimiter } = require("./rateLimits.middleware");

/**
 * Loads and configures essential middleware for the Express application.
 * @module middlewares
 * @namespace
 */

/**
 * Initializes and mounts core middleware onto the Express application.
 * @function loadMiddlewares
 * @param {express.Application} app - The Express application instance
 * @returns {void}
 * 
 * @description
 * Configures the following middleware pipeline:
 * 1. `express.json()` - Parses incoming JSON requests
 * 2. `debugLogger` - Custom request logging middleware
 * 3. Rate limiter - Applies API request throttling
 * 
 * The middleware are mounted in the order shown above, which is important
 * for proper request processing.
 * 
 * @example
 * // Basic usage
 * const express = require('express');
 * const { loadMiddlewares } = require('./middlewares');
 * 
 * const app = express();
 * loadMiddlewares(app);
 * 
 * // Additional route setup...
 * app.listen(3000);
 */
const loadMiddlewares = (app) => {
    // Parse JSON bodies (application/json content-type)
    app.use(express.json());
    
    // Attach debug logger for all requests
    app.use(debugLogger);
    
    // Apply rate limiting to all routes
    app.use(createLimiter());
};

module.exports = { 
    ...require("./rateLimits.middleware"),
    loadMiddlewares
};