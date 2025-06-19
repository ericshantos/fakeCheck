const { JsonReader } = require("./jsonReader");
const { Logger } = require("./logger");
const { NewsFetcher } = require("./newFetcher");
const { PathHelper } = require("./pathManager");
const { PredictionRequester } = require("./modelConnector");
const { TextExtractor } = require("./textExtractor");

module.exports = {
    TextExtractor,
    PredictionRequester,
    PathHelper,
    NewsFetcher,
    JsonReader,
    Logger
};