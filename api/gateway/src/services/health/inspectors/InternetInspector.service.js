const axios = require("axios");
const { Logger } = require("@utils");

const logger = new Logger();


/**
 * Checks if the application has internet access by attempting to reach Google.
 *
 * @async
 * @function
 * @returns {Promise<{ status: 'success' | 'error', message: string }>}
 * Returns the result of the internet connectivity check.
 */
const checkInternetConnection = async () => {
    try {
        await axios.get('https://www.google.com', { timeout: 2000 });
        return { status: 'success', message: 'Internet connection established' };
    } catch (error) {
        logger.error(`[INTERNET CHECK] Failed to connect to the internet: ${error.message}`);
        return { status: 'error', message: 'No internet connection' };
    }
};

module.exports = checkInternetConnection;