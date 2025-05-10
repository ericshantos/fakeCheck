const rateLimit = require("express-rate-limit");
const { RATE_LIMITS } = require("@config");
const { log } = require("@utils");

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
const createLimiter = (options) => {
    return rateLimit({
        ...RATE_LIMITS.DEFAULT,
        ...options,
        handler: (req, res) => {
            log(`[RATE LIMIT] Request blocked: IP ${req.ip} on route ${req.originalUrl}`, "warn");
            res.status(429).json({
                error: "Too many requests, please try again later."
            });
        }
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
const checkLimiter = createLimiter(RATE_LIMITS.CHECK_ENDPOINT);

/**
 * Rate limiter for the /health endpoint.
 * 
 * Applies custom rate limiting rules to prevent abuse of the health monitoring route.
 * 
 * @constant
 * @type {import("express").RequestHandler}
 * @memberof module:middlewares/rateLimits
 */
const healthLimiter = createLimiter(RATE_LIMITS.HEALTH_ENDPOINT);

module.exports = {
    createLimiter,
    checkLimiter,
    healthLimiter
}