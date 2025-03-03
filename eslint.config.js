import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 基础配置：指定文件类型和全局变量
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  // 启用 JavaScript 推荐规则
  pluginJs.configs.recommended,
  // 启用 TypeScript 推荐规则
  ...tseslint.configs.recommended,
  // 启用 Vue 推荐规则
  ...pluginVue.configs['flat/essential'],
  // 配置 Vue 文件的解析器
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  // 启用 Prettier 插件和规则
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // 将 Prettier 作为 ESLint 规则运行
      'prettier/prettier': 'error',
    },
  },
  // 关闭与 Prettier 冲突的 ESLint 规则
  prettierConfig,
  // 配置 ESLint 忽略规则
  {
    ignores: ['node_modules/', 'dist/', '*.min.js', '**/build/'],
  },
];
