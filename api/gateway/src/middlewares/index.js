const express = require("express");
const debugLogger = require("./debugLogger.middleware");
const { createLimiter } = require("./rateLimits.middleware");

const loadMiddlewares = (app) => {
    // Parse JSON bodies (application/json content-type)
    app.use(express.json());
    
    // Attach debug logger for all requests
    app.use(debugLogger);
    
    // Apply rate limiting to all routes
    app.use(createLimiter());
};

module.exports = { 
    ...require("./rateLimits.middleware"),
    loadMiddlewares
};