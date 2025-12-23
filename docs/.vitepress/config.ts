import { defineConfig } from 'vitepress'
import { demoblock as demoblockPlugin } from './plugins/demo-block/plugin/demoblock'
import { VitePluginDemoblock as demoblockVitePlugin } from './plugins/demo-block/plugin/vite-plugin-demoblock'
import codePreviewPlugin from './plugins/script-preview/plugin/codePreview'
import path from 'path'

import utils from './utils'
const { getSideBar } = utils

import { containerPreview, componentPreview } from './plugins/demo-preview/plugin/index'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  markdown: {
    theme: { light: 'vitesse-light', dark: 'vitesse-dark' },
    lineNumbers: true,

    config: md => {
      md.use(demoblockPlugin, {
        customClass: 'demoblock-custom',
      })
      md.use(codePreviewPlugin, { clientOnly: true })
      /**
       * SSR Compatibility
       * @link https://vitepress.dev/guide/ssr-compat
       * If the components are not SSR-friendly, you can specify the clientOnly to disable SSR.
       */
      md.use(containerPreview, { clientOnly: true })
      md.use(componentPreview, {
        clientOnly: true,
        alias: {
          '@toco-ui': path.resolve(__dirname, '../../src/toco-ui/'),
          '@swy-uis': path.resolve(__dirname, '../../src/swy-ui/'),
        },
      })

      // 重写表格渲染函数
      md.renderer.rules.table_open = function () {
        return '<div class="markdown-table-wrapper"><table>'
      }

      md.renderer.rules.table_close = function () {
        return '</table></div>'
      }
    },
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息',
    },
  },
  vite: {
    plugins: [demoblockVitePlugin() as unknown as Plugin],
    resolve: {
      alias: {
        '@swy-ui': path.resolve(__dirname, '../../src/swy-ui'), // 添加 element-plus 相关的路径别名
        '@toco-ui': path.resolve(__dirname, '../../src/toco-ui/'),
        '@swy-uis': path.resolve(__dirname, '../../src/swy-ui/'),
        '@demo-preview': path.resolve(__dirname, './plugins/demo-preview/component/index'),
        '@script-preview': path.resolve(__dirname, './plugins/script-preview/component/'),
        '@demo-block': path.resolve(__dirname, './plugins/demo-block/component/container/'),
      },
      extensions: ['.js', '.ts', '.vue', '.json'], // 确保支持自动解析扩展名
    },
    server: {
      host: '0.0.0.0',
      port: 8081, // 使用独立端口避免冲突
      open: true,
    },
  },
  base: '/vitePress/',
  title: '星辰小站',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      {
        text: '宝宝',
        link: '/meinv/hufu',
        activeMatch: '/hufu/',
      },
      { text: 'Markdown', link: '/Markdown' },
      { text: '演示', link: '/api/label' },
      { text: 'SwyUI 组件库', link: '/component' },
      { text: 'TocoUI 组件库', link: '/component' },
      { text: '前端', link: '/front/engi/rule', activeMatch: '/front/' },
      { text: 'javascript', link: '/javascript' },
      {
        text: '后端',
        link: '/back/framework/chooseFrameWork',
        activeMatch: '/back/',
      },
      {
        text: '其他',
        link: '/others/operation/git',
        activeMatch: '/others/',
      },
      {
        text: 'Git 规范',
        link: '/conventionalCommits/git',
        activeMatch: '/conventionalCommits/',
      },
      {
        text: 'python',
        link: '/python/basic',
        activeMatch: '/python/',
      },
      {
        text: '大模型',
        link: '/AILargeModel/TechnicalTerm',
        activeMatch: '/AILargeModel/',
      },
    ],

    sidebar: {
      '/meinv/': getSideBar('meinv'),
      '/front/': getSideBar('front'),
      '/back/': getSideBar('back'),
      '/others': getSideBar('others'),
      '/Markdown': getSideBar('Markdown'),
      '/api': getSideBar('api'),
      '/component': getSideBar('component'),
      '/AILargeModel': getSideBar('AILargeModel'),
      '/python': getSideBar('python'),
    },

    carbonAds: {
      //广告
      code: 'CEBDT27Y',
      placement: 'vuejsorg',
    },

    socialLinks: [
      //右上角社交平台
      { icon: 'github', link: 'https://github.com/vuejs/' },
      { icon: 'twitter', link: 'https://twitter.com/vuejs' },
      { icon: 'discord', link: 'https://discord.com/invite/vue' },
    ],
  },
})
