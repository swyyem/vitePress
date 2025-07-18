import { defineConfig } from "vitepress";
import { demoblock as demoblockPlugin } from "./plugins/demo-block/plugin/demoblock";
import { VitePluginDemoblock as demoblockVitePlugin } from "./plugins/demo-block/plugin/vite-plugin-demoblock";
import codePreviewPlugin from "./plugins/script-preview/plugin/codePreview";
import path from "path";

import utils from "./utils";
const { getSideBar } = utils;

import {
  containerPreview,
  componentPreview,
} from "./plugins/demo-preview/plugin/index";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  markdown: {
    theme: { light: "vitesse-light", dark: "vitesse-dark" },
    lineNumbers: true,

    config: (md) => {
      md.use(demoblockPlugin, {
        customClass: "demoblock-custom",
      });
      md.use(codePreviewPlugin, { clientOnly: true });
      /**
       * SSR Compatibility
       * @link https://vitepress.dev/guide/ssr-compat
       * If the components are not SSR-friendly, you can specify the clientOnly to disable SSR.
       */
      md.use(containerPreview, { clientOnly: true });
      md.use(componentPreview, {
        clientOnly: true,
        alias: {
          "@component": path.resolve(__dirname, "../../src/components/"),
        },
      });
    },
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  vite: {
    plugins: [
      (demoblockVitePlugin() as unknown as Plugin)
    ],
    resolve: {
      alias: {
        "@component": path.resolve(__dirname, "../../src/components/"),
        "@demo-preview": path.resolve(
          __dirname,
          "./plugins/demo-preview/component/index"
        ),
        "@script-preview": path.resolve(
          __dirname,
          "./plugins/script-preview/component/"
        ),
        "@demo-block": path.resolve(
          __dirname,
          "./plugins/demo-block/component/container/"
        ),
        "@styles": path.resolve(__dirname, "../../src/styles/index.css"),
      },
      extensions: [".js", ".ts", ".vue", ".json"], // 确保支持自动解析扩展名
    },
    server: {
      host: "0.0.0.0",
      port: 8081, // 使用独立端口避免冲突
      open: true,
    },
  },
  base: "/vitePress/",
  title: "星辰小站",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "Markdown", link: "/Markdown" },
      { text: "演示", link: "/api" },
      { text: "组件", link: "/component" },
      { text: "前端", link: "/front/engi/rule", activeMatch: "/front/" },
      {
        text: "后端",
        link: "/back/framework/chooseFrameWork",
        activeMatch: "/back/",
      },
      {
        text: "其他",
        link: "/others/operation/git",
        activeMatch: "/others/",
      },
    ],

    sidebar: {
      "/front/": getSideBar("front"),
      "/back/": getSideBar("back"),
      "/others": getSideBar("others"),
      "/Markdown": getSideBar("Markdown"),
      "/api": getSideBar("api"),
      "/component": getSideBar("component"),
    },

    carbonAds: {
      //广告
      code: "CEBDT27Y",
      placement: "vuejsorg",
    },

    socialLinks: [
      //右上角社交平台
      { icon: "github", link: "https://github.com/vuejs/" },
      { icon: "twitter", link: "https://twitter.com/vuejs" },
      { icon: "discord", link: "https://discord.com/invite/vue" },
    ],
  },
});
