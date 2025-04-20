import config from '../config/app.config.js';
import { log } from '../utils/logger.js';

/**
 * @fileoverview Express middleware for logging HTTP requests in debug mode.
 *
 * This middleware logs detailed information about incoming requests if the 
 * application is running in debug mode, as defined in the environment configuration.
 *
 * @module middlewares/debugLogger
 */

/**
 * Middleware to log request details in debug mode.
 *
 * Logs the request method, URL, and optionally headers and body if logging level is verbose.
 * This is helpful for development and debugging purposes. It does **not** interfere with the request lifecycle.
 *
 * @function
 * @param {import('express').Request} req - The HTTP request object.
 * @param {import('express').Response} res - The HTTP response object.
 * @param {import('express').NextFunction} next - The next middleware function in the stack.
 */
export const debugLogger = (req, res, next) => {
    try {
        if (config.debug) {
            const timestamp = new Date().toISOString();
            const { method, originalUrl, headers, body } = req;

            const logMessage = `[DEBUG] [${timestamp}] ${method} ${originalUrl}`;
            log(logMessage, config.logging);

            if (config.logging === 'verbose') {
                log(`[DEBUG] Headers: ${JSON.stringify(headers)}`, config.logging);
                log(`[DEBUG] Body: ${JSON.stringify(body)}`, config.logging);
            }
        }
    } catch (err) {
        // Prevents logging failures from crashing the app
        console.error('[Logger Error]', err);
    } finally {
        next();
    }
};
