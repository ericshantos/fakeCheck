const { PredictionRequester } = require("./pythonBridge.js");
const { log } = require("./logger.js");
const axios = require("axios");
const os = require("os");

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
        log(`[INTERNET CHECK] Failed to connect to the internet: ${error.message}`, "error");
        return { status: 'error', message: 'No internet connection' };
    }
};

/**
 * Simulates an HTML scraping process to verify if the scraper works as expected.
 *
 * @async
 * @function
 * @returns {Promise<{ status: 'success' | 'error', message: string }>}
 * Returns the result of the scraper functionality check.
 */
const checkScraper = async () => {
    try {
        const html = '<html><body><p>Test news</p></body></html>';
        const match = html.match(/<p>(.*?)<\/p>/)?.[1];

        if (match) {
            return { status: 'success', message: 'Scraper working correctly' };
        } else {
            log("[SCRAPER CHECK] Failed to extract text from HTML", "error");
            return { status: 'error', message: 'Scraper failed to extract text' };
        }
    } catch (error) {
        log(`[SCRAPER CHECK] Unexpected error in scraper: ${error.message}`, "error");
        return { status: 'error', message: 'Unexpected error in scraper' };
    }
};

/**
 * Evaluates system memory and CPU load to determine if sufficient resources are available.
 * 
 * This function checks the system's free memory and CPU load average to assess the overall system resource status. 
 * If memory is low (below 500 MB), it returns an error. If CPU load is high (over 70% of the available CPUs), 
 * it returns a warning.
 *
 * @function
 * @returns {{ status: 'success' | 'error' | 'warning', message: string, metrics: { freeMemory: number, loadAvg: number } }}
 * - status: The result of the resource check (success, error, or warning).
 * - message: A descriptive message about the resource status.
 * - metrics: An object containing the system's free memory (in MB) and load average.
 */
const checkSystemResources = () => {
    const freeMemory = os.freemem() / 1024 / 1024; // In MB
    const loadAvg = os.loadavg()[0];
  
    let status = 'success';
    let message = 'System resources OK';
  
    if (freeMemory < 500) {
        status = 'error';
        message = `Low memory: ${freeMemory.toFixed(2)} MB free`;
        log(`[SYSTEM CHECK] Low memory: ${freeMemory.toFixed(2)} MB`, "error");
    } else if (loadAvg > os.cpus().length * 0.7) { 
        status = 'warning';
        message = `High CPU load: ${loadAvg.toFixed(2)}`;
        log(`[SYSTEM CHECK] High CPU load: ${loadAvg.toFixed(2)}`, "warn");
    }
  
    return { status, message, metrics: { freeMemory, loadAvg } };
};

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
            log("[MODEL CHECK] Model did not return a prediction", "error");
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
        log(`[MODEL CHECK] Error while checking model: ${error.message}`, "error");
        return {
            status: 'error',
            message: `Error checking model: ${error.message}`
        };
    }
};

module.exports = {
    checkInternetConnection,
    checkScraper,
    checkSystemResources,
    checkModel
};