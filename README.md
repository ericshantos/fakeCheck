[🇧🇷] [Lê em português](README.pt.md)

# FakeCheck API v4.1.1

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-20-green.svg)
![Python](https://img.shields.io/badge/Python-3.10-blue.svg)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.19-orange.svg)
![Docker & Docker Compose](https://img.shields.io/badge/Docker_&_Compose-enabled-2496ED?logo=docker&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-Cached-red.svg)
![NestJS](https://img.shields.io/badge/NestJS-11.0-purple.svg)

A high-performance API for detecting fake news in Portuguese using deep learning, built with NestJS and Python microservices.

## Table of Contents
- [FakeCheck API v4.1.1](#fakecheck-api-v411)
  - [Table of Contents](#table-of-contents)
  - [Problem Statement](#problem-statement)
  - [Solution](#solution)
  - [Features](#features)
    - [Core Functionality](#core-functionality)
    - [Technical Features](#technical-features)
  - [Technical Architecture](#technical-architecture)
  - [Model Details](#model-details)
    - [Architecture](#architecture)
    - [Performance](#performance)
    - [Key Features](#key-features)
  - [API Documentation](#api-documentation)
    - [Endpoints](#endpoints)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

## Problem Statement

Fake news has become a significant social problem, spreading misinformation rapidly through digital channels. The lack of reliable tools to automatically verify news authenticity in Portuguese exacerbates this issue, particularly in Brazilian media ecosystems.

## Solution

FakeCheck provides an API that:
1. Extracts text from news articles via URL using advanced scraping
2. Processes content with optimized NLP pipelines
3. Classifies articles using our custom LSTM model (95% accuracy)
4. Returns veracity with confidence scoring
5. Implements Redis caching with 1-hour TTL
6. Provides real-time system health monitoring

## Features

### Core Functionality
- **News Verification**: POST endpoint with Redis caching
- **System Health**: Comprehensive monitoring with rate limiting
- **Model Metadata**: Version and architecture details
- **Project Information**: Technology stack and credits

### Technical Features
- **Microservices Architecture**: Node.js + Python services
- **Containerized**: Docker Compose ready (Node, Python, Redis)
- **Rate Limiting**: Protection against abuse
- **Detailed Logging**: Request/error tracking
- **Swagger Docs**: Interactive API documentation
- **Validation**: Input sanitization and validation
- **Type Safety**: TypeScript interfaces throughout

## Technical Architecture

```
├── API Gateway (NestJS)
│   ├── Modules
│   │   ├── Check - News verification
│   │   ├── Health - System monitoring  
│   │   ├── Info - Model metadata
│   │   └── Shared - Common utilities
│   ├── Controllers
│   ├── Services
│   ├── Middlewares
│   └── Pipes/Interceptors
│
├── Predictor Service (Python)
│   ├── LSTM Model (TensorFlow/Keras)
│   ├── Text Preprocessing (spaCy)
│   └── Socket Server (Threaded)
│
└── Redis Cache
    └── Cached predictions
```

## Model Details

### Architecture

Input Layer → Embedding Layer (300D) → Bidirectional LSTM (128 units) → 
Dense Layer (64 units, ReLU) → Output Layer (1 unit, Sigmoid)


### Performance
| Metric       | Value |
|--------------|-------|
| Accuracy     | 95%   |
| Precision    | 96%   |
| Recall       | 94%   |
| F1-Score     | 95%   |
| ROC AUC      | 96%   |

### Key Features
- Optimized for Brazilian Portuguese
- Journalistic vocabulary handling
- Confidence thresholding (0.7 default)
- Hugging Face Hub integration
- Efficient text preprocessing

## API Documentation

Interactive documentation available at `/docs` when running locally.

### Endpoints
| Method | Endpoint | Description | Parameters | Rate Limit |
|--------|----------|-------------|------------|------------|
| POST   | /check   | Verify news | `{ "url": "string" }` | 50/15min |
| GET    | /info    | Model info  | - | 100/15min |
| GET    | /health  | System health | - | 10/1min |

**Example Request:**
```bash
curl -X POST http://localhost:3000/check \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com/news-article"}'
```

**Example Response:**
```json
{
  "veracity": "real",
  "confidence": 0.92,
  "threshold": 0.7,
  "extracted_at": "2025-04-18T12:34:56.789Z"
}
```

## Installation

### Prerequisites
- Docker 20.10+
- Docker Compose 2.0+

### Setup
```bash
git clone https://github.com/ericshantos/fakeCheck.git
cd fakeCheck
docker-compose up --build
```
Access API at `http://localhost:3000`

## Contributing
1. Fork the repository
2. Create feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -am 'Add feature'`)
4. Push branch (`git push origin feature/your-feature`)
5. Open Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgments
- [Fake.Br Corpus](https://github.com/roneysco/Fake.br-Corpus) for training data
- Programadores do Futuro for support
- TensorFlow/Keras team
- Redis for caching
- NestJS framework