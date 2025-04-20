import infoService from '../services/info.service.js';

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

    return res.status(200).json(info);
  } catch (error) {
    console.error('Error fetching info:', error);

    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};

export default infoController;
