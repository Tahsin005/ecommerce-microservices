FROM node:20-alpine

RUN apk add --no-cache curl

WORKDIR /app

COPY package.json package-lock.json ./

COPY services ./services
COPY packages ./packages

RUN npm ci

WORKDIR /app/services/user-service

EXPOSE 3001
EXPOSE 50051

CMD ["node", "src/server.js"]