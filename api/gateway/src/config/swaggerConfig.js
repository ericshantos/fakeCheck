import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'FakeCheck API',
            version: '1.2.0',
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
                        '400': {
                            description: "Invalid URL"
                        },
                        '500': {
                            description: "Internal server error while processing the news"
                        }
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
                                            api_version: {
                                                type: "string",
                                                description: "The version of the API"
                                            },
                                            model_version: {
                                                type: "string",
                                                description: "The version of the machine learning model"
                                            },
                                            last_update: {
                                                type: "string",
                                                description: "The date of the last model data update"
                                            },
                                            framework: {
                                                type: "string",
                                                description: "Machine learning framework used in the model (e.g., TensorFlow, PyTorch)"
                                            },
                                            model_architecture: {
                                                type: "string",
                                                description: "Architecture of the model (e.g., LSTM, BERT)"
                                            },
                                            license: {
                                                type: "string",
                                                description: "The model's license"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '500': {
                            description: "Error retrieving information"
                        }
                    }
                }
            },
            "/health": {
                get: {
                    summary: "Performs a system health check, including connectivity, scraper, and model status",
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
                                                description: "Overall system health status",
                                                enum: ["healthy", "unhealthy"]
                                            },
                                            checks: {
                                                type: "object",
                                                properties: {
                                                    internet: {
                                                        type: "object",
                                                        properties: {
                                                            status: {
                                                                type: "string",
                                                                description: "Internet connectivity status"
                                                            },
                                                            message: {
                                                                type: "string",
                                                                description: "Message related to connectivity"
                                                            }
                                                        }
                                                    },
                                                    scraper: {
                                                        type: "object",
                                                        properties: {
                                                            status: {
                                                                type: "string",
                                                                description: "Scraper status"
                                                            },
                                                            message: {
                                                                type: "string",
                                                                description: "Message related to the scraper"
                                                            }
                                                        }
                                                    },
                                                    systemResources: {
                                                        type: "object",
                                                        properties: {
                                                            status: {
                                                                type: "string",
                                                                description: "System resources status"
                                                            },
                                                            message: {
                                                                type: "string",
                                                                description: "Message about system resources"
                                                            }
                                                        }
                                                    },
                                                    model: {
                                                        type: "object",
                                                        properties: {
                                                            status: {
                                                                type: "string",
                                                                description: "Machine learning model status"
                                                            },
                                                            message: {
                                                                type: "string",
                                                                description: "Message about the model"
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '503': {
                            description: "Service unavailable"
                        },
                        '500': {
                            description: "Error performing the health check"
                        }
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
                                            project: {
                                                type: "string",
                                                description: "Project name"
                                            },
                                            description: {
                                                type: "string",
                                                description: "Project description"
                                            },
                                            author: {
                                                type: "string",
                                                description: "Project author"
                                            },
                                            contact: {
                                                type: "string",
                                                description: "Author's contact information"
                                            },
                                            license: {
                                                type: "string",
                                                description: "Project license"
                                            },
                                            technologies: {
                                                type: "array",
                                                items: {
                                                    type: "string"
                                                },
                                                description: "Technologies used in the project"
                                            },
                                            code_repository: {
                                                type: "string",
                                                description: "URL of the project's code repository"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '500': {
                            description: "Error retrieving project credits"
                        }
                    }
                }
            }
        }
    },
    apis: ["../routes/index.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default (app) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
