FROM node:18.14.2

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npx nuxi generate

WORKDIR /app/.output/public

CMD ["npx", "serve"]