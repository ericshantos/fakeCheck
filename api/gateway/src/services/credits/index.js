const { JsonReader, Logger } = require("@utils");
const { CreditsService } = require("./credits.service");

module.exports = new CreditsService({
    reader: new JsonReader(),
    logger: new Logger()
});
