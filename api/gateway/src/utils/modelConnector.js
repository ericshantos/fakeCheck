const net = require("net");

class PredictionRequester {
    constructor({ client = () => new net.Socket, logger = console } = {}) {
        this.client = client();
        this.logger = logger;
    }

    async predict(text) {
        if (typeof text !== 'string' || text.trim().length === 0) {
            const message = "The 'text' parameter must be a non-empty string.";
            this.logger.error(message);
            throw new Error(message);
        }

        return new Promise((resolve, reject) => {
            const client = new net.Socket();
            let settled = false;

            const cleanUp = () => {
                if (!client.destroyed) client.destroy();
            };

            this.logger.info(`Connecting to prediction service at python_service:9000 with message: ${text}`);

            client.connect(9000, 'python_service', () => {
                this.logger.info(`Connected to prediction service, sending text`);
                client.write(JSON.stringify({ text: text }));
            });

            client.once('data', (data) => {
                if (!settled) {
                    settled = true;
                    this.logger.info("Received prediction from the service.");
                    resolve(data.toString());
                    cleanUp();
                }
            });

            client.once('error', (err) => {
                if (!settled) {
                    settled = true;
                    const message = `Connection error: ${err.message}`
                    this.logger.error(message);
                    reject(new Error(message));
                    cleanUp();
                }
            });

            client.setTimeout(10000, () => {
                if (!settled) {
                    settled = true;
                    const message = "Prediction request timed out."
                    this.logger.warn(message);
                    reject(new Error(message));
                    cleanUp();
                }
            });
        });
    }
}

module.exports = { PredictionRequester };
