FROM node:18-alpine3.17 as build

RUN apk update && apk upgrade

WORKDIR /app

COPY package* ./

RUN  npm install

COPY . ./

RUN npx nuxt build

FROM node:18-alpine3.17
ARG KEYCLOAK_ID
ARG KEYCLOAK_SECRET
ARG KEYCLOAK_ISSUER
ARG AUTH_ORIGIN
ARG NEXTAUTH_SECRET
ENV KEYCLOAK_ID $KEYCLOAK_ID
ENV KEYCLOAK_SECRET $KEYCLOAK_SECRET
ENV KEYCLOAK_ISSUER $KEYCLOAK_ISSUER
ENV AUTH_ORIGIN $AUTH_ORIGIN
ENV NEXTAUTH_SECRET $NEXTAUTH_SECRET

# Base Urls for Microservices
ARG EVENT_SERVICE_BASE_URL
ARG TICKET_SERVICE_BASE_URL
ENV EVENT_SERVICE_BASE_URL $EVENT_SERVICE_BASE_URL
ENV TICKET_SERVICE_BASE_URL $TICKET_SERVICE_BASE_URL

RUN apk update && apk upgrade && apk add dumb-init && adduser -D nuxtuser 

USER nuxtuser

WORKDIR /app

COPY --chown=nuxtuser:nuxtuser --from=build /app/.output ./

EXPOSE 8080

ENV HOST=0.0.0.0 PORT=8080 NODE_ENV=production

CMD ["dumb-init","node","/app/server/index.mjs"]