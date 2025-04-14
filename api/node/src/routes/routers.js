/**
 * @fileoverview Express Router for handling API routes related to checking news and version info.
 * This module defines routes for checking news and retrieving the current API version.
 * 
 * @module routes/infoRoutes
 */

import express from "express";
import infoControllers from "../controllers/infoController.js";
import checkController from "../controllers/checkController.js";

// Create an Express router instance.
const router = express.Router();

/**
 * Route to check the validity of news.
 * 
 * @name POST /check
 * @function
 * @memberof module:routes/infoRoutes
 * @param {express.Request} req - The request object containing the news URL to be checked.
 * @param {express.Response} res - The response object that sends back the result of the news check.
 */
router.post("/check", checkController);

/**
 * Route to get the current version of the API.
 * 
 * @name GET /version
 * @function
 * @memberof module:routes/infoRoutes
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object that returns the API version.
 */
router.get("/version", infoControllers);

/**
 * Export the router so it can be used in other parts of the application.
 * 
 * @exports
 * @type {express.Router}
 */
export default router;
