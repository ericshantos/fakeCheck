const { Logger } = require("@utils");
const os = require("os");

const logger = new Logger();

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
        logger.error(`[SYSTEM CHECK] Low memory: ${freeMemory.toFixed(2)} MB`);
    } else if (loadAvg > os.cpus().length * 0.7) { 
        status = 'warning';
        message = `High CPU load: ${loadAvg.toFixed(2)}`;
        logger.warn(`[SYSTEM CHECK] High CPU load: ${loadAvg.toFixed(2)}`);
    }
  
    return { status, message, metrics: { freeMemory, loadAvg } };
};

module.exports = checkSystemResources;