FROM node:20-alpine

RUN apk add --no-cache curl

WORKDIR /app

COPY package.json package-lock.json ./

COPY services ./services
COPY packages ./packages

RUN npm ci

WORKDIR /app/services/payment-service

EXPOSE 3005

CMD ["node", "src/server.js"]