/**
 * @fileoverview Production environment configuration for the FakeCheck API.
 *
 * This module defines the configuration settings used when the application 
 * is running in production mode.
 *
 * @module config/app.prod
 */

/**
 * Production configuration object.
 *
 * @constant
 * @type {Object}
 * @property {string} appName - Name of the application.
 * @property {string} env - Current environment ("production").
 * @property {number|string} port - Port on which the server will run (can come from process.env.PORT).
 * @property {boolean} debug - Disables debug mode in production.
 * @property {string} logging - Logging level (typically set to "error" to reduce log noise).
 */
export const prodConfig = {
    appName: "FakeCheck API",
    env: 'production',
    port: process.env.PORT || 3000,
    debug: false,
    logging: 'error'
};
