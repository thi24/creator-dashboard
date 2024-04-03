FROM node:20.2

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

RUN npx nuxi generate

WORKDIR /app/.output/public

CMD ["npx", "serve"]