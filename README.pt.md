[🇬🇧] [Read in English](README.md)

# FakeCheck API

![Licença](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-20-green.svg)
![Python](https://img.shields.io/badge/Python-3.10-blue.svg)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.19-orange.svg)
![Docker & Docker Compose](https://img.shields.io/badge/Docker_&_Compose-enabled-2496ED?logo=docker&logoColor=white)

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
    - [Diferenciais](#diferenciais)
  - [Documentação da API](#documentação-da-api)
    - [Endpoints](#endpoints)
  - [Instalação](#instalação)
    - [Pré-requisitos](#pré-requisitos)
    - [Configuração](#configuração)
  - [Uso](#uso)
    - [Desenvolvimento](#desenvolvimento)
  - [Contribuindo](#contribuindo)
  - [Licença](#licença)
  - [Agradecimentos](#agradecimentos)

## Problema

As fake news se tornaram um grande problema social, espalhando desinformação rapidamente por canais digitais. A falta de ferramentas confiáveis para verificar automaticamente a veracidade das notícias em português agrava ainda mais esse cenário, especialmente no ecossistema midiático brasileiro.

## Solução

O FakeCheck fornece uma API que:
1. Extrai o texto de uma notícia via URL  
2. Processa o conteúdo com técnicas de PLN  
3. Classifica a notícia como "real" ou "falsa" utilizando um modelo LSTM treinado  
4. Retorna uma pontuação de confiança junto com a previsão  

O modelo atinge 95% de acurácia em conjuntos de dados de notícias em português.

## Funcionalidades

- **Verificação de Notícias**: Endpoint POST para verificar a veracidade de uma notícia  
- **Status do Sistema**: Endpoint GET para monitoramento do serviço  
- **Informações do Modelo**: Endpoint GET para detalhes sobre versão e arquitetura  
- **Metadados do Projeto**: Endpoint GET com créditos e stack tecnológico  
- **Containerizado**: Pronto para deploy com Docker Compose  
- **Escalável**: Arquitetura de microsserviços com serviços separados em Node.js e Python

## Arquitetura Técnica

```
├── API Gateway (Node.js/Express)
│   ├── Rotas
│   ├── Controladores
│   ├── Serviços
│   └── Utilitários
│
└── Previsor NLP (Python)
    ├── Modelo LSTM (TensorFlow/Keras)
    ├── Pré-processamento de Texto
    └── Servidor Socket
```

## Detalhes do Modelo

O modelo de aprendizado de máquina que alimenta esta API foi desenvolvido e treinado por mim (Eric Santos) como parte do projeto [BR Fake News Detector](https://github.com/ericshantos/br_fake_news_detector).

### Arquitetura
```
Camada de Entrada → Camada de Embedding (300D) → LSTM Bidirecional (128 unidades) → 
Camada Densa (64 unidades, ReLU) → Camada de Saída (1 unidade, Sigmoid)
```

### Dados de Treinamento
- Fonte: [Fake.Br Corpus](https://github.com/roneysco/Fake.br-Corpus)  
- Amostras: 7.200 notícias (50% reais, 50% falsas)  
- Divisão treino/teste: 80/20  

### Métricas de Desempenho
| Métrica    | Valor |
|------------|-------|
| Acurácia   | 95%   |
| Precisão   | 96%   |
| Recall     | 94%   |
| F1-Score   | 95%   |
| ROC AUC    | 96%   |

### Diferenciais
- Tokenizador personalizado otimizado para o português brasileiro  
- Tratamento especial para vocabulário jornalístico  
- Limiar adaptativo (padrão: 0.7 de confiança)

## Documentação da API

A documentação interativa da API é gerada automaticamente com Swagger UI e está disponível no endpoint `/docs` quando o serviço está em execução. A documentação inclui:

- Descrições detalhadas dos endpoints  
- Exemplos de requisições e respostas  
- Especificações de parâmetros  
- Códigos de erro  

### Endpoints

| Método | Endpoint   | Descrição                       | Parâmetros                     |
|--------|------------|----------------------------------|--------------------------------|
| POST   | /check     | Verifica veracidade da notícia  | `{ "url": "string" }`         |
| GET    | /info      | Obtém metadados do modelo       | -                              |
| GET    | /health    | Diagnóstico do sistema          | -                              |
| GET    | /credits   | Informações do projeto          | -                              |

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

## Uso

### Desenvolvimento
Para rodar em modo de desenvolvimento com recarregamento automático:

```bash
# No diretório do gateway
npm install
npm start

# Em outro terminal para o serviço Python
cd api/nlp_predictor
pip install -r requirements.txt
python main.py
```

## Contribuindo

Contribuições são bem-vindas! Siga os passos abaixo:
1. Faça um fork do repositório  
2. Crie uma branch de funcionalidade (`git checkout -b feature/sua-funcionalidade`)  
3. Faça seus commits (`git commit -am 'Adiciona nova funcionalidade'`)  
4. Suba sua branch (`git push origin feature/sua-funcionalidade`)  
5. Abra um Pull Request  

## Licença

Este projeto está licenciado sob a Licença MIT – veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Agradecimentos
- [Fake.Br Corpus](https://github.com/roneysco/Fake.br-Corpus) pelos dados de treinamento  
- [BR Fake News Detector](https://github.com/ericshantos/br_fake_news_detector) – O modelo LSTM desenvolvido por mim (Eric Santos) especificamente para este projeto  
- Programadores do Futuro pelo suporte educacional  
- TensorFlow/Keras pelo framework de deep learning
