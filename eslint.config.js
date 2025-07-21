import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended, // 使用ESLint推荐规则
  {
    files: ['**/*.{js,ts,vue,jsx,tsx}'], // 针对这些文件
    languageOptions: {
      globals: {
        ...globals.browser, // 浏览器全局变量
        ...globals.node, // Node.js全局变量
      },
    },
    rules: {
      'no-console': 'warn', // 自定义规则示例
      semi: ['error', 'always'],
    },
  },
];
