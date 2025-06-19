FROM python:3.10-slim as builder
WORKDIR /app
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    g++ \
    libffi-dev \
    libssl-dev \
    python3-dev \
    net-tools \
    procps \
    netcat-openbsd \ 
    && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip install --user -r requirements.txt

FROM python:3.10-slim
WORKDIR /app
RUN apt-get update && apt-get install -y \
    net-tools \
    procps \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*
COPY --from=builder /root/.local /root/.local
COPY . .
RUN python -m spacy download pt_core_news_sm
ENV PATH=/root/.local/bin:$PATH
CMD ["python3", "main.py"]