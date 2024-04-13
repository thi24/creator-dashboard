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
        baseUrl: process.env.EVENT_SERVICE_BASE_URL
      },
      ticketService: {
        baseUrl: process.env.TICKET_SERVICE_BASE_URL
      },
      authOriginURL: process.env.AUTH_ORIGIN
    }
  },
  app: {
    head: {
      link: [
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" }
      ]
    }
  }
})