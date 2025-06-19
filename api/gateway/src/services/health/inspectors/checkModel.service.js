const { Logger } = require("@utils");
const { PredictionRequester } = require("@utils");

const logger = new Logger();

/**
 * Tests if the machine learning model is properly loaded and able to return predictions.
 *
 * @async
 * @function
 * @param {Object} [options]
 * @param {string} [options.text] - Text to be processed and classified by the model.
 * @returns {Promise<{ status: 'success' | 'error', message: string, data?: any }>}
 * Returns the result of the model functionality check, including prediction output if successful.
 */
const checkModel = async ({
    predictor = new PredictionRequester(),
    text = "noticia falso espalhar rapidamente rede social poder causar desinformacao larga escala"
} = {}) => {
    try {
        const result = await predictor.predict(text);

        if (!result) {
            logger.error("[MODEL CHECK] Model did not return a prediction");
            return {
                status: 'error',
                message: 'Model did not return a prediction'
            };
        }

        return {
            status: 'success',
            message: 'Model is operational and returning predictions',
        };
    } catch (error) {
        logger.error(`[MODEL CHECK] Error while checking model: ${error.message}`);
        return {
            status: 'error',
            message: `Error checking model: ${error.message}`
        };
    }
};

module.exports = checkModel;