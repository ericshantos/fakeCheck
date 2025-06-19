const express = require("express");
const { checkNewsController } = require("@controllers");
const { checkLimiter } = require("@middlewares");

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
router.post("/", checkLimiter, checkNewsController);

module.exports = router;
