const readJson = require("./jsonReader");
const { log } = require("./logger");
const { NewsFetcher } = require("./newFetcher");
const { PathHelper } = require("./pathManager");
const { PredictionRequester } = require("./pythonBridge");
const { TextExtractor } = require("./textExtractor");
const healhUtils = require("./healthUtils");

module.exports = {
    ...healhUtils,
    TextExtractor,
    PredictionRequester,
    PathHelper,
    NewsFetcher,
    log,
    readJson
};