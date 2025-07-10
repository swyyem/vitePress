import { defineConfig } from "vitepress";
import {
  demoblockPlugin,
  demoblockVitePlugin,
} from "vitepress-theme-demoblock";
import { codePreviewPlugin } from "vitepress-script-preview";

import utils from "./utils";
const { getSideBar } = utils;


import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/vitePress/",
  markdown: {
    theme: { light: "github-light", dark: "github-dark" },

    config: (md) => {
      md.use(demoblockPlugin, {
        customClass: "demoblock-custom",
      });
      md.use(codePreviewPlugin);
      /**
       * SSR Compatibility
       * @link https://vitepress.dev/guide/ssr-compat
       * If the components are not SSR-friendly, you can specify the clientOnly to disable SSR.
       */
      md.use(containerPreview, { clientOnly: true });
      md.use(componentPreview, { clientOnly: true });
    },
  },

  vite: {
    plugins: [demoblockVitePlugin()],
    resolve: {
      
    },
  },
  title: "星辰小站",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
      { text: "Api", link: "/api-examples" },
      { text: "Front-end", link: "/front/engi/rule", activeMatch: "/front/" },
      {
        text: "Back-end",
        link: "/back/framework/chooseFrameWork",
        activeMatch: "/back/",
      },
      {
        text: "Others",
        link: "/others/operation/git",
        activeMatch: "/others/",
      },
    ],

    sidebar: {
      "/front/":getSideBar("front"),
      "/back/": getSideBar("back"),
      "/others": getSideBar("others"),
    },

    carbonAds: {//广告
      code: 'CEBDT27Y',
      placement: 'vuejsorg'
    },

    socialLinks: [//右上角社交平台
      { icon: 'github', link: 'https://github.com/vuejs/' },
      { icon: 'twitter', link: 'https://twitter.com/vuejs' },
      { icon: 'discord', link: 'https://discord.com/invite/vue' }
    ],
  },
});
