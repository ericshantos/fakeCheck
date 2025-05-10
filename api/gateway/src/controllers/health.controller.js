const healthService = require("@services/health.service");
const { log } = require("@utils");

/**
 * Controller responsible for handling the /health route.
 * It gathers health check information and sends the appropriate response.
 *
 * @async
 * @function
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response containing health check status and details.
 */
const healthController = async (req, res) => {
    try {
        const report = await healthService();

        const httpStatus = report.status === 'healthy' ? 200 : 503;

        log(`[RESULT] /health - Status: ${report.status}`, report.status === 'healthy' ? "info" : "warn");

        res.status(httpStatus).json(report);
    } catch (error) {
        log(`/health - Failed to execute check: ${error.message}`, "error");

        res.status(500).json({
            status: 'error',
            message: 'An unexpected error occurred in healthController.',
            details: error.message
        });
    }
};

module.exports = healthController;
