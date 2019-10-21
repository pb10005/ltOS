export default {
  /*
  ** Rendering mode
  ** Doc: https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',

  server: {
    host: '0.0.0.0'
  },
  /*
  ** Headers of the page
  ** Doc: https://vue-meta.nuxtjs.org/api/#metainfo-properties
  */
  head: {
    title: 'ltOS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'ltOS' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Global CSS
  ** Doc: https://nuxtjs.org/api/configuration-css
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  ** Doc: https://nuxtjs.org/guide/plugins
  */
  plugins: [],

  pwa: {
    manifest: {
      name: 'Explorer',
      lang: 'en'
    }
  },
  /*
  ** Nuxt.js modules
  ** Doc: https://nuxtjs.org/guide/modules
  */
  modules: [
    // Doc: https://http.nuxtjs.org
    '@nuxt/http',
    '@nuxtjs/pwa',
    [
      'nuxt-i18n',
      {
        strategy: 'prefix_except_default',
        locales: [{ code: 'en', iso: 'en-US'}, {code: 'ja', iso: 'ja_JP'}],
        defaultLocale: 'en',
        vueI18n: {
          fallbackLocale: 'en'
        },
        vueI18nLoader: true
      }
    ],
    // TODO: Remove it if you want to eject from codeSandbox
    './codesandbox'
  ],

  buildModules: ['@nuxtjs/vuetify'],
  vuetify: {
    theme: {
      dark: false
    }
  },

  /*
  ** HTTP module configuration
  */
  http: {
    // See https://http.nuxtjs.org/api/#options
  },

  /*
  ** Build configuration
  ** Doc: https://nuxtjs.org/api/configuration-build
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {}
  }
};
