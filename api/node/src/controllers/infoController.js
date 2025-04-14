import infoService from '../services/infoService.js';

/**
 * Controller to handle requests for version information.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
const infoController = async (req, res) => {
  try {
    const { modelVersion, apiVersion } = await infoService();

    return res.status(200).json({
      model_version: modelVersion,
      api_version: apiVersion
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export default infoController;
