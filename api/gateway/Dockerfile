FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN mkdir -p /app/metadatas

COPY . .

CMD ["npm", "start"]