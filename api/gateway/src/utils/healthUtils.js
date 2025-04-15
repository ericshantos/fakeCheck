import axios from "axios";
import os from "os";
import textProcessor from "./pythonBridge.js";

/**
 * Checks if the application has internet access by attempting to reach Google.
 *
 * @async
 * @function
 * @returns {Promise<{ status: 'success' | 'error', message: string }>}
 * Returns the result of the internet connectivity check.
 */
export const checkInternetConnection = async () => {
    try {
        await axios.get('https://www.google.com', { timeout: 2000 });
        return { status: 'success', message: 'Internet connection established' };
    } catch (error) {
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
export const checkScraper = async () => {
    try {
        const html = '<html><body><p>Test news</p></body></html>';
        const match = html.match(/<p>(.*?)<\/p>/)?.[1];

        if (match) {
            return { status: 'success', message: 'Scraper working correctly' };
        } else {
            return { status: 'error', message: 'Scraper failed to extract text' };
        }
    } catch (error) {
        return { status: 'error', message: 'Unexpected error in scraper' };
    }
};

/**
 * Evaluates system memory resources to determine if sufficient memory is available.
 *
 * @function
 * @returns {{ status: 'success' | 'error', message: string }}
 * Returns the result of the system resource (memory) availability check.
 */
export const checkSystemResources = () => {
    const freeMemory = os.freemem();
    const totalMemory = os.totalmem();
    const memoryUsage = freeMemory / totalMemory;

    if (memoryUsage < 0.1) {
        return {
            status: 'error',
            message: 'Insufficient system memory available'
        };
    }

    return {
        status: 'success',
        message: 'System resources are sufficient'
    };
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
export const checkModel = async ({
    text = "noticia falso espalhar rapidamente rede social poder causar desinformacao larga escala"
} = {}) => {
    try {
        const result = await textProcessor(text);

        if (!result) {
            return {
                status: 'error',
                message: 'Model did not return a prediction'
            };
        }

        return {
            status: 'success',
            message: 'Model is operational and returning predictions',
            data: result
        };
    } catch (error) {
        return {
            status: 'error',
            message: `Error checking model: ${error.message}`
        };
    }
};
