const checkRoute = require("./check.route");
const creditsRoute = require("./credits.route");
const healthRoute = require("./health.route");
const infoRoute = require("./info.route");

const loadRoutes = (app) => {
    app.use("/check", checkRoute);
    app.use("/credits", creditsRoute);
    app.use("/health", healthRoute);
    app.use("/info", infoRoute);
};

module.exports = { loadRoutes };