/**
 * @fileoverview Environment-based application configuration loader.
 *
 * This module dynamically loads the appropriate configuration settings
 * based on the current NODE_ENV environment variable. It supports both
 * development and production environments.
 *
 * @module config
 */
const { RATE_LIMITS } = require("./rateLimits.config");
const swaggerConfig = require("./swagger.config");
const dotenv = require("dotenv");
dotenv.config();

/**
 * The current environment of the application.
 * Defaults to 'development' if NODE_ENV is not set.
 *
 * @constant {string}
 */
const env = process.env.NODE_ENV || 'development';

const app = require(`./environment/${env}`)

/**
 * Exports the configuration based on the current environment.
 *
 * @exports
 * @type {Object}
 */
module.exports = {
    ...app,
    RATE_LIMITS,
    swaggerConfig
};
