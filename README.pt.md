[🇬🇧] [Read in English](README.md)

# FakeCheck API v4.1.1

![Licença](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-20-green.svg)
![Python](https://img.shields.io/badge/Python-3.10-blue.svg)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.19-orange.svg)
![Docker & Docker Compose](https://img.shields.io/badge/Docker_&_Compose-enabled-2496ED?logo=docker&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-11.0-purple.svg)

API de alta performance para detecção de fake news em português usando deep learning, construída com microserviços NestJS e Python.

## Índice
- [FakeCheck API v4.1.1](#fakecheck-api-v411)
  - [Índice](#índice)
  - [Problema](#problema)
  - [Solução](#solução)
  - [Funcionalidades](#funcionalidades)
    - [Funcionalidades Principais](#funcionalidades-principais)
    - [Recursos Técnicos](#recursos-técnicos)
  - [Arquitetura Técnica](#arquitetura-técnica)
  - [Detalhes do Modelo](#detalhes-do-modelo)
    - [Arquitetura](#arquitetura)
    - [Desempenho](#desempenho)
    - [Características](#características)
  - [Documentação da API](#documentação-da-api)
    - [Endpoints](#endpoints)
  - [Instalação](#instalação)
    - [Pré-requisitos](#pré-requisitos)
    - [Configuração](#configuração)
  - [Contribuindo](#contribuindo)
  - [Licença](#licença)
  - [Agradecimentos](#agradecimentos)

## Problema

As fake news tornaram-se um problema social significativo, espalhando desinformação rapidamente através de canais digitais. A falta de ferramentas confiáveis para verificar automaticamente a autenticidade de notícias em português agrava esse problema, especialmente no ecossistema midiático brasileiro.

## Solução

O FakeCheck fornece uma API que:
1. Extrai texto de artigos de notícias via URL
2. Processa o conteúdo com pipelines NLP otimizados
3. Classifica artigos usando nosso modelo LSTM personalizado (95% de acurácia)
4. Retorna veracidade com score de confiança
5. Oferece monitoramento em tempo real da saúde do sistema

## Funcionalidades

### Funcionalidades Principais
- **Saúde do Sistema**: Monitoramento abrangente
- **Metadados do Modelo**: Detalhes da versão e arquitetura
- **Informações do Projeto**: Stack tecnológica e créditos

### Recursos Técnicos
- **Arquitetura de Microsserviços**: Node.js + Python
- **Containerizado**: Pronto para Docker Compose
- **Limitação de Taxa**: Proteção contra abuso
- **Logs Detalhados**: Rastreamento de erros
- **Documentação Swagger**: Interativa
- **Validação**: Sanitização de inputs
- **Tipagem Forte**: Interfaces TypeScript

## Arquitetura Técnica

```
├── API Gateway (NestJS)
│   ├── Módulos
│   │   ├── Check - Verificação de notícias  
│   │   ├── Health - Monitoramento
│   │   ├── Info - Metadados
│   │   └── Shared - Utilitários
│   ├── Controladores
│   ├── Serviços
│   ├── Middlewares
│   └── Pipes/Interceptores
│
└── Serviço de Predição (Python)
    ├── Modelo LSTM (TensorFlow/Keras)
    ├── Pré-processamento (spaCy)
    └── Servidor Socket (Threaded)
```

## Detalhes do Modelo

### Arquitetura
```
Camada de Entrada → Embedding (300D) → LSTM Bidirecional (128 unidades) → 
Camada Densa (64 unidades, ReLU) → Saída (1 unidade, Sigmoid)
```

### Desempenho
| Métrica      | Valor |
|--------------|-------|
| Acurácia     | 95%   |
| Precisão     | 96%   |
| Recall       | 94%   |
| F1-Score     | 95%   |
| ROC AUC      | 96%   |

### Características
- Otimizado para português brasileiro
- Vocabulário jornalístico
- Limiar de confiança (0.7 padrão)
- Integração com Hugging Face Hub
- Pré-processamento eficiente

## Documentação da API

Documentação interativa disponível em `/docs` quando executado localmente.

### Endpoints
| Método | Endpoint  | Descrição          | Parâmetros            | Limite        |
|--------|-----------|--------------------|------------------------|---------------|
| POST   | /check    | Verificar notícia  | `{ "url": "string" }` | 50/15min      |
| GET    | /info     | Informações        | -                      | 100/15min     |
| GET    | /health   | Saúde do sistema   | -                      | 10/1min       |

**Exemplo de Requisição:**
```bash
curl -X POST http://localhost:3000/check \
  -H "Content-Type: application/json" \
  -d '{"url":"https://exemplo.com/noticia"}'
```

**Exemplo de Resposta:**
```json
{
  "veracidade": "verdadeira",
  "confianca": 0.92,
  "limiar": 0.7,
  "extraido_em": "2025-04-18T12:34:56.789Z"
}
```

## Instalação

### Pré-requisitos
- Docker 20.10+
- Docker Compose 2.0+

### Configuração
```bash
git clone https://github.com/ericshantos/fakeCheck_API.git
cd fakeCheck_API
docker-compose up --build
```
Acesse a API em `http://localhost:3000`

## Contribuindo
1. Faça um fork do repositório
2. Crie um branch (`git checkout -b feature/sua-feature`)
3. Faça commit das mudanças (`git commit -am 'Adiciona feature'`)
4. Faça push do branch (`git push origin feature/sua-feature`)
5. Abra um Pull Request

## Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## Agradecimentos
- [Fake.Br Corpus](https://github.com/roneysco/Fake.br-Corpus) pelos dados de treinamento
- Programadores do Futuro pelo apoio
- Equipe TensorFlow/Keras
- Framework NestJS
```

Principais adaptações para português:
1. Tradução de todos os títulos e conteúdo
2. Adaptação de termos técnicos (ex: "rate limiting" → "limitação de taxa")
3. Exemplos com URLs em português
4. Manutenção da estrutura original com seções equivalentes
5. Conservação dos links e formatos técnicos
6. Tradução de métricas e conceitos de ML
7. Ajuste de nomes de endpoints para versão em português
8. Manutenção das badges de tecnologias (em inglês, como é padrão)