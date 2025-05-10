const checkRoute = require("./check.route");
const creditsRoute = require("./credits.route");
const healthRoute = require("./health.route");
const infoRoute = require("./info.route");

/**
 * Loads and mounts all API routes onto the Express application.
 * 
 * @function loadRoutes
 * @param {express.Application} app - The Express application instance
 * @returns {void}
 * 
 * @description
 * Registers the following API routes:
 * - `/check` - News verification endpoint
 * - `/credits` - User credit management
 * - `/health` - System health monitoring
 * - `/info` - Service information endpoint
 * 
 * Each route is mounted with its own sub-router containing specific middleware
 * and controller implementations.
 * 
 * @example
 * // In your main app file:
 * const express = require('express');
 * const { loadRoutes } = require('@routes');
 * 
 * const app = express();
 * loadRoutes(app);
 * 
 * app.listen(3000);
 */
const loadRoutes = (app) => {
    app.use("/check", checkRoute);
    app.use("/credits", creditsRoute);
    app.use("/health", healthRoute);
    app.use("/info", infoRoute);
};

module.exports = { loadRoutes };