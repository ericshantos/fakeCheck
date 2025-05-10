const { logging } = require("@config");

/**
 * Logs a message to the console if the message level is >= config.logging.
 *
 * @param {string} message - The message to log.
 * @param {string} level - The severity level ('verbose', 'info', 'warn', 'error').
 */
const log = (message, level = 'info') => {
    const levels = ['verbose', 'info', 'warn', 'error'];

    const currentLevel = levels.indexOf(logging);
    const messageLevel = levels.indexOf(level);

    if (currentLevel === -1 || messageLevel === -1) {
        console.warn(`[WARN] Unknown logging level used: ${logging} or ${level}`);
        return;
    }

    if (messageLevel >= currentLevel) {
        console.log(`[${level.toUpperCase()}] ${message}`);
    }
};

module.exports = { log };