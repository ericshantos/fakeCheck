// Connector providers
export const CONNECTOR_PORT = Symbol("CONNECTOR_PORT");
export const CONNECTOR_HOST = Symbol("CONNECTOR_HOST");
export const CONNECTOR_TIMEOUT = Symbol('CONNECTOR_TIMEOUT');

// Global service providers
export const PREDICTOR = Symbol("PREDICTOR");
export const EXTRACTOR = Symbol("EXTRACTOR");
export const HTTP_CLIENT = Symbol("HTTP_CLIENT");
export const READER = Symbol("READER");

// Extractor providers
export const SELECTORS = Symbol("SELECTORS");
export const VALIDATION = Symbol("VALIDATION");

// Reader providers
export const READ_FILE = Symbol("READ_FILE");