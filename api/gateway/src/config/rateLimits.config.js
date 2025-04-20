/**
 * Rate limit configurations for different endpoints.
 * 
 * Defines default and custom rate limiting settings for various routes 
 * in the application using `express-rate-limit`. Each setting specifies 
 * the time window, maximum number of requests allowed, and optional 
 * behavior such as skipping certain IPs.
 * 
 * @constant
 * @namespace RATE_LIMITS
 */

/**
 * @property {object} DEFAULT
 * @property {number} DEFAULT.windowMs - Time window in milliseconds (15 minutes).
 * @property {number} DEFAULT.max - Max number of requests per IP in the window.
 * @property {string} DEFAULT.message - Message sent when the rate limit is exceeded.
 * 
 * @property {object} CHECK_ENDPOINT
 * @property {number} CHECK_ENDPOINT.windowMs - Time window in milliseconds (15 minutes).
 * @property {number} CHECK_ENDPOINT.max - Max number of requests per IP.
 * @property {function} CHECK_ENDPOINT.skip - Skips rate limit for localhost IP (127.0.0.1).
 * 
 * @property {object} HEALTH_ENDPOINT
 * @property {number} HEALTH_ENDPOINT.windowMs - Time window in milliseconds (1 minute).
 * @property {number} HEALTH_ENDPOINT.max - Max number of requests per IP.
 */
export const RATE_LIMITS = {
    DEFAULT: {
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: "Too many requests. Come back later!"
    },
    CHECK_ENDPOINT: {
      windowMs: 15 * 60 * 1000,
      max: 50,
      skip: (req) => req.ip === "127.0.0.1" 
    },
    HEALTH_ENDPOINT: {
      windowMs: 60 * 1000,
      max: 10
    }
  };
  