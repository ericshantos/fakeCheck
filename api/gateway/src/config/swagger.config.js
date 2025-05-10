const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'FakeCheck API',
            version: '2.2.0',
            description: 'API for fake news detection and system information',
            contact: {
                name: 'API Support',
                email: 'ericshantos13@gmail.com'
            }
        },
        paths: {
            "/check": {
                post: {
                    summary: "Verifies the authenticity of a news article based on the provided URL",
                    description: "⚠️ Rate limit: 50 requests per 15 minutes per IP (except 127.0.0.1).",
                    "x-rateLimit-limit": 50,
                    "x-rateLimit-windowMs": 15 * 60 * 1000,
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        url: {
                                            type: "string",
                                            description: "The URL of the news article to be verified",
                                            example: "https://example.com/news"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: "Result of the news verification",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            veracity: {
                                                type: "string",
                                                description: "Whether the news is real or fake",
                                                enum: ["real", "fake"]
                                            },
                                            confidence: {
                                                type: "number",
                                                description: "The confidence level of the veracity (in percentage)",
                                                example: 0.85
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '400': { description: "Invalid URL" },
                        '429': { description: "Too many requests - rate limit exceeded" },
                        '500': { description: "Internal server error while processing the news" }
                    }
                }
            },
            "/info": {
                get: {
                    summary: "Retrieves the API information, such as version and model architecture",
                    responses: {
                        '200': {
                            description: "API and model information",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            api_version: { type: "string" },
                                            model_version: { type: "string" },
                                            last_update: { type: "string" },
                                            framework: { type: "string" },
                                            model_architecture: { type: "string" },
                                            license: { type: "string" }
                                        }
                                    }
                                }
                            }
                        },
                        '500': { description: "Error retrieving information" }
                    }
                }
            },
            "/health": {
                get: {
                    summary: "Performs a system health check, including connectivity, scraper, and model status",
                    description: "⚠️ Rate limit: 10 requests per minute per IP.",
                    "x-rateLimit-limit": 10,
                    "x-rateLimit-windowMs": 60 * 1000,
                    responses: {
                        '200': {
                            description: "Healthy system status",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            status: {
                                                type: "string",
                                                enum: ["healthy", "unhealthy"]
                                            },
                                            checks: {
                                                type: "object",
                                                properties: {
                                                    internet: {
                                                        type: "object",
                                                        properties: {
                                                            status: { type: "string" },
                                                            message: { type: "string" }
                                                        }
                                                    },
                                                    scraper: {
                                                        type: "object",
                                                        properties: {
                                                            status: { type: "string" },
                                                            message: { type: "string" }
                                                        }
                                                    },
                                                    systemResources: {
                                                        type: "object",
                                                        properties: {
                                                            status: { type: "string" },
                                                            message: { type: "string" }
                                                        }
                                                    },
                                                    model: {
                                                        type: "object",
                                                        properties: {
                                                            status: { type: "string" },
                                                            message: { type: "string" }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '429': { description: "Too many requests - rate limit exceeded" },
                        '503': { description: "Service unavailable" },
                        '500': { description: "Error performing the health check" }
                    }
                }
            },
            "/credits": {
                get: {
                    summary: "Retrieves project credits, including details like name, author, license, and technologies used",
                    responses: {
                        '200': {
                            description: "Project metadata",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            project: { type: "string" },
                                            description: { type: "string" },
                                            author: { type: "string" },
                                            contact: { type: "string" },
                                            license: { type: "string" },
                                            technologies: {
                                                type: "array",
                                                items: { type: "string" }
                                            },
                                            code_repository: { type: "string" }
                                        }
                                    }
                                }
                            }
                        },
                        '500': { description: "Error retrieving project credits" }
                    }
                }
            }
        }
    },
    apis: ["../routes/index.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
