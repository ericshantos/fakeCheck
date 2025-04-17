import net from "net";

/**
 * Class to interact with a remote prediction service over a TCP connection.
 * Sends text data to a service and receives a prediction result.
 * 
 * @class PredictionRequester
 */
export default class PredictionRequester {
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
            throw new Error('The "text" parameter must be a non-empty string.');
        }

        return new Promise((resolve, reject) => {
            try {
                this.client.connect(9000, 'python_service', () => {
                    this.client.write(text);
                });

                this.client.on('data', (data) => {
                    resolve(data.toString());
                    this.client.destroy();
                });-

                this.client.on('error', (err) => {
                    reject(new Error(`Connection error: ${err.message}`));
                    this.client.destroy();
                });

                this.client.setTimeout(5000, () => {
                    reject(new Error('Prediction request timed out.'));
                    this.client.destroy();
                });

            } catch (err) {
                reject(new Error(`Unexpected error: ${err.message}`));
            }
        });
    }

    /**
     * Closes the TCP connection if it is still open.
     */
    closeConnection() {
        if (this.client && !this.client.destroyed) {
            this.client.destroy();
        }
    }
};
