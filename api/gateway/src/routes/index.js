import express from "express";
import infoControllers from "../controllers/infoController.js";
import checkController from "../controllers/checkController.js";
import healthController from "../controllers/healthController.js";
import creditsController from "../controllers/creditsController.js";
import { checkLimiter, healthLimiter } from "../middlewares/rateLimits.js";

// Create an Express router instance.
const router = express.Router();

/**
 * POST /check
 * 
 * Verifies the authenticity of a news article based on a given URL.
 * Applies rate limiting middleware before executing the prediction controller.
 * 
 * @name POST /check
 * @function
 * @memberof module:routes/index
 * @param {express.Request} req - The request object containing the news URL.
 * @param {express.Response} res - The response object returning the model's prediction.
 */
router.post("/check", checkLimiter, checkController);

/**
 * GET /info
 * 
 * Returns basic API metadata, such as current version and environment.
 * 
 * @name GET /info
 * @function
 * @memberof module:routes/index
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object returning the API info.
 */
router.get("/info", infoControllers);

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
router.get("/health", healthLimiter, healthController);

/**
 * GET /credits
 * 
 * Fetches project metadata from the local `package.json` file. 
 * This includes project name, author, license, description, and technologies used.
 * 
 * @name GET /credits
 * @function
 * @memberof module:routes/index
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object containing the project metadata.
 */
router.get("/credits", creditsController);

/**
 * Exports the configured router instance.
 * 
 * This router is used by the main application module to register route handlers.
 * 
 * @exports
 * @type {express.Router}
 */
export default router;
