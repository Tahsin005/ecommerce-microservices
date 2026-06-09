FROM node:22-alpine

RUN apk add --no-cache curl

WORKDIR /app

COPY package*.json ./
COPY services/product-service ./services/product-service
COPY packages ./packages

RUN npm install

WORKDIR /app/services/product-service

EXPOSE 3002
EXPOSE 50052

CMD ["node", "src/server.js"]