import app from './src/app.js';

const PORT = process.env.PORT || 3000;

/**
 * Starts the main HTTP server for the FakeCheck application.
 * 
 * This module should be the main entry point of the application. When executed,
 * it launches the server and logs the active port to the console.
 */
app.listen(PORT, () => 
  console.log(`The server works at port ${PORT}`)
);
