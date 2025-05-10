const express = require("express");
const { swaggerConfig } = require("@config");
const { loadMiddlewares } = require("@middlewares");
const { loadRoutes } = require("@routes");

/**
 * @fileoverview Main application configuration for FakeCheck API
 * @module app
 * @requires express
 * @requires @config/swaggerConfig
 * @requires @middleware
 * @requires @routes
 */

/**
 * Express application instance
 * @type {express.Application}
 */
const app = express();

/**
 * Configures and initializes the FakeCheck API application
 * 
 * @function initializeApplication
 * @description Sets up the complete application with:
 * - Swagger API documentation
 * - Essential middleware stack
 * - Route handlers
 * 
 * @param {express.Application} app - The Express application instance
 * @returns {express.Application} Fully configured Express application
 * 
 * @example
 * // Typical usage pattern:
 * const app = require('@src/app');
 * const PORT = process.env.PORT || 3000;
 * 
 * app.listen(PORT, () => {
 *   console.log(`FakeCheck API running on port ${PORT}`);
 * });
 */
const initializeApplication = (app) => {
    /**
     * @description Swagger API Documentation Configuration
     * @see {@link @config/swaggerConfig}
     * 
     * Sets up interactive API documentation available at:
     * - `/docs` - Swagger UI interface
     */
    swaggerConfig(app);

    /**
     * @description Loads essential middleware stack including:
     * - JSON request body parsing
     * - Debug logging
     * - Rate limiting
     * - Security headers
     * @see {@link @middleware}
     */
    loadMiddlewares(app);

    /**
     * @description Mounts all API route handlers including:
     * - `/check` - News verification endpoint
     * - `/credits` - User credit management
     * - `/health` - System health monitoring
     * - `/info` - Service metadata
     * @see {@link @routes}
     */
    loadRoutes(app);

    return app;
};

// Initialize and export the configured application
module.exports = initializeApplication(app);