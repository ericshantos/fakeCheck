const { credits } = require("@services");
const { Logger } = require("@utils");

const logger = new Logger();

const creditsController = async (req, res) => {
    try {
        const report = await credits.run('package.json');

        logger.info("[SUCCESS] /credits - Metadata returned successfully");

        return res.status(200).json(report);
    } catch (error) {
        logger.error(`/credits - Failed to retrieve credits: ${error.message}`);
        return res.status(500).json({ error: "Failed to retrieve project credits." });
    }
};

module.exports = { creditsController };
