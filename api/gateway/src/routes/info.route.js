const express = require("express");
const infoController = require("@controllers/info.controller");

// Create an Express router instance.
const router = express.Router();

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
router.get("/", infoController);

module.exports = router;