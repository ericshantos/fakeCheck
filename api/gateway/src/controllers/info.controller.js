const { info } = require("@services");
const { Logger } = require("@utils");

const logger = new Logger();

const infoController = async (req, res) => {
  try {
    const report = await info.run("package.json");

    logger.info("[SUCCESS] /info - Information returned successfully!");

    return res.status(200).json(report);
  } catch(error) {
    logger.error(`/info - Error fetching information: ${error.message}`);

    return res.status(500).json({
      error: "Internet server error",
      message: error.message
    });
  }
};

module.exports = { infoController };
