const checkInternetConnection = require("./InternetInspector.service");
const checkScraper = require("./scraperInspector.service");
const checkSystemResources = require("./scraperInspector.service");
const checkModel = require("./checkModel.service");


module.exports = {
    checkInternetConnection,
    checkScraper,
    checkSystemResources,
    checkModel
};