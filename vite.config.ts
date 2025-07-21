import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx"; // 引入插件

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      // 显式配置JSX转换为Vue的h函数
      // 依据报错信息，推测该配置可能拼写错误，vite 的 vue-jsx 插件中正确配置项为 'factoryName'
      transformOn: true,
      optimize: true,
      // factoryName: "h",
      // 自动注入h函数，无需手动导入
      // injectH: true,
    }),
  ],
});
