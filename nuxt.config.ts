// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt'
  ],
  css: [
    '~/assets/css/style.css'
  ],
  app: {
    head: {
      title: 'Morecare — Ergonomic Wellness & Mobility Solutions',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'MoreCare medical and mobility equipment. Experience lightweight carbon fiber electric wheelchairs, tailbone pain relief cushions, and orthopedic insoles.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
      ]
    }
  },
  routeRules: {
    '/index.html': { redirect: '/' },
    '/product.html': { redirect: '/product/MC-C01' }
  }
})
