import rateLimit from "express-rate-limit";
import { RATE_LIMITS } from "../config/rateLimits.config.js";

/**
 * Creates a rate limiting middleware based on the provided options.
 * 
 * This function merges the default rate limiting configuration with any
 * custom options passed in, returning a middleware function to be used in Express routes.
 *
 * @function
 * @param {import("express-rate-limit").Options} options - Custom rate limit options to override defaults.
 * @returns {import("express").RequestHandler} The configured rate limiting middleware.
 */
export const createLimiter = (options) => {
    return rateLimit({
        ...RATE_LIMITS.DEFAULT,
        ...options
    });
};

/**
 * Rate limiter for the /check endpoint.
 * 
 * Applies custom rate limiting rules specific to the fake news verification route.
 * 
 * @constant
 * @type {import("express").RequestHandler}
 * @memberof module:middlewares/rateLimits
 */
export const checkLimiter = createLimiter(RATE_LIMITS.CHECK_ENDPOINT);

/**
 * Rate limiter for the /health endpoint.
 * 
 * Applies custom rate limiting rules to prevent abuse of the health monitoring route.
 * 
 * @constant
 * @type {import("express").RequestHandler}
 * @memberof module:middlewares/rateLimits
 */
export const healthLimiter = createLimiter(RATE_LIMITS.HEALTH_ENDPOINT);
