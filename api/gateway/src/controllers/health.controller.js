const { Logger } = require("@utils");
const { health } = require("@services");

const logger = new Logger();

const healthController = async (req, res) => {
    try {
        const report = await health.run();

        const httpStatus = report.status === 'healthy' ? 200 : 503;

        logger[report.status === "healthy" ? "info" : "warn"](
            `[RESULT] /health - Status: ${report.status}`
        );

        return res.status(httpStatus).json(report);
    } catch (error) {
        logger.error(`/health - Failed to execute check: ${error.message}`);

        return res.status(500).json({
            status: 'error',
            message: 'An unexpected error occurred in healthController.',
            details: error.message
        });
    }
};

module.exports = { healthController };
