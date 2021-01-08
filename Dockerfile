#Primeira camada: build do diretório /app/dist
FROM node:14-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install && npm install -g tsc

COPY . .

RUN tsc

#Segunda camada: instalação apenas dos pacotes usados produção e remoção do cache
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only-production $$ npm cache clean --force

COPY --from=builder /app/dist ./dist

CMD ["npm", "start"]