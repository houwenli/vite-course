import path from 'path'
import { defineConfig } from 'vite'
import { ViteAliases } from 'vite-aliases'
import MyViteAliases from '../plugins/ViteAliases'

// import { createHtmlPlugin } from 'vite-plugin-html'
import CreateHtmlPlugin from '../plugins/CreateHtmlPlugin'

// const postcssPresetEnv = require('postcss-preset-env')

// import { viteMockServe } from 'vite-plugin-mock'

import MyViteMockServe from '../plugins/VitePluginMock'

import viteCDNPlugin from 'vite-plugin-cdn-import'

export default defineConfig({
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, '../src'),
  //     '@assets': path.resolve(__dirname, '../src/assets'),
  //   }
  // },
  envPrefix: 'WSJC_',
  css: {
    modules: {
      // css-module类名转换形式，是驼峰式或者是中划线
      // 用于在js中使用，比如footer-content，如果不做转换需要使用module['footer-content']，转换了之后可以使用module.footerContent
      localsConvention: 'camelCaseOnly', // "camelCase" | "camelCaseOnly" | "dashes" | "dashesOnly
      // 判断是不是需要开启模块化
      scopeBehaviour: 'local', // "global" | "local"
      // 控制真实的类名
      // generateScopedName: "_[local]_[hash:5]",
      // 还可以是函数
      generateScopedName: (name, filename, css) => {
        // console.log('name', name, 'filename', filename, 'css', css)、
        return `${name}_${Math.random().toString().substr(3, 5)}`
      },
      // 定义某些文件不走cssmodule转换
      // globalModulePaths: ['./componentB.module.css']
    },
    preprocessorOptions: {
      less: {
        // 是否转换数学表达式，不设置只能识别括号中的数学表达式
        math: 'always',
        // 定义一些全局变量
        globalVars: {
          mainColor: 'green'
        }
      },
      sass: {

      }
    },
    // 是否开启css 的 sourceMap，因为css全都是js处理过的，所以看不到源代码了
    devSourcemap: true,
    // 后编译
    // postcss: {
    //   plugins: [postcssPresetEnv({})]
    // }
    
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://www.wsecar.com/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        // 静态资源打包，注意，这里不会修改js的文件名
        // js是动态资源
        assetFileNames: 'static/[hash:5].[name].[ext]',
        chunkFileNames: 'js/[hash:6].[name].js',
        entryFileNames: `js/[hash:6]-[name].js`,
        // manualChunks: {
        //   'lodash': ['lodash'],
        // }
      }
    },

    // 静态资源的大小，默认4k，小于4k的资源会转换为base64格式
    assetsInlineLimit: 409600,
    // 配置输出目录
    // outDir: 'testDist',
    // 配置输出目录的静态资源
    assetsDir: 'static',
    // 是否清空输出目录
    // emptyOutDir: false
  },
  plugins: [
    // ViteAliases({
    //   prefix: '@'
    // }),
    MyViteAliases(),

    // 定义模板相关
    // createHtmlPlugin({
    //   // template: '../public/index.html',
    //   inject: {
    //     data: {
    //       title: '主页'
    //     }
    //   },
    // }),

    CreateHtmlPlugin({
      inject: {
        data: {
          title: '主页'
        }
      },
    }),
    // viteMockServe({
      
    // }),
    // MyViteMockServe(),
    viteCDNPlugin({
      modules: [{
        name: 'lodash',
        var: '__',
        path: 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js'
      }]
    })
  ]
})