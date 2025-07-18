---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "星辰小站"
  text: "VitePress网站"
  tagline: 个人学习总结
  image:
    src: /home/home-banner.jpg
    alt: 加载失败
  actions:
    - theme: brand
      text: Markdown
      link: /Markdown
    - theme: alt
      text: API
      link: /api

features:
  - title: Markdown
    icon:
      src: /home/Markdown.svg
    link: /Markdown
    details: Markdown的基本使用
  - title: 演示
    icon:
      src: /home/demonstrate.svg
    link: /api
    details: vitePress自定义插件的使用方法
  - title: 组件
    icon:
      src: /home/component.svg
    link: /component
    details: 业务组件的使用方法
  - title: 前端
    icon:
      src: /home/front-end-icon.svg
    link: /front/engi/rule
    details: 前端框架，如Vue和React，技术设计，如微前端和低代码，以及常见的前端性能优化方案
  - title: 后端
    icon:
      src: /home/back-end-icon.svg
    link: /back/framework/chooseFrameWork
    details: 后端框架应用程序，如express和nest.js，以及常见数据库如mysql和mongodb的操作
  - title: 其他
    icon:
      src: /home/network-icon.svg
    link: /others/operation/git
    details: Git操作、网络工程，以及其他一些常用的编程工具、技能等
---
