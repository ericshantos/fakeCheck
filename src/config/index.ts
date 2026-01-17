import { createSwaggerConfig } from "./swagger.config";
import metadata from "./app.config";

export default () => ({
    swagger: createSwaggerConfig,
    app: metadata(),
});