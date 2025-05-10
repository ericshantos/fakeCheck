/**
 * @fileoverview Development environment configuration for the FakeCheck API.
 *
 * This module defines the configuration settings used when the application 
 * is running in development mode.
 *
 * @module environment/development
 */

/**
 * Development configuration object.
 *
 * @constant
 * @type {Object}
 * @property {string} appName - Name of the application (for identification/logging).
 * @property {string} env - Current environment ("development").
 * @property {number} port - Port on which the server will run.
 * @property {boolean} debug - Enables detailed debug mode.
 * @property {string} logging - Logging level ("verbose", "info", etc.).
 */
module.exports = {
    appName: "Fake Check [DEV]",
    env: "development",
    port: 3000,
    debug: true,
    logging: 'verbose'
};
