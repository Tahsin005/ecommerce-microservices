FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

COPY services ./services
COPY packages ./packages

RUN npm ci

WORKDIR /app/services/order-service

EXPOSE 3004

CMD ["node", "src/server.js"]