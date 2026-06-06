# 构建工具链 & 工程化 & CI/CD 高级面试题集

## 📑 快速导航目录

### 一、Vite 深度定制

- [1. Vite 的核心原理](#1-vite-的核心原理)
- [2. Vite 插件开发](#2-vite-插件开发)
- [3. Vite 配置优化](#3-vite-配置优化)
- [4. Vite HMR 原理](#4-vite-hmr-原理)
- [5. Vite 预构建机制](#5-vite-预构建机制)
- [6. Vite SSR 支持](#6-vite-ssr-支持)
- [7. Vite 库模式](#7-vite-库模式)
- [8. Vite 性能优化](#8-vite-性能优化)
- [9. Vite 自定义插件](#9-vite-自定义插件)
- [10. Vite 与 Webpack 对比](#10-vite-与-webpack-对比)
- [11. Vite 多页应用](#11-vite-多页应用)
- [12. Vite 环境变量](#12-vite-环境变量)
- [13. Vite 代理配置](#13-vite-代理配置)
- [14. Vite 构建产物优化](#14-vite-构建产物优化)
- [15. Vite 常见问题排查](#15-vite-常见问题排查)

### 二、Rsbuild 深度定制

- [16. Rsbuild 的核心优势](#16-rsbuild-的核心优势)
- [17. Rsbuild 插件系统](#17-rsbuild-插件系统)
- [18. Rsbuild 配置详解](#18-rsbuild-配置详解)
- [19. Rsbuild 性能优化](#19-rsbuild-性能优化)
- [20. Rsbuild 与 Rspack](#20-rsbuild-与-rspack)
- [21. Rsbuild 迁移方案](#21-rsbuild-迁移方案)
- [22. Rsbuild 多环境配置](#22-rsbuild-多环境配置)
- [23. Rsbuild 模块联邦](#23-rsbuild-模块联邦)
- [24. Rsbuild 自定义 Loader](#24-rsbuild-自定义-loader)
- [25. Rsbuild 构建分析](#25-rsbuild-构建分析)

### 三、Rollup 深度定制

- [26. Rollup 的核心原理](#26-rollup-的核心原理)
- [27. Rollup 插件开发](#27-rollup-插件开发)
- [28. Rollup 配置优化](#28-rollup-配置优化)
- [29. Rollup Tree Shaking](#29-rollup-tree-shaking)
- [30. Rollup 代码分割](#30-rollup-代码分割)
- [31. Rollup 库打包](#31-rollup-库打包)
- [32. Rollup 多入口打包](#32-rollup-多入口打包)
- [33. Rollup 外部依赖](#33-rollup-外部依赖)
- [34. Rollup 格式输出](#34-rollup-格式输出)
- [35. Rollup 与 Vite 关系](#35-rollup-与-vite-关系)

### 四、ESLint 深度定制

- [36. ESLint 工作原理](#36-eslint-工作原理)
- [37. ESLint 规则开发](#37-eslint-规则开发)
- [38. ESLint 配置策略](#38-eslint-配置策略)
- [39. ESLint 自动修复](#39-eslint-自动修复)
- [40. ESLint 性能优化](#40-eslint-性能优化)
- [41. ESLint 类型检查](#41-eslint-类型检查)
- [42. ESLint 插件开发](#42-eslint-插件开发)
- [43. ESLint 共享配置](#43-eslint-共享配置)
- [44. ESLint 增量检查](#44-eslint-增量检查)
- [45. ESLint 常见问题](#45-eslint-常见问题)

### 五、Prettier 深度定制

- [46. Prettier 工作原理](#46-prettier-工作原理)
- [47. Prettier 配置策略](#47-prettier-配置策略)
- [48. Prettier 与 ESLint 集成](#48-prettier-与-eslint-集成)
- [49. Prettier 自定义插件](#49-prettier-自定义插件)
- [50. Prettier 忽略文件](#50-prettier-忽略文件)

### 六、Husky + lint-staged

- [51. Husky 工作原理](#51-husky-工作原理)
- [52. lint-staged 工作原理](#52-lint-staged-工作原理)
- [53. Git Hooks 定制](#53-git-hooks-定制)
- [54. 代码质量卡点设计](#54-代码质量卡点设计)
- [55. 提交信息规范](#55-提交信息规范)
- [56. 预提交检查流程](#56-预提交检查流程)
- [57. 性能优化策略](#57-性能优化策略)
- [58. 错误处理机制](#58-错误处理机制)
- [59. 团队协作规范](#59-团队协作规范)
- [60. 常见问题排查](#60-常见问题排查)

### 七、CI/CD 自动化流水线

- [61. CI/CD 核心概念](#61-cicd-核心概念)
- [62. GitHub Actions 配置](#62-github-actions-配置)
- [63. GitLab CI 配置](#63-gitlab-ci-配置)
- [64. Jenkins Pipeline](#64-jenkins-pipeline)
- [65. 构建流水线设计](#65-构建流水线设计)
- [66. 自动化测试集成](#66-自动化测试集成)
- [67. 自动化部署方案](#67-自动化部署方案)
- [68. 环境管理策略](#68-环境管理策略)
- [69. 回滚机制设计](#69-回滚机制设计)
- [70. 监控告警集成](#70-监控告警集成)
- [71. 缓存优化策略](#71-缓存优化策略)
- [72. 并行构建优化](#72-并行构建优化)
- [73. 构建产物管理](#73-构建产物管理)
- [74. 版本发布流程](#74-版本发布流程)
- [75. 安全扫描集成](#75-安全扫描集成)

### 八、模块联邦

- [76. Module Federation 原理](#76-module-federation-原理)
- [77. 依赖共享策略](#77-依赖共享策略)
- [78. 版本管理方案](#78-版本管理方案)
- [79. 异步加载优化](#79-异步加载优化)
- [80. 组件共享方案](#80-组件共享方案)
- [81. 样式隔离处理](#81-样式隔离处理)
- [82. 类型共享方案](#82-类型共享方案)
- [83. 错误处理机制](#83-错误处理机制)
- [84. 性能监控方案](#84-性能监控方案)
- [85. 与微前端对比](#85-与微前端对比)

### 九、研发效能提升

- [86. 效能指标设计](#86-效能指标设计)
- [87. 构建速度优化](#87-构建速度优化)
- [88. 开发体验优化](#88-开发体验优化)
- [89. 代码审查流程](#89-代码审查流程)
- [90. 文档自动化](#90-文档自动化)
- [91. 脚手架工具开发](#91-脚手架工具开发)
- [92. 模板工程管理](#92-模板工程管理)
- [93. 依赖管理策略](#93-依赖管理策略)
- [94. 包体积优化](#94-包体积优化)
- [95. 发布流程优化](#95-发布流程优化)

### 十、质量保障体系

- [96. 代码质量指标](#96-代码质量指标)
- [97. 测试覆盖率要求](#97-测试覆盖率要求)
- [98. 代码规范检查](#98-代码规范检查)
- [99. 性能预算制定](#99-性能预算制定)
- [100. 安全扫描方案](#100-安全扫描方案)
- [101. 代码审查工具](#101-代码审查工具)
- [102. 质量门禁设计](#102-质量门禁设计)
- [103. 质量度量体系](#103-质量度量体系)
- [104. 质量改进流程](#104-质量改进流程)
- [105. 质量文化建设](#105-质量文化建设)

### 十一、Monorepo 工程化

- [106. Monorepo 工具对比](#106-monorepo-工具对比)
- [107. pnpm workspace](#107-pnpm-workspace)
- [108. 依赖提升策略](#108-依赖提升策略)
- [109. 构建编排方案](#109-构建编排方案)
- [110. 版本管理方案](#110-版本管理方案)
- [111. 发布流程设计](#111-发布流程设计)
- [112. 测试策略](#112-测试策略)
- [113. 代码共享规范](#113-代码共享规范)
- [114. 性能优化方案](#114-性能优化方案)
- [115. 常见问题排查](#115-常见问题排查)

### 十二、实战场景

- [116. 大型项目工程化](#116-大型项目工程化)
- [117. 组件库工程化](#117-组件库工程化)
- [118. 微前端工程化](#118-微前端工程化)
- [119. 多团队协同](#119-多团队协同)
- [120. 遗留系统改造](#120-遗留系统改造)
- [121. 性能优化实战](#121-性能优化实战)
- [122. 质量提升实战](#122-质量提升实战)
- [123. 效能提升实战](#123-效能提升实战)
- [124. 迁移方案实战](#124-迁移方案实战)
- [125. 最佳实践总结](#125-最佳实践总结)

---

## 一、Vite 深度定制

### 1. Vite 的核心原理

**回答要点：**

- **开发环境**：利用浏览器原生 ES Module，按需编译
- **生产环境**：使用 Rollup 打包，优化输出
- **核心优势**：
  1. 快速的冷启动
  2. 即时的热模块替换（HMR）
  3. 真正的按需编译

**工作流程：**

```
浏览器请求模块
  ↓
Vite 拦截请求
  ↓
按需编译（ESBuild 预构建依赖）
  ↓
返回 ESM 格式代码
  ↓
浏览器执行
```

### 2. Vite 插件开发

**回答要点：**

**插件钩子：**

```typescript
import type { Plugin } from 'vite'

export function myPlugin(): Plugin {
  return {
    name: 'my-plugin',

    // Vite 独有钩子
    config(config, { command }) {
      // 修改配置
    },

    configResolved(config) {
      // 配置解析后
    },

    configureServer(server) {
      // 配置开发服务器
    },

    // Rollup 钩子
    transform(code, id) {
      // 转换代码
      return code
    },

    buildStart() {
      // 构建开始
    },

    buildEnd() {
      // 构建结束
    },
  }
}
```

### 3. Vite 配置优化

**回答要点：**

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],

  // 开发服务器
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },

  // 构建优化
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          utils: ['lodash-es', 'dayjs'],
        },
      },
    },
  },

  // 依赖预构建
  optimizeDeps: {
    include: ['vue', 'vue-router'],
    exclude: ['local-package'],
  },

  // CSS 优化
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/variables.scss";',
      },
    },
  },
})
```

### 4. Vite HMR 原理

**回答要点：**

**HMR 工作流程：**

```
文件修改
  ↓
Vite 监听文件变化
  ↓
定位受影响的模块
  ↓
通过 WebSocket 通知浏览器
  ↓
浏览器请求更新模块
  ↓
Vite 编译更新后的模块
  ↓
浏览器执行更新
  ↓
局部刷新（不刷新页面）
```

**HMR API：**

```typescript
if (import.meta.hot) {
  import.meta.hot.accept(newModule => {
    // 处理模块更新
    console.log('Module updated:', newModule)
  })

  import.meta.hot.dispose(() => {
    // 清理旧模块
  })
}
```

### 5. Vite 预构建机制

**回答要点：**

**预构建目的：**

1. 将 CommonJS/UMD 转换为 ESM
2. 合并多个模块，减少请求数量
3. 缓存依赖，提升启动速度

**预构建配置：**

```typescript
export default {
  optimizeDeps: {
    include: ['vue', 'axios'],
    exclude: ['local-package'],
    force: false, // 强制重新预构建
  },
}
```

**缓存位置：**

```
node_modules/.vite/
├── deps/          # 预构建的依赖
└── _metadata.json # 元数据
```

### 6. Vite SSR 支持

**回答要点：**

**SSR 配置：**

```typescript
export default {
  ssr: {
    noExternal: ['package-to-bundle'],
  },
}
```

**SSR 入口：**

```typescript
// entry-server.ts
import { createSSRApp } from 'vue'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  return { app }
}
```

**服务端渲染：**

```typescript
import { renderToString } from 'vue/server-renderer'

app.get('*', async (req, res) => {
  const { app } = await createApp()
  const html = await renderToString(app)
  res.send(renderFullPage(html))
})
```

### 7. Vite 库模式

**回答要点：**

**库模式配置：**

```typescript
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'MyLib',
      formats: ['es', 'cjs', 'umd'],
      fileName: format => `my-lib.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
```

### 8. Vite 性能优化

**回答要点：**

**开发环境优化：**

```typescript
export default {
  server: {
    // 文件系统监听优化
    watch: {
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
    // 预加载
    预热: {
      include: ['./src/**/*.vue'],
    },
  },
}
```

**生产环境优化：**

```typescript
export default {
  build: {
    // 代码分割
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
    // 压缩优化
    minify: 'terser',
    terserOptions: {
      compress: {
        passes: 2,
      },
    },
  },
}
```

### 9. Vite 自定义插件

**回答要点：**

**实战案例：自动导入组件**

```typescript
import { Plugin } from 'vite'
import fs from 'fs'
import path from 'path'

export function autoImportComponents(): Plugin {
  return {
    name: 'auto-import-components',
    transform(code, id) {
      if (!id.endsWith('.vue')) return

      // 扫描组件目录
      const componentsDir = path.resolve(__dirname, 'src/components')
      const files = fs.readdirSync(componentsDir)

      // 生成导入代码
      const imports = files
        .filter(f => f.endsWith('.vue'))
        .map(f => {
          const name = path.basename(f, '.vue')
          return `import ${name} from './components/${f}';`
        })
        .join('\n')

      // 插入导入代码
      return code.replace('<script>', `<script>\n${imports}`)
    },
  }
}
```

### 10. Vite 与 Webpack 对比

**回答要点：**

| 对比项     | Vite         | Webpack      |
| ---------- | ------------ | ------------ |
| 开发启动   | 极快（秒级） | 慢（分钟级） |
| HMR        | 即时         | 较慢         |
| 原理       | ESM 按需编译 | 全量打包     |
| 生产构建   | Rollup       | 自身         |
| 配置复杂度 | 低           | 高           |
| 生态成熟度 | 中           | 高           |
| 适用场景   | 现代项目     | 各种场景     |

---

## 二、Rsbuild 深度定制

### 16. Rsbuild 的核心优势

**回答要点：**

**核心优势：**

1. **极速构建**：基于 Rspack（Rust 实现），比 Webpack 快 5-10 倍
2. **开箱即用**：内置常用插件和配置
3. **Webpack 兼容**：大部分 Webpack 配置可直接使用
4. **生态友好**：支持 Webpack 插件生态
5. **配置简洁**：更现代的配置方式

**性能对比：**

```
项目规模：1000+ 模块
Webpack 5：冷启动 ~30s，HMR ~2s
Rsbuild：  冷启动 ~3s，HMR ~0.2s
```

### 17. Rsbuild 插件系统

**回答要点：**

**插件开发：**

```typescript
import type { RsbuildPlugin } from '@rsbuild/core'

export function myPlugin(): RsbuildPlugin {
  return {
    name: 'my-plugin',

    setup(api) {
      // 修改配置
      api.modifyRsbuildConfig(config => {
        return config
      })

      // 修改 Bundler 配置
      api.modifyBundlerChain(chain => {
        chain.plugin('my-plugin').use(MyWebpackPlugin)
      })

      // 编译钩子
      api.onAfterBuild(({ stats }) => {
        console.log('Build completed')
      })
    },
  }
}
```

### 18. Rsbuild 配置详解

**回答要点：**

```typescript
import { defineConfig } from '@rsbuild/core'

export default defineConfig({
  source: {
    entry: {
      index: './src/index.ts',
    },
    alias: {
      '@': './src',
    },
  },

  output: {
    distPath: {
      root: 'dist',
    },
    filename: {
      js: '[name].[contenthash:8].js',
    },
  },

  tools: {
    rspack: {
      plugins: [],
    },
  },

  plugins: [],
})
```

### 19. Rsbuild 性能优化

**回答要点：**

**优化策略：**

```typescript
export default {
  performance: {
    // 移除 console
    removeConsole: true,
    // 代码分割
    chunkSplit: {
      strategy: 'split-by-experience',
      forceSplitting: {
        vendor: [/node_modules/],
      },
    },
  },

  output: {
    // 压缩配置
    minify: {
      js: true,
      css: true,
      jsOptions: {
        minimizerOptions: {
          compress: {
            drop_console: true,
          },
        },
      },
    },
  },
}
```

### 20. Rsbuild 与 Rspack

**回答要点：**

**关系说明：**

- **Rspack**：基于 Rust 的打包工具（类似 Webpack）
- **Rsbuild**：基于 Rspack 的构建工具（类似 Vite）

**架构：**

```
Rsbuild
  ↓
Rspack (Bundler)
  ↓
Rust 实现
```

---

## 三、Rollup 深度定制

### 26. Rollup 的核心原理

**回答要点：**

**核心特点：**

1. **Tree Shaking**：原生支持，去除未使用代码
2. **ESM 优先**：专注于 ES Module
3. **扁平化 Bundle**：输出更简洁的代码
4. **适合库开发**：打包库的首选工具

**工作流程：**

```
入口文件
  ↓
解析依赖图
  ↓
Tree Shaking
  ↓
代码转换
  ↓
输出 Bundle
```

### 27. Rollup 插件开发

**回答要点：**

**插件钩子：**

```typescript
import type { Plugin } from 'rollup'

export function myPlugin(): Plugin {
  return {
    name: 'my-plugin',

    // 构建阶段
    buildStart(options) {
      // 构建开始
    },

    // 解析阶段
    resolveId(source, importer) {
      // 自定义模块解析
    },

    // 加载阶段
    load(id) {
      // 自定义模块加载
    },

    // 转换阶段
    transform(code, id) {
      // 代码转换
      return code
    },

    // 生成阶段
    renderChunk(code, chunk) {
      // 渲染代码块
    },

    generateBundle(options, bundle) {
      // 生成产物
    },
  }
}
```

### 28. Rollup 配置优化

**回答要点：**

```typescript
import { defineConfig } from 'rollup'

export default defineConfig({
  input: 'src/index.ts',

  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
    },
  ],

  plugins: [typescript(), resolve(), commonjs()],

  external: ['vue', 'react'],

  treeshake: {
    moduleSideEffects: false,
  },
})
```

### 29. Rollup Tree Shaking

**回答要点：**

**Tree Shaking 原理：**

1. 静态分析 ES Module 导入/导出
2. 标记未使用的导出
3. 移除未使用的代码

**配置优化：**

```typescript
export default {
  treeshake: {
    // 假设模块没有副作用
    moduleSideEffects: false,
    // 更激进的优化
    propertyReadSideEffects: false,
    // 尝试更激进的优化
    tryCatchDeoptimization: false,
  },
}
```

**确保 Tree Shaking：**

```typescript
// ✅ 支持
export function foo() {}
export function bar() {}

// ❌ 不支持
export default { foo, bar };

// package.json
{
  "sideEffects": false
}
```

---

## 四、ESLint 深度定制

### 36. ESLint 工作原理

**回答要点：**

**工作流程：**

```
源代码
  ↓
解析为 AST
  ↓
遍历 AST 节点
  ↓
应用规则检查
  ↓
报告问题
  ↓
自动修复（可选）
```

**核心概念：**

- **AST**：抽象语法树
- **Rule**：检查规则
- **Parser**：代码解析器
- **Plugin**：规则插件

### 37. ESLint 规则开发

**回答要点：**

**规则开发：**

```typescript
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: '禁止使用 console',
      category: 'Best Practices',
    },
    fixable: 'code',
    schema: [],
  },

  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.type === 'MemberExpression' && node.callee.object.name === 'console') {
          context.report({
            node,
            message: 'Unexpected console statement',
            fix(fixer) {
              return fixer.remove(node.parent)
            },
          })
        }
      },
    }
  },
}
```

### 38. ESLint 配置策略

**回答要点：**

**Flat Config（ESLint 9+）：**

```typescript
// eslint.config.js
import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import typescript from '@typescript-eslint/eslint-plugin'

export default [
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
]
```

### 39. ESLint 自动修复

**回答要点：**

**修复策略：**

```bash
# 自动修复
eslint --fix src/

# 仅修复部分问题
eslint --fix --fix-type problem,suggestion src/

# 配合 lint-staged
"lint-staged": {
  "*.{js,ts,vue}": "eslint --fix"
}
```

---

## 五、Prettier 深度定制

### 46. Prettier 工作原理

**回答要点：**

**工作流程：**

```
源代码
  ↓
解析为 AST
  ↓
按照规则重新格式化
  ↓
输出格式化代码
```

**与 ESLint 区别：**

- **Prettier**：代码格式（空格、换行、引号）
- **ESLint**：代码质量（错误、最佳实践）

### 47. Prettier 配置策略

**回答要点：**

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### 48. Prettier 与 ESLint 集成

**回答要点：**

**集成方案：**

```bash
# 安装依赖
npm install -D eslint-config-prettier eslint-plugin-prettier
```

**配置：**

```typescript
// eslint.config.js
export default [
  {
    extends: [
      'eslint:recommended',
      'plugin:prettier/recommended', // 必须放在最后
    ],
    rules: {
      'prettier/prettier': 'error',
    },
  },
]
```

---

## 六、Husky + lint-staged

### 51. Husky 工作原理

**回答要点：**

**Git Hooks 机制：**

```
git commit
  ↓
触发 pre-commit hook
  ↓
执行 husky 脚本
  ↓
运行 lint-staged
  ↓
检查通过的代码
  ↓
提交成功
```

**配置：**

```bash
# 初始化 husky
npx husky init

# 添加 pre-commit hook
echo "npx lint-staged" >> .husky/pre-commit
```

### 52. lint-staged 工作原理

**回答要点：**

**工作流程：**

```
pre-commit hook 触发
  ↓
获取暂存的文件
  ↓
按照配置运行命令
  ↓
如果有错误，阻止提交
  ↓
如果通过，允许提交
```

**配置：**

```json
{
  "lint-staged": {
    "*.{js,ts,vue}": ["eslint --fix", "prettier --write"],
    "*.{css,scss}": ["prettier --write"],
    "*.md": ["prettier --write"]
  }
}
```

### 54. 代码质量卡点设计

**回答要点：**

**卡点设计：**

```bash
#!/bin/sh
# .husky/pre-commit

echo "🔍 Running pre-commit checks..."

# 1. ESLint 检查
echo "✓ ESLint checking..."
npx lint-staged

# 2. 类型检查
echo "✓ Type checking..."
npx vue-tsc --noEmit

# 3. 单元测试
echo "✓ Running tests..."
npm run test:unit

# 4. 提交信息规范
echo "✓ Commit message format..."
npx commitlint --edit

echo "✅ All checks passed!"
```

---

## 七、CI/CD 自动化流水线

### 61. CI/CD 核心概念

**回答要点：**

**CI（持续集成）：**

- 自动化构建
- 自动化测试
- 代码质量检查

**CD（持续交付/部署）：**

- 自动化部署
- 环境管理
- 版本发布

### 62. GitHub Actions 配置

**回答要点：**

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Lint
        run: pnpm lint

      - name: Type check
        run: pnpm type-check

      - name: Test
        run: pnpm test

      - name: Build
        run: pnpm build

      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
```

### 65. 构建流水线设计

**回答要点：**

**流水线阶段：**

```
1. 代码拉取
   ↓
2. 依赖安装（缓存优化）
   ↓
3. 代码检查（ESLint + Prettier）
   ↓
4. 类型检查（TypeScript）
   ↓
5. 单元测试
   ↓
6. 构建打包
   ↓
7. 产物上传
   ↓
8. 部署（可选）
```

### 71. 缓存优化策略

**回答要点：**

**GitHub Actions 缓存：**

```yaml
- name: Cache pnpm store
  uses: actions/cache@v3
  with:
    path: ~/.pnpm-store
    key: ${{ runner.os }}-pnpm-${{ hashFiles('**/pnpm-lock.yaml') }}
    restore-keys: |
      ${{ runner.os }}-pnpm-
```

**依赖缓存策略：**

- 缓存 node_modules
- 缓存构建产物
- 缓存测试快照

---

## 八、模块联邦

### 76. Module Federation 原理

**回答要点：**

**核心概念：**

- **Host**：消费远程模块的应用
- **Remote**：提供远程模块的应用
- **Shared**：共享的依赖

**工作流程：**

```
Host 应用启动
  ↓
加载 Remote 的 remoteEntry.js
  ↓
解析可用的远程模块
  ↓
异步加载远程模块
  ↓
共享依赖（避免重复加载）
  ↓
执行远程模块
```

### 77. 依赖共享策略

**回答要点：**

**Webpack 5 配置：**

```javascript
new ModuleFederationPlugin({
  name: 'app1',
  filename: 'remoteEntry.js',
  exposes: {
    './Button': './src/Button.vue',
  },
  shared: {
    vue: {
      singleton: true,
      requiredVersion: '^3.0.0',
    },
    'vue-router': {
      singleton: true,
    },
  },
})
```

**共享策略：**

1. **singleton**：确保只加载一个版本
2. **requiredVersion**：版本要求
3. **eager**：立即加载（不异步）

---

## 九、研发效能提升

### 86. 效能指标设计

**回答要点：**

**效能指标：**

- **构建时间**：冷启动、HMR、生产构建
- **代码质量**：ESLint 错误数、测试覆盖率
- **交付频率**：每天/每周发布次数
- **部署成功率**：成功部署比例
- **回滚率**：需要回滚的比例

### 87. 构建速度优化

**回答要点：**

**优化策略：**

1. **缓存优化**：依赖缓存、构建缓存
2. **并行构建**：多任务并行
3. **增量构建**：只构建变化的部分
4. **工具升级**：Webpack → Rsbuild/Vite
5. **硬件升级**：更快的 CPU、SSD

---

## 十、质量保障体系

### 96. 代码质量指标

**回答要点：**

**质量指标：**

- **ESLint 规则通过率**：> 95%
- **测试覆盖率**：> 80%
- **TypeScript 严格模式**：开启
- **代码重复率**：< 5%
- **圈复杂度**：< 10

---

## 十一、Monorepo 工程化

### 106. Monorepo 工具对比

**回答要点：**

| 工具          | 特点      | 优势           | 劣势       |
| ------------- | --------- | -------------- | ---------- |
| **pnpm**      | workspace | 快速、节省磁盘 | 生态较新   |
| **Lerna**     | 老牌工具  | 成熟           | 慢         |
| **Turborepo** | 缓存优化  | 极快           | 配置复杂   |
| **Nx**        | 全功能    | 强大           | 学习成本高 |

---

## 十二、实战场景

### 116. 大型项目工程化

**回答要点：**

**工程化方案：**

```
项目结构：
monorepo/
├── packages/
│   ├── core/          # 核心库
│   ├── utils/         # 工具库
│   └── components/    # 组件库
├── apps/
│   ├── web/           # Web 应用
│   └── admin/         # 后台管理
├── .husky/            # Git Hooks
├── .github/           # CI/CD
└── package.json

构建流程：
1. pnpm install（依赖安装）
2. pnpm lint（代码检查）
3. pnpm test（单元测试）
4. pnpm build（构建打包）
5. pnpm deploy（部署）
```

### 125. 最佳实践总结

**回答要点：**

**最佳实践：**

1. **统一规范**：ESLint + Prettier + Commitlint
2. **自动化**：CI/CD 全流程自动化
3. **缓存优化**：依赖缓存、构建缓存
4. **并行处理**：充分利用多核 CPU
5. **监控告警**：实时监控构建和部署
6. **文档完善**：自动化生成文档
7. **渐进式改进**：逐步优化，不要一步到位

---

## 面试准备建议

### 学习方法

1. **动手实践**：实际配置工具链
2. **对比分析**：对比不同工具的差异
3. **性能测试**：量化优化效果
4. **问题解决**：积累排查经验

### 重点掌握

- Vite/Rsbuild 插件开发
- ESLint 规则开发
- CI/CD 流水线设计
- Module Federation 实践
- Monorepo 工程化

### 面试技巧

- 用具体数据说明优化效果
- 展示完整的工程化方案
- 强调团队协作和规范
- 体现问题解决能力
