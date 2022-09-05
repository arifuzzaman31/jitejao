import path from 'path'
import fs from 'fs'
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'JiteJao | জিতে যাও ',
    meta: [
      { charset: 'utf-8' },
      { name:'google', content:'notranslate'},
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css' },
      // { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      // { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Baloo+Da+2:wght@400' },
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/css/font-awesome.css',
    '~/assets/css/style.css',
    '~/assets/css/settings.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/global-mixin.js' },
    { src: '~/plugins/otp-input.js' },
    // { src: '~/plugins/echo.js', mode: 'client' },
    { src: '~/plugins/star_ratings.js', ssr: false },
    { src: '~/plugins/vue2-editor', ssr: false },

  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/dotenv'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  loading: {
    color: '#4481eb',
    height: '5px'
  },

  axios:
  {
    baseURL: process.env.API_BASE_URL
  },

  auth: {
    cookie: { options: { secure: process.env.NODE_ENV == 'production' } },
    redirect: {
      login: '/login',
      logout: '/',
      // callback: '/login',
      home: '/',
      callback: '/'
    },
    watchLoggedIn: true,
    rewriteRedirects: true,
    strategies: {
      local: {
        token: {
          property: 'token',
          required: true,
          type: 'Bearer',
          maxAge: 31536000,
        },
        user: {
          property: 'user',
          // autoFetch: false
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/user', method: 'get' }
        }
      }
    }
  },

  env: {
    // pusherId: process.env.PUSHER_APP_ID || '1225904',
    // pusherKey: process.env.PUSHER_APP_KEY || 'b0db16ecc014f88e6a27',
    // pusherSecret: process.env.PUSHER_APP_SECRET || '3ee3185298ddaa91d6f7',
    // pusherCluster: process.env.PUSHER_APP_CLUSTER || 'ap3',
    baseUrl: process.env.APP_URL || 'http://jitejao.com',
    metaUrl: process.env.META_IMAGE_URL || 'https://bidoapi.bangladeshclubgeneva.ch/public/images/seo/meta.jpeg',
  },

  // publicRuntimeConfig: {
  //   baseURL: 'http://127.0.0.1:8000/api/v1' || 'https://somerealapi.com'
  // },
  // privateRuntimeConfig: {
  //   apiSecret: process.env.API_SECRET
  // },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    },
    babel: {
      compact: true,
    },

  },

  server: {
    port: 3000, // default: 3000     
    host: '0.0.0.0', // default: localhost 
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    // }
  },
}
