const { log } = require("./logger.js");
const net = require("net");

/**
 * Class to interact with a remote prediction service over a TCP connection.
 * Sends text data to a service and receives a prediction result.
 * 
 * @class PredictionRequester
 */
class PredictionRequester {
    constructor () {
        // Creates a new TCP client socket for communication with the remote service
        this.client = new net.Socket();
    }

    /**
     * Sends the provided text to a remote prediction service and retrieves a prediction.
     * The text is sent via a TCP connection, and the service processes it to return a prediction.
     *
     * @param {string} text - The text to be predicted. Must be a non-empty string.
     * 
     * @returns {Promise<any>} A promise that resolves with the prediction result from the service.
     * 
     * @throws {Error} If the input is not a valid string or if there is a network error during communication.
     * 
     * @example
     * const requester = new PredictionRequester();
     * requester.predict("This is some news text.")
     *   .then(prediction => console.log("Prediction result:", prediction))
     *   .catch(error => console.error("Error:", error));
     */
    async predict(text) {
        if (typeof text !== 'string' || text.trim().length === 0) {
            log("The 'text' parameter must be a non-empty string.", "error");
            throw new Error('The "text" parameter must be a non-empty string.');
        }

        return new Promise((resolve, reject) => {
            try {
                log(`Connecting to the prediction service at python_service:9000 with message: ${text}`, "info");

                this.client.connect(9000, 'python_service', () => {
                    log(`Connected to the prediction service, sending text: ${text}`, "info");
                    this.client.write(text);
                });

                this.client.on('data', (data) => {
                    log("Received prediction from the service.", "info");
                    resolve(data.toString());
                    this.client.destroy();
                });

                this.client.on('error', (err) => {
                    log(`Error during connection: ${err.message}`, "error");
                    reject(new Error(`Connection error: ${err.message}`));
                    this.client.destroy();
                });

                this.client.setTimeout(5000, () => {
                    log("Prediction request timed out.", "warn");
                    reject(new Error('Prediction request timed out.'));
                    this.client.destroy();
                });

            } catch (err) {
                log(`Unexpected error: ${err.message}`, "error");
                reject(new Error(`Unexpected error: ${err.message}`));
            }
        });
    }

    /**
     * Closes the TCP connection if it is still open.
     */
    closeConnection() {
        if (this.client && !this.client.destroyed) {
            log("Closing the TCP connection.", "info");
            this.client.destroy();
        }
    }
};

module.exports = { PredictionRequester }
