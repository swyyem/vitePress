/**
 * @typedef {Object} MenuItem
 * @property {string} text
 * @property {MenuItem[]} [items]
 * @property {string} [link]
 * @property {boolean} [collapsed]
 * @property {boolean} [collapsible]
 */

/**
 * @typedef {Object} CategoryMap
 * @property {MenuItem[]} [key]
 */

export default {
  getSideBar(path) {
    const wholeList = [
      {
        text: 'front',

        items: [
          {
            text: '前端面试题',
            collapsible: true,
            collapsed: false, // 默认展开
            items: [
              {
                text: 'HTML5与CSS3',
                collapsible: true,
                collapsed: false, // 默认展开
                items: [
                  {
                    text: 'HTML5 新特性',
                    link: '/front/interview/html5/newFeatures',
                  },
                  {
                    text: 'CSS3 新特性',
                    link: '/front/interview/css3/newFeatures',
                  },
                ],
              },
              {
                text: 'CSS布局方式',
                link: '/front/interview/layout-method',
              },
              {
                text: 'DIV居中',
                link: '/front/interview/div-center',
              },
              {
                text: '伪类与伪元素的区别',
                link: '/front/interview/pseudo-class',
              },
              {
                text: 'css 选择器的优先级排序',
                link: '/front/interview/css-priority',
              },
              {
                text: '深拷贝与浅拷贝',
                link: '/front/interview/copy',
              },
              {
                text: '封装过的组件',
                link: '/front/interview/encapsulated',
              },
              {
                text: 'JSONP原理',
                link: '/front/interview/jsonp',
              },
              {
                text: '本地离线存储',
                link: '/front/interview/Local-offline-storage',
              },
              {
                text: 'LINK与A标签',
                link: '/front/interview/link',
              },
              {
                text: '盒子模型',
                link: '/front/interview/box-model',
              },
              {
                text: '闭包',
                link: '/front/interview/closure',
              },
              {
                text: '作用域',
                link: '/front/interview/scope',
              },
              {
                text: '网站性能优化',
                link: '/front/interview/website-performance',
              },
              {
                text: 'ES5 与 ES6新特性',
                link: '/front/interview/es6',
              },
              {
                text: '对于MVVM的理解',
                link: '/front/interview/mvvm',
              },
              {
                text: 'Vue生命周期',
                link: '/front/interview/life-cycle',
              },
              {
                text: 'Vue数据双向绑定',
                link: '/front/interview/two-way-binding',
              },
              {
                text: '组件间传值',
                link: '/front/interview/component-value-transfer',
              },
              {
                text: 'Vue路由',
                link: '/front/interview/route',
              },
              {
                text: 'Vue路由钩子函数',
                link: '/front/interview/route-hook-function',
              },
              {
                text: 'Vue数据管理中心',
                link: '/front/interview/vuex',
              },
              {
                text: 'keep-alive',
                link: '/front/interview/keep-alive',
              },
              {
                text: 'css样式隔离',
                link: '/front/interview/style-isolation',
              },
              {
                text: 'v-if 和 v-show',
                link: '/front/interview/v-ifANDv-show',
              },
              {
                text: 'vue-route 和 vue-router',
                link: '/front/interview/vue-route-vs-router',
              },
              {
                text: 'vue核心概念',
                link: '/front/interview/vue-core-concepts',
              },
              {
                text: 'v-for 和 v-if',
                link: '/front/interview/v-for-v-if',
              },
              {
                text: 'Vue修饰符',
                link: '/front/interview/vue-modifiers',
              },
              {
                text: 'vue中的跨域问题',
                link: '/front/interview/cross-domain',
              },
              {
                text: '浏览器与服务器的交互原理',
                link: '/front/interview/browser-server-interaction',
              },
              {
                text: 'v-on 可以绑定多个方法吗',
                link: '/front/interview/v-on',
              },
              {
                text: 'vue中key 值的作用',
                link: '/front/interview/key',
              },
              {
                text: '$nextTick的使用',
                link: '/front/interview/nextTick',
              },
              {
                text: '父组件调用子组件方法',
                link: '/front/interview/method',
              },
              {
                text: '项目初始化页面闪动问题',
                link: '/front/interview/page-flashing',
              },
              {
                text: 'vue2 与vue3 的区别',
                link: '/front/interview/vue2-vue3',
              },
              {
                text: 'vue和react的区别',
                link: '/front/interview/vue-react',
              },
              {
                text: 'js数组的方法',
                link: '/front/interview/arrary',
              },
              {
                text: '监听 DOM 树',
                link: '/front/interview/DOM-tree',
              },
              {
                text: 'JavaScript 的事件循环机制',
                link: '/front/interview/event-cycle-mechanism',
              },
              {
                text: 'Javascript的数据类型',
                link: '/front/interview/data-type',
              },
              {
                text: '怎样判断变量的类型',
                link: '/front/interview/typeof',
              },
            ],
          },
          {
            text: '前端工程化',
            collapsible: true,
            collapsed: false, // 默认展开
            items: [
              {
                text: '前端规范搭建',
                link: '/front/engi/rule/',
              },
              {
                text: 'Monorepo理论与实践',
                link: '/front/engi/monorepo/',
              },
              {
                text: '前端常见性能优化方案',
                link: '/front/base/performance/',
              },
              {
                text: '前端资源部署策略',
                link: '/front/engi/deploy/',
              },

              {
                text: '微前端架构浅析',
                link: '/front/engi/microFront/',
              },
              {
                text: '前端视角看CICD',
                link: '/front/engi/CICD/',
              },
            ],
          },
          {
            text: '前端基础',
            collapsible: true,
            collapsed: false, // 默认展开
            items: [
              {
                text: '前端最全Debugger技巧',
                link: '/front/base/debugger/',
              },
              {
                text: '从前端视角看AI世界',
                link: '/front/base/Ai/',
              },
              {
                text: 'Vue2源码之响应式及队列调度',
                link: '/front/source/vue2/reactive/',
              },
              {
                text: 'TS入门及实践',
                link: '/front/base/TS/',
              },
              {
                text: '前端常用设计模式',
                link: '/front/base/designMode/',
              },
              {
                text: 'Redux入门及实践',
                link: '/front/base/react/redux/',
              },
              {
                text: '10分钟搭建一个属于自己的博客',
                link: '/front/practice/blog/',
              },
              {
                text: '做过的算法题合集',
                link: '/front/base/algorithm/',
              },
            ],
          },
          {
            text: 'Uniapp跨端开发',
            collapsible: true,
            collapsed: false, // 默认展开
            items: [
              {
                text: '包体积优化',
                link: '/front/mini/packageSize/',
              },
              {
                text: '自定义编译变量及环境变量',
                link: '/front/mini/var/',
              },
              {
                text: 'Uniapp对接微信原生SDK',
                link: '/front/mini/thirdSDK/',
              },
              {
                text: 'Uniapp开发App入门与实践',
                link: '/front/mini/app/',
              },
              {
                text: 'App上架各应用市场攻略',
                link: '/front/mini/publish',
              },
              // {
              //   text: "Uniapp踩坑合集",
              //   link: "/front/mini/trap/",
              // },
            ],
          },
        ],
      },
      {
        text: 'back',
        items: [
          {
            text: '后端基础',
            items: [
              {
                text: '论全干工程师的自我修养',
                link: '/back/framework/chooseFrameWork/',
              },
              {
                text: '浅析后端三层架构',
                link: '/back/framework/structure/',
              },

              {
                text: 'Nest入门与实践',
                link: '/back/framework/nest/',
              },
              {
                text: 'Redis入门与实践',
                link: '/back/framework/redis/',
              },
              {
                text: '关系型数据与非关系型数据库',
                link: '/back/framework/database',
              },
              {
                text: 'MySql入门与实践',
                link: '/back/framework/mysql',
              },
            ],
          },
        ],
      },
      {
        text: 'others',
        items: [
          {
            text: '常用操作指令',
            items: [
              {
                text: 'Git',
                link: '/others/operation/git/',
              },
              {
                text: 'MarkDown',
                link: '/others/operation/md/',
              },
              {
                text: 'Linux',
                link: '/others/operation/linux/',
              },
            ],
          },
          {
            text: '网络与运维',
            items: [
              {
                text: 'Nginx',
                link: '/others/maintain/ng/',
              },
              {
                text: 'Docker',
                link: '/others/maintain/docker/',
              },
              {
                text: 'Jenkins',
                link: '/others/maintain/jenkins/',
              },
              {
                text: '浅析浏览器缓存',
                link: '/others/maintain/cache/',
              },
            ],
          },
        ],
      },
      {
        text: 'Markdown',
        items: [
          {
            text: 'Markdown 语法',
            items: [
              {
                text: '表格',
                link: '/Markdown/components/table',
              },
              {
                text: '目录',
                link: '/Markdown/components/mulu',
              },
              {
                text: '容器',
                link: '/Markdown/components/rongqi',
              },
              {
                text: '字体样式',
                link: '/Markdown/components/ziti',
              },
              {
                text: '支持的表情',
                link: '/Markdown/components/emoji',
              },
              {
                text: '代码块',
                link: '/Markdown/components/daima',
              },
              {
                text: '组件',
                link: '/Markdown/components/zujian',
              },
            ],
          },
        ],
      },
      {
        text: 'api',
        items: [
          {
            text: '组建的演示方法',
            items: [
              {
                text: '使用标签的写法',
                link: '/api/label',
              },
              {
                text: '使用相对路径的写法',
                link: '/api/path',
              },
              {
                text: '注册方法',
                link: '/api/functions',
              },
            ],
          },
        ],
      },
      {
        text: 'component',
        items: [
          {
            text: 'ProField 原子组件',
            collapsible: true, // 允许折叠
            collapsed: true, // 默认折叠
            items: [
              {
                text: 'text',
                link: '/component/proField/text',
              },
              {
                text: 'autocomplete',
                link: '/component/proField/autocomplete',
              },
              {
                text: 'inputNumber',
                link: '/component/proField/inputNumber',
              },
              {
                text: 'select',
                link: '/component/proField/select',
              },
              {
                text: 'checkbox',
                link: '/component/proField/checkbox',
              },
              {
                text: 'price',
                link: '/component/proField/price',
              },
              {
                text: 'radio',
                link: '/component/proField/radio',
              },
              {
                text: 'rate',
                link: '/component/proField/rate',
              },
              {
                text: 'slider',
                link: '/component/proField/slider',
              },
              {
                text: 'switch',
                link: '/component/proField/switch',
              },
              {
                text: 'avatar',
                link: '/component/proField/avatar',
              },
              {
                text: 'image',
                link: '/component/proField/image',
              },
              {
                text: 'cascader',
                link: '/component/proField/cascader',
              },
              {
                text: 'colorPicker',
                link: '/component/proField/colorPicker',
              },
              {
                text: 'segmented',
                link: '/component/proField/segmented',
              },
              {
                text: 'divider',
                link: '/component/proField/divider',
              },
              {
                text: 'inputTag',
                link: '/component/proField/inputTag',
              },
              {
                text: 'mention',
                link: '/component/proField/mention',
              },
              {
                text: 'selectV2',
                link: '/component/proField/selectV2',
              },
              {
                text: 'timePicker',
                link: '/component/proField/timePicker',
              },
              {
                text: 'timeSelect',
                link: '/component/proField/timeSelect',
              },
              {
                text: 'transfer',
                link: '/component/proField/transfer',
              },
              {
                text: 'treeSelect',
                link: '/component/proField/treeSelect',
              },
              {
                text: 'upload',
                link: '/component/proField/upload',
              },
              {
                text: 'button',
                link: '/component/proField/button',
              },
              {
                text: 'datePicker',
                link: '/component/proField/datePicker',
              },
            ],
          },
          {
            text: 'ProFormField 表单原子组件',
            collapsible: true, // 允许折叠
            collapsed: true, // 默认折叠
            items: [
              {
                text: 'text',
                link: '/component/ProFormField/text',
              },
              {
                text: 'autocomplete',
                link: '/component/ProFormField/autocomplete',
              },
              {
                text: 'inputNumber',
                link: '/component/ProFormField/inputNumber',
              },
              {
                text: 'select',
                link: '/component/ProFormField/select',
              },
              {
                text: 'checkbox',
                link: '/component/ProFormField/checkbox',
              },
              {
                text: 'radio',
                link: '/component/ProFormField/radio',
              },
              {
                text: 'rate',
                link: '/component/ProFormField/rate',
              },
              {
                text: 'slider',
                link: '/component/ProFormField/slider',
              },
              {
                text: 'switch',
                link: '/component/ProFormField/switch',
              },
              {
                text: 'avatar',
                link: '/component/ProFormField/avatar',
              },
              {
                text: 'image',
                link: '/component/ProFormField/image',
              },
              {
                text: 'cascader',
                link: '/component/ProFormField/cascader',
              },
              {
                text: 'colorPicker',
                link: '/component/ProFormField/colorPicker',
              },
              {
                text: 'segmented',
                link: '/component/ProFormField/segmented',
              },
              {
                text: 'divider',
                link: '/component/ProFormField/divider',
              },
              {
                text: 'inputTag',
                link: '/component/ProFormField/inputTag',
              },
              {
                text: 'mention',
                link: '/component/ProFormField/mention',
              },
              {
                text: 'selectV2',
                link: '/component/ProFormField/selectV2',
              },
              {
                text: 'timePicker',
                link: '/component/ProFormField/timePicker',
              },
              {
                text: 'timeSelect',
                link: '/component/ProFormField/timeSelect',
              },
              {
                text: 'transfer',
                link: '/component/ProFormField/transfer',
              },
              {
                text: 'treeSelect',
                link: '/component/ProFormField/treeSelect',
              },
              // {
              //   text: "upload",
              //   link: "/component/ProFormField/upload",
              // },
              {
                text: 'button',
                link: '/component/ProFormField/button',
              },
              {
                text: 'datePicker',
                link: '/component/ProFormField/datePicker',
              },
            ],
          },
          {
            text: 'ProForm 表单组件',
            collapsible: true, // 允许折叠
            collapsed: true, // 默认折叠
            items: [
              {
                text: '基础用法',
                link: '/component/proForm/basic',
              },
              {
                text: '组件间的联动',
                link: '/component/proForm/effects',
              },
            ],
          },
          {
            text: 'ModalForm 弹窗表单组件',
            link: '/component/ModalForm/index',
          },
          {
            text: 'DrawerForm 抽屉表单组件',
            link: '/component/DrawerForm/index',
          },
          {
            text: 'ProInputTag 暂存历史记录',
            link: '/component/ProInputTag/index',
          },
          {
            text: 'ProSelect 组件',
            collapsible: true, // 允许折叠
            collapsed: true, // 默认折叠
            items: [
              {
                text: '基础用法',
                link: '/component/ProSelect/basic',
              },
              {
                text: '瀑布流',
                link: '/component/ProSelect/waterfall',
              },
              {
                text: '表格',
                link: '/component/ProSelect/table',
              },
            ],
          },
          {
            text: 'ProTable 组件',
            collapsible: true, // 允许折叠
            collapsed: true, // 默认折叠
            items: [
              {
                text: 'basic',
                link: '/component/ProTable/basic',
              },
              {
                text: 'toolbar',
                link: '/component/ProTable/toolbar',
              },
              {
                text: 'toolbar-buttons',
                link: '/component/ProTable/toolbar-buttons',
              },
              {
                text: 'toolbar-filters',
                link: '/component/ProTable/toolbar-filters',
              },
              {
                text: 'toolbar-search',
                link: '/component/ProTable/toolbar-search',
              },
              {
                text: 'export',
                link: '/component/ProTable/export',
              },
              {
                text: 'import',
                link: '/component/ProTable/import',
              },
              {
                text: 'editable-only',
                link: '/component/ProTable/editable-only',
              },
              {
                text: 'editable-cell',
                link: '/component/ProTable/editable-cell',
              },
              {
                text: 'editable-single',
                link: '/component/ProTable/editable-single',
              },
              {
                text: 'editable-multiple',
                link: '/component/ProTable/editable-multiple',
              },
              {
                text: 'table-ref',
                link: '/component/ProTable/table-ref',
              },
            ],
          },
        ],
      },
    ];

    const map = wholeList.reduce((acc, curr) => {
      if (curr.text && curr.items) {
        acc[curr.text] = curr.items;
      }
      return acc;
    }, {});

    return map[path] || [];
  },
};
