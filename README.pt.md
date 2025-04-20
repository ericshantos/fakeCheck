[🇬🇧] [Read in English](README.md)

# FakeCheck API

![Licença](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-20-green.svg)
![Python](https://img.shields.io/badge/Python-3.10-blue.svg)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.19-orange.svg)
![Docker & Docker Compose](https://img.shields.io/badge/Docker_&_Compose-enabled-2496ED?logo=docker&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-Cached-red.svg)

Uma API RESTful para detecção de fake news em português utilizando deep learning, construída com Express.js e Python.

## Índice
- [FakeCheck API](#fakecheck-api)
  - [Índice](#índice)
  - [Problema](#problema)
  - [Solução](#solução)
  - [Funcionalidades](#funcionalidades)
  - [Arquitetura Técnica](#arquitetura-técnica)
  - [Detalhes do Modelo](#detalhes-do-modelo)
    - [Arquitetura](#arquitetura)
    - [Dados de Treinamento](#dados-de-treinamento)
    - [Métricas de Desempenho](#métricas-de-desempenho)
    - [Recursos Chave](#recursos-chave)
  - [Documentação da API](#documentação-da-api)
    - [Endpoints](#endpoints)
  - [Instalação](#instalação)
    - [Pré-requisitos](#pré-requisitos)
    - [Configuração](#configuração)
  - [Contribuindo](#contribuindo)
  - [Licença](#licença)
  - [Agradecimentos](#agradecimentos)

## Problema

Fake news se tornaram um problema social significativo, espalhando desinformação rapidamente por canais digitais. A falta de ferramentas confiáveis para verificar automaticamente a autenticidade de notícias em português agrava esse problema, especialmente no ecossistema midiático brasileiro.

## Solução

O FakeCheck oferece uma API que:
1. Extrai texto de artigos de notícias via URL  
2. Processa o conteúdo usando técnicas de PLN (Processamento de Linguagem Natural)  
3. Classifica o artigo como “real” ou “falso” usando um modelo LSTM personalizado  
4. Retorna uma pontuação de confiança junto com a previsão  
5. Implementa cache com Redis para melhor desempenho  
6. Fornece monitoramento abrangente da saúde do sistema  

O modelo atinge 95% de acurácia em conjuntos de dados de notícias em português.

## Funcionalidades

- **Verificação de Notícias**: Endpoint POST para verificar autenticidade de notícias com cache Redis (TTL de 1 hora)  
- **Saúde do Sistema**: Endpoint GET para monitoramento de serviço com controle de taxa  
- **Informações do Modelo**: Endpoint GET com detalhes da versão e arquitetura  
- **Metadados do Projeto**: Endpoint GET com créditos e tecnologias utilizadas  
- **Containerizado**: Pronto para implantação com Docker Compose (Node.js, Python, Redis)  
- **Escalável**: Arquitetura de microsserviços com serviços separados  
- **Rate Limiting**: Proteção contra abusos com limites configuráveis  
- **Log Completo**: Registro detalhado de requisições e rastreamento de erros  
- **Documentação Swagger**: Documentação interativa da API disponível em `/docs`

## Arquitetura Técnica

```
├── API Gateway (Node.js/Express)
│   ├── Rotas
│   ├── Controladores
│   ├── Serviços
│   ├── Middlewares (Rate limiting, Logs)
│   └── Utils (Extração de texto, ponte com Python)
│
├── Previsor NLP (Python)
│   ├── Modelo LSTM (TensorFlow/Keras)
│   ├── Pré-processamento de Texto (spaCy)
│   └── Servidor via socket
│
└── Cache Redis
    └── Previsões armazenadas (TTL de 1 hora)
```

## Detalhes do Modelo

O modelo principal de machine learning que alimenta esta API foi desenvolvido e treinado por mim (Eric Santos) como parte do projeto [BR Fake News Detector](https://github.com/ericshantos/br_fake_news_detector).

### Arquitetura
```
Camada de Entrada → Camada de Embedding (300D) → LSTM Bidirecional (128 unidades) → 
Camada Densa (64 unidades, ReLU) → Camada de Saída (1 unidade, Sigmoid)
```

### Dados de Treinamento
- Fonte: [Fake.Br Corpus](https://github.com/roneysco/Fake.br-Corpus)
- Amostras: 7.200 artigos de notícias (50% reais, 50% falsos)
- Divisão treino/teste: 80/20

### Métricas de Desempenho
| Métrica     | Valor |
|-------------|-------|
| Acurácia    | 95%   |
| Precisão    | 96%   |
| Recall      | 94%   |
| F1-Score    | 95%   |
| ROC AUC     | 96%   |

### Recursos Chave
- Tokenizador personalizado otimizado para português brasileiro  
- Tratamento especial para vocabulário jornalístico  
- Limiar adaptativo (padrão: 0.7 de confiança)  
- Cache com Redis para melhorar o desempenho  
- Verificações de saúde completas

## Documentação da API

A documentação interativa da API é gerada automaticamente usando Swagger UI e está disponível no endpoint `/docs` quando o serviço está em execução. A documentação inclui:

- Descrição detalhada dos endpoints  
- Exemplos de requisições e respostas  
- Especificações de parâmetros  
- Códigos de erro  
- Informações sobre limites de requisição  

### Endpoints

| Método | Endpoint  | Descrição                        | Parâmetros            | Limite         |
|--------|-----------|----------------------------------|------------------------|----------------|
| POST   | /check    | Verifica autenticidade da notícia | `{ "url": "string" }` | 50/15min       |
| GET    | /info     | Metadados do modelo              | -                      | 100/15min      |
| GET    | /health   | Diagnóstico do sistema           | -                      | 10/1min        |
| GET    | /credits  | Informações do projeto           | -                      | 100/15min      |

Exemplo de Requisição:
```bash
curl -X POST http://localhost:3000/check \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com/news-article"}'
```

Exemplo de Resposta:
```json
{
  "veracidade": "real",
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
1. Clone o repositório:
```bash
git clone https://github.com/ericshantos/fakeCheck.git
cd fakeCheck
```

2. Construa e inicie os serviços:
```bash
docker-compose up --build
```

A API estará disponível em `http://localhost:3000`

## Contribuindo

Contribuições são bem-vindas! Siga os passos abaixo:
1. Faça um fork do repositório  
2. Crie um branch de funcionalidade (`git checkout -b feature/sua-funcionalidade`)  
3. Faça o commit das suas alterações (`git commit -am 'Adicionar nova funcionalidade'`)  
4. Faça o push para o branch (`git push origin feature/sua-funcionalidade`)  
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Agradecimentos
- [Fake.Br Corpus](https://github.com/roneysco/Fake.br-Corpus) pelos dados de treinamento  
- [BR Fake News Detector](https://github.com/ericshantos/br_fake_news_detector) - Modelo LSTM desenvolvido por mim (Eric Santos) especialmente para este projeto  
- Programadores do Futuro pelo apoio educacional  
- TensorFlow/Keras pelo framework de deep learning  
- Redis pela implementação de cache