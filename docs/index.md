---
layout: home # 声明当前页面的模块结构为首页，默认为 page

hero: # banner 部分
  name: "Charlie Blog" # 主标题
  text: "Welcome to Charlie's blog!" # 副标题
  tagline: All articles on this website are original. Please indicate the source when reprinting! # 内容区
  image: # 图片区
    src: /home/home-banner.jpg # 图片地址
    alt: 加载失败 # 图片加载失败提示语
  actions:
    - theme: brand # 按钮区域
      text: View Blogs # 按钮文案
      link: /front/engi/rule # 跳转链接（以 docs 为根路径）

features: # 功能区
  - title: Front End # 标题
    icon:
      src: /home/tupian.svg # 图标地址
    link: /front/engi/rule # 跳转链接
    details: Front-end frameworks such as Vue and React, technical design such as micro-front-end and low code, and common front-end performance optimization schemes # 文案描述

  - title: Back End
    icon:
      src: /home/unfold.svg
    link: /front/engi/back
    details: Back-end framework applications such as express and nest.js, as well as the operation of common data such as mysql and mongodb

  - title: Others
    icon:
      src: /home/Vector.svg
    link: /front/engi/operation
    details: Git operation, network engineering, and some other commonly used programming tools, skills and so on
---
