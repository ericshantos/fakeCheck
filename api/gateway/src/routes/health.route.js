const healthController = require("@controllers/health.controller");
const { healthLimiter } = require("@middlewares");
const express = require("express");

// Create an Express router instance.
const router = express.Router();

/**
 * GET /health
 * 
 * Performs a system-wide health check, including:
 * - Internet connectivity
 * - Scraper availability
 * - Model loading and readiness
 * Applies rate limiting before running the health diagnostics.
 * 
 * @name GET /health
 * @function
 * @memberof module:routes/index
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object with a structured health report.
 */
router.get("/", healthLimiter, healthController);

module.exports = router;