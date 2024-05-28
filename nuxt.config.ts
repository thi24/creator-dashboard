// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '@/assets/style.css'
  ],
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    public: {
      eventService: {
        baseURL: process.env.EVENT_SERVICE_BASE_URL
      },
      ticketService: {
        baseURL: process.env.TICKET_SERVICE_BASE_URL
      },
      analyticsService: {
        baseURL: process.env.ANALYTICS_SERVICE_BASE_URL
      },
      authOriginURL: process.env.AUTH_ORIGIN
    },
    keycloakId: process.env.KEYCLOAK_ID,
    keycloakSecret: process.env.KEYCLOAK_SECRET,
    keycloakIssuer: process.env.KEYCLOAK_ISSUER,
    authUrl: process.env.AUTH_URL

  },
  app: {
    head: {
      link: [
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" }
      ]
    }
  }
})