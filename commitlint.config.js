export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复bug
        'docs', // 文档变更
        'style', // 代码格式(不影响代码运行)
        'refactor', // 重构(既不是新功能也不是bug修复)
        'perf', // 性能优化
        'test', // 测试
        'build', // 构建工具或外部依赖变更
        'ci', // CI配置文件变更
        'chore', // 其他不修改src或测试文件的提交
        'revert', // 回滚提交
        'release', // 发布版本
      ],
    ],
    'type-case': [2, 'always', 'lower-case'], // type必须小写
    'type-empty': [2, 'never'], // type不能为空
    'subject-empty': [2, 'never'], // subject不能为空
    'subject-full-stop': [2, 'never', '.'], // subject不能以句号结尾
    'header-max-length': [2, 'always', 100], // header最大长度100
  },
}
