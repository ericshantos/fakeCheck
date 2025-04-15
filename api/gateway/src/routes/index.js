/**
 * @fileoverview Express Router for handling API routes related to checking news, 
 * retrieving version info, system health monitoring, and displaying project credits.
 * 
 * This module defines routes for:
 * - Verifying news authenticity
 * - Returning API version
 * - Performing system health checks
 * - Retrieving project metadata and credits
 * 
 * @module routes/index
 */

import express from "express";
import infoControllers from "../controllers/infoController.js";
import checkController from "../controllers/checkController.js";
import healthController from "../controllers/healthController.js";
import creditsController from "../controllers/creditsController.js";

// Create an Express router instance.
const router = express.Router();

/**
 * POST /check
 * 
 * Route to check the authenticity of a news article based on its URL.
 * 
 * @name POST /check
 * @function
 * @memberof module:routes/infoRoutes
 * @param {express.Request} req - The request object containing the news URL.
 * @param {express.Response} res - The response object returning the model's prediction.
 */
router.post("/check", checkController);

/**
 * GET /info
 * 
 * Route to retrieve the current info of the API.
 * 
 * @name GET /info
 * @function
 * @memberof module:routes/infoRoutes
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object returning the API version.
 */
router.get("/info", infoControllers);

/**
 * GET /health
 * 
 * Route to perform system health checks including:
 * - Internet connectivity
 * - Scraper functionality
 * - System memory resources
 * - Machine learning model availability
 * 
 * @name GET /health
 * @function
 * @memberof module:routes/infoRoutes
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object with health report and HTTP status.
 */
router.get("/health", healthController);

/**
 * GET /credits
 * 
 * Route to retrieve project metadata from the local package.json file.
 * This includes information such as project name, author, license, and technologies used.
 * 
 * @name GET /credits
 * @function
 * @memberof module:routes/infoRoutes
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object containing the project metadata.
 */
router.get("/credits", creditsController);

/**
 * Exports the configured router to be used in the main application.
 * 
 * @exports
 * @type {express.Router}
 */
export default router;
