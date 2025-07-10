import { defineConfig } from "vitepress";
import {
  demoblockPlugin,
  demoblockVitePlugin,
} from "vitepress-theme-demoblock";
import { resolve } from 'path'
import { codePreviewPlugin } from "vitepress-script-preview";

const alias = {
  '@': resolve(__dirname, '../../example')
}

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
      md.use(containerPreview, { clientOnly: true })
      md.use(componentPreview, { clientOnly: true })
    },
  },

  vite: {
    plugins: [demoblockVitePlugin()],
    resolve: {
      alias,
    },
  },
  title: "My Awesome Project",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
