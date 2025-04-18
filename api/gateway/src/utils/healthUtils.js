import axios from "axios";
import os from "os";
import PredictionRequester from "./pythonBridge.js";
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
export const checkSystemResources = () => {
    const freeMemory = os.freemem() / 1024 / 1024; // In MB
    const loadAvg = os.loadavg()[0];
  
    let status = 'success';
    let message = 'System resources OK';
  
    if (freeMemory < 500) {
      status = 'error';
      message = `Low memory: ${freeMemory.toFixed(2)} MB free`;
    } else if (loadAvg > os.cpus().length * 0.7) { 
      status = 'warning';
      message = `High CPU load: ${loadAvg.toFixed(2)}`;
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
export const checkModel = async ({
    predictor = new PredictionRequester(),
    text = "noticia falso espalhar rapidamente rede social poder causar desinformacao larga escala"
} = {}) => {
    try {
        const result = await predictor.predict(text);

        if (!result) {
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
        return {
            status: 'error',
            message: `Error checking model: ${error.message}`
        };
    }
};
