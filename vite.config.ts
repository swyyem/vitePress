import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx' // 引入插件
import dts from 'vite-plugin-dts'

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
    dts({
      entryRoot: 'src',
      outDir: ['types'],
      tsconfigPath: 'tsconfig.json',
      include: ['src/**/*.ts', 'src/**/*.vue', 'src/**/*.tsx'], // 明确包含的文件
      exclude: ['src/stories/**/*'], // 忽略 stories 目录的类型文件
      beforeWriteFile: (filePath, content) => {
        // 将 .vue.d.ts 替换为 .d.ts
        const newFilePath = filePath.replace('.vue.d.ts', '.d.ts')
        return { filePath: newFilePath, content }
      },
    }),
  ],
})
