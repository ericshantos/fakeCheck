const { JsonReader, Logger } = require("@utils");
const { InfoService } = require("./info.service");

module.exports = new InfoService({
    reader: new JsonReader(),
    logger: new Logger()
});
