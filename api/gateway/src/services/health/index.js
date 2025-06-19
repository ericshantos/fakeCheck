const inspectors = require("./inspectors");
const { HealthService } = require("./health.service");
const { Logger } = require("@utils");

module.exports = new HealthService({
    logger: new Logger(),
    ...inspectors
});
