export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '盛视AI开放平台',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/mv-logo-ico.png' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'animate.css/animate.css',
    'swiper/dist/css/swiper.min.css',
    '@/assets/css/font-awesome.min.css',
    '@/assets/globalStyle.less',
    '@/assets/less/animateClass.less',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/router',
    '@/plugins/minigrid-plugin',
    // '@/plugins/mock-plugin',
    '@/assets/js/custom-directive.js',
    { src: '@/plugins/jquery-plugin', ssr: false },
    // {src: '@/plugins/three-plugin.js', ssr: false},
    // '@/plugins/three-plugin.js',
    '@/plugins/main.js',
    '@/plugins/echarts.js',
    '@/plugins/my-loading.js',
    { src: '@/plugins/swiper.js', ssr: false },
  ],
  router: {
    middleware: 'showLoading'
  },

  // 自定义加载中
  // loading: '@/components/loading.vue',

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
    vendor: ["axios"],
    filename: {
      video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]',
      css: ({ isDev }) => isDev ? '[name].css' : 'css/[contenthash:7].css',
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[name].[contenthash:7].[ext]',
    },

    // extend(config, ctx) {
    //   // Run ESLint on save
    //   const vueLoader = config.module.rules.find((loader) => loader.loader === 'vue-loader');
    //  /* 把audio标签在编译时转成src属性 */
    //   vueLoader.options.transformToRequire = {
    //     audio: 'src'
    //   };
    //   config.module.rules.push({
    //     test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    //     loader: 'url-loader',
    //     options: {
    //       limit: 10000,
    //       name: 'videos/[name].[hash:7].[ext]'

    //     }
    //   });
    // }

  },
  axios: {
    proxy: true, // 表示开启代理
  },
  dev: {
    proxy: {
      '/api': {
        target: 'http://192.168.103.140',
        // target: 'http://192.168.103.31',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  },
}
