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
    }
})
