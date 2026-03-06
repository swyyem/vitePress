import { defineConfig } from 'vitepress'
import { demoblock as demoblockPlugin } from './plugins/demo-block/plugin/demoblock'
import { VitePluginDemoblock as demoblockVitePlugin } from './plugins/demo-block/plugin/vite-plugin-demoblock'
import codePreviewPlugin from './plugins/script-preview/plugin/codePreview'
import { containerPreview, componentPreview } from './plugins/demo-preview/plugin/index'
import path from 'path'
import utils from './utils'

const { getSideBar, getNav } = utils

export default defineConfig({
  markdown: {
    theme: { light: 'vitesse-light', dark: 'vitesse-dark' },
    lineNumbers: true,
    config: md => {
      md.use(demoblockPlugin, {
        customClass: 'demoblock-custom',
      })
      md.use(codePreviewPlugin, { clientOnly: true })
      md.use(containerPreview, { clientOnly: true })
      md.use(componentPreview, {
        clientOnly: true,
        alias: {
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
    nav: getNav(),
    sidebar: {
      '/beautifulWoman/': getSideBar('beautifulWoman'),
      '/front/': getSideBar('front'),
      '/back/': getSideBar('back'),
      '/others': getSideBar('others'),
      '/Markdown': getSideBar('Markdown'),
      '/component': getSideBar('SwyUI'),
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
