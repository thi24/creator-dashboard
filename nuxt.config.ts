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
        baseURL: process.env.NUXT_PUBLIC_EVENT_SERVICE_BASE_URL
      },
      ticketService: {
        baseURL: process.env.NUXT_PUBLIC_TICKET_SERVICE_BASE_URL
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