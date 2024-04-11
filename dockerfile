FROM node:18-alpine3.17 as build

RUN apk update && apk upgrade

WORKDIR /app

COPY package* ./

RUN  npm install

COPY . ./

RUN npx nuxt build

FROM node:18-alpine3.17
ARG GITHUB_CLIENT_ID
ARG GITHUB_CLIENT_SECRET
ARG KEYCLOAK_ISSUER
ARG AUTH_ORIGIN
ARG NEXTAUTH_SECRET
ARG BASE_URL
ENV GITHUB_CLIENT_ID $GITHUB_CLIENT_ID
ENV GITHUB_CLIENT_SECRET $GITHUB_CLIENT_SECRET
ENV KEYCLOAK_ISSUER $KEYCLOAK_ISSUER
ENV AUTH_ORIGIN $AUTH_ORIGIN
ENV NEXTAUTH_SECRET $NEXTAUTH_SECRET
ENV BASE_URL $BASE_URL

RUN apk update && apk upgrade && apk add dumb-init && adduser -D nuxtuser 

USER nuxtuser

WORKDIR /app

COPY --chown=nuxtuser:nuxtuser --from=build /app/.output ./

EXPOSE 8080

ENV HOST=0.0.0.0 PORT=8080 NODE_ENV=production

CMD ["dumb-init","node","/app/server/index.mjs"]