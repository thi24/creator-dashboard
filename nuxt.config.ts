// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "node:path"
export default defineNuxtConfig({
  alias: {
    cookie: resolve(__dirname, "node_modules/cookie")
  },
  devtools: { enabled: true },
  css: [
    '@/assets/style.css'
  ],
  modules: ['@hebilicious/authjs-nuxt', '@pinia/nuxt'],
  auth: {
    provider: {
      type: 'authjs'
    }
  },
  runtimeConfig: {
    authJs: {
      secret: process.env.NEXTAUTH_SECRET // You can generate one with `openssl rand -base64 32`
    },
    public: {
      baseURL: process.env.BASE_URL,
      authJs: {
        baseUrl: process.env.BASE_URL, // The URL of your deployed app (used for origin Check in production)
        verifyClientOnEveryRequest: true // whether to hit the /auth/session endpoint on every client request
      }
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