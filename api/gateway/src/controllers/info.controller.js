const infoService = require("@services/info.service");
const { log } = require("@utils"); 

/**
 * Controller to handle requests for version and model information.
 * This function responds with detailed version, update, and model information.
 * 
 * @async
 * @function
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with version and model details, or an error.
 */
const infoController = async (req, res) => {
  try {
    const info = await infoService();

    log("[SUCCESS] /info - Information returned successfully", "info");

    return res.status(200).json(info);
  } catch (error) {
    log(`/info - Error fetching information: ${error.message}`, "error");

    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};

module.exports = infoController;
