const creditsController = require("@controllers/credits.controller");
const express = require("express");

// Create an Express router instance.
const router = express.Router();

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
router.get("/", creditsController);

module.exports = router;