// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/supabase',
    '@nuxt/ui'
  ],

  supabase: {
    url: process.env.SUPABASE_URL,
<<<<<<< HEAD
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: '/authPage',
      callback: 'confirm',
      exclude: ['/authPage'],
    }
=======
    key: process.env.SUPABASE_KEY
>>>>>>> 8877f940e249bace5affed3eefb83fc70d5ccdad
  },

  typescript: {
    strict: true
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
<<<<<<< HEAD
    '/': { redirect: '/authPage' },
=======
    '/': { redirect: '/authPage' }
>>>>>>> 8877f940e249bace5affed3eefb83fc70d5ccdad
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
