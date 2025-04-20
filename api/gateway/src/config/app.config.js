/**
 * @fileoverview Environment-based application configuration loader.
 *
 * This module dynamically loads the appropriate configuration settings
 * based on the current NODE_ENV environment variable. It supports both
 * development and production environments.
 *
 * @module config/app
 */
import dotenv from 'dotenv';
dotenv.config();

import { devConfig } from "./app.dev.js";
import { prodConfig } from "./app.prod.js";

/**
 * The current environment of the application.
 * Defaults to 'development' if NODE_ENV is not set.
 *
 * @constant {string}
 */
const env = process.env.NODE_ENV || 'development';

/**
 * Available environment-specific configurations.
 *
 * @constant {Object}
 * @property {Object} development - Configuration for development environment.
 * @property {Object} production - Configuration for production environment.
 */
const config = {
  development: devConfig,
  production: prodConfig
};

/**
 * Exports the configuration based on the current environment.
 *
 * @exports
 * @type {Object}
 */
export default config[env];
