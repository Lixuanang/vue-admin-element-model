'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const GeneraterAssetPlugin = require('generate-asset-webpack-plugin')
const isDev = (process.env.NODE_ENV === 'development')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const projectConfig = require('./project.json')

const createJson = compilation => JSON.stringify(projectConfig, null, '\t')

const name = defaultSettings.title || '数据修改系统' // page title
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = 9545 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: isDev ? '/' : '/demo/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API + '/paas']: {
        target: `http://192.168.2.121:8083`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API + '/paas']: '/paas'
        }
      },
      [process.env.VUE_APP_BASE_API]: {
        target: `http://192.168.2.118:9090`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      },
      '/demoFile': {
        target: 'http://192.168.2.118:9532',
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/demoFile': '/' // 重写接口
        }
      }
    },
    // after: require('./mock/mock-server.js')
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    entry: {
      app: './src/main.js',
      store: './src/Distributor.js'
    },
    output: {
      filename: isDev ? '[name].js?[hash:8]' : '[name].[hash:8].js',
      library: projectConfig.name,
      libraryTarget: 'umd'
    },
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      new StyleLintPlugin({
        files: ['./src/*.{html,vue,css,sass,scss}'],
        fix: false,
        cache: false,
        emitErrors: true,
        failOnError: false
      }),
      new GeneraterAssetPlugin({
        filename: 'project.json', // 输出到dist根目录下的文件名
        fn(compilation, cb) {
          cb(null, createJson(compilation))
        }
      })
    ]
  },
  css: {
    extract: false
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
      .use('htmllint-loader')
      .loader('htmllint-loader')
      .options({
        config: '.htmllintrc',
        failOnError: true,
        faileOnWarning: false,
        enforce: 'pre'
      })

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development', config =>
        config.devtool('cheap-source-map')
      )

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.minimizer([
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true, // console
              pure_funcs: ['console.log'] // 移除console
            }
          }
        })
      ])
      config.optimization.delete('splitChunks')
    })
  }
}
