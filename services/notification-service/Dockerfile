FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

COPY services ./services
COPY packages ./packages

RUN npm install

WORKDIR /app/services/notification-service

CMD ["node", "src/server.js"]