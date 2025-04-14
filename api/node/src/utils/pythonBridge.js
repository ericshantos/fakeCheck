import { spawn } from 'child_process';
import PathHelper from './pathManager.js';

/**
 * Processes a given text string using a Python script.
 *
 * The text is sent to the Python process via stdin in JSON format,
 * and the result is expected to be returned as a JSON string with a `result` key.
 *
 * @param {string} text - The input text to be processed.
 * @returns {Promise<string>} - A promise that resolves with the processed result,
 * or rejects with an error if the process fails or returns invalid output.
 */
export default function textProcessor(text) {
    if (typeof text !== 'string') {
        return Promise.reject(new Error('The "text" parameter must be a string'));
    }

    return new Promise((resolve, reject) => {
        const scriptPath = PathHelper.pathFromRoot("text_processor/main.py");
        const pythonProcess = spawn('python3', [scriptPath]);

        let stdout = '';
        let stderr = '';

        pythonProcess.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            stderr += data.toString();
        });        

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                return reject(new Error(`Python process exited with code ${code}\n${stderr.trim()}`));
            }
        
            if (!stdout) {
                return reject(new Error('No output received from Python process'));
            }
        
            try {
                const { result } = JSON.parse(stdout);
                resolve(result);
            } catch (e) {
                reject(new Error(`Failed to parse JSON output: ${e.message}`));
            }
        });        

        pythonProcess.stdin.write(JSON.stringify({ text }));
        pythonProcess.stdin.end();
    });
}
