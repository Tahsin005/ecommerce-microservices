FROM node:22-alpine

RUN apk add --no-cache curl

WORKDIR /app

COPY package.json package-lock.json ./

COPY services ./services
COPY packages ./packages

RUN npm install

WORKDIR /app/services/order-service

EXPOSE 3004

CMD ["node", "src/server.js"]