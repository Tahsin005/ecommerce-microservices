FROM node:20-alpine

RUN apk add --no-cache curl

WORKDIR /app

COPY package.json package-lock.json ./

COPY services ./services
COPY packages ./packages

RUN npm ci

WORKDIR /app/services/cart-service

EXPOSE 3003

CMD ["node", "src/server.js"]