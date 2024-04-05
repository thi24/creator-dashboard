// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '@/assets/style.css'
  ],
  modules: ['@sidebase/nuxt-auth', '@pinia/nuxt'],
  auth: {
    provider: {
      type: 'authjs'
    }
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
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