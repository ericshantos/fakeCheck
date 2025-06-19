FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production

FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
CMD ["npm", "start"]