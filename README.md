[🇧🇷] [Lê em português](README.pt.md)

# FakeCheck API

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-20-green.svg)
![Python](https://img.shields.io/badge/Python-3.10-blue.svg)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.19-orange.svg)
![Docker & Docker Compose](https://img.shields.io/badge/Docker_&_Compose-enabled-2496ED?logo=docker&logoColor=white)

A RESTful API for detecting fake news in Portuguese using deep learning, built with Express.js and Python.

## Table of Contents
- [FakeCheck API](#fakecheck-api)
  - [Table of Contents](#table-of-contents)
  - [Problem Statement](#problem-statement)
  - [Solution](#solution)
  - [Features](#features)
  - [Technical Architecture](#technical-architecture)
  - [Model Details](#model-details)
    - [Architecture](#architecture)
    - [Training Data](#training-data)
    - [Performance Metrics](#performance-metrics)
    - [Key Features](#key-features)
  - [API Documentation](#api-documentation)
    - [Endpoints](#endpoints)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
  - [Usage](#usage)
    - [Development](#development)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

## Problem Statement

Fake news has become a significant social problem, spreading misinformation rapidly through digital channels. The lack of reliable tools to automatically verify news authenticity in Portuguese exacerbates this issue, particularly in Brazilian media ecosystems.

## Solution

FakeCheck provides an API that:
1. Extracts text from news articles via URL
2. Processes the content using NLP techniques
3. Classifies the article as "real" or "fake" using a custom-trained LSTM model
4. Returns a confidence score with the prediction

The model achieves 95% accuracy on Portuguese-language news datasets.

## Features

- **News Verification**: POST endpoint to check news authenticity
- **System Health**: GET endpoint for service monitoring
- **Model Information**: GET endpoint for version and architecture details
- **Project Metadata**: GET endpoint with credits and technology stack
- **Containerized**: Ready for deployment with Docker Compose
- **Scalable**: Microservice architecture with separate Node.js and Python services

## Technical Architecture

```
├── API Gateway (Node.js/Express)
│   ├── Routes
│   ├── Controllers
│   ├── Services
│   └── Utils
│
└── NLP Predictor (Python)
    ├── LSTM Model (TensorFlow/Keras)
    ├── Text Preprocessing
    └── Socket Server
```

## Model Details

The core machine learning model powering this API was personally developed and trained by me (Eric Santos) as part of the [BR Fake News Detector](https://github.com/ericshantos/br_fake_news_detector) project.

### Architecture
```
Input Layer → Embedding Layer (300D) → Bidirectional LSTM (128 units) → 
Dense Layer (64 units, ReLU) → Output Layer (1 unit, Sigmoid)
```

### Training Data
- Source: [Fake.Br Corpus](https://github.com/roneysco/Fake.br-Corpus)
- Samples: 7,200 news articles (50% real, 50% fake)
- Train/Test split: 80/20

### Performance Metrics
| Metric | Value |
|--------|-------|
| Accuracy | 95% |
| Precision | 96% |
| Recall | 94% |
| F1-Score | 95% |
| ROC AUC | 96% |

### Key Features
- Custom tokenizer optimized for Brazilian Portuguese
- Special handling for journalistic vocabulary
- Adaptive thresholding (default: 0.7 confidence)

## API Documentation

Interactive API documentation is automatically generated using Swagger UI and available at `/docs` endpoint when running the service. The documentation includes:

- Detailed endpoint descriptions
- Example requests/responses
- Parameter specifications
- Error codes

### Endpoints

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| POST   | /check   | Verify news authenticity | `{ "url": "string" }` |
| GET    | /info    | Get model metadata | - |
| GET    | /health  | System diagnostics | - |
| GET    | /credits | Project information | - |

Example Request:
```bash
curl -X POST http://localhost:3000/check \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com/news-article"}'
```

Example Response:
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
1. Clone the repository:
```bash
git clone https://github.com/ericshantos/fakeCheck.git
cd fakeCheck
```

2. Build and start the services:
```bash
docker-compose up --build
```

The API will be available at `http://localhost:3000`

## Usage

### Development
To run in development mode with live reload:

```bash
# In the gateway directory
npm install
npm start

# In a separate terminal for the Python service
cd api/nlp_predictor
pip install -r requirements.txt
python main.py
```

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [Fake.Br Corpus](https://github.com/roneysco/Fake.br-Corpus) for the training data
- [BR Fake News Detector](https://github.com/ericshantos/br_fake_news_detector) - The LSTM model developed by me (Eric Santos) specifically for this project
- Programadores do Futuro for the educational support
- TensorFlow/Keras for the deep learning framework
