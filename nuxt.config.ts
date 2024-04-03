// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '@/assets/style.css'
  ],
  modules: ['@sidebase/nuxt-auth'],
  auth: {
    provider: {
      type: 'authjs'
    }
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:3000',
    }
  }
})
