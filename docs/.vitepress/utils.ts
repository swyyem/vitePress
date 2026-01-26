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

type CategoryMap = Record<string, MenuItem[]>
interface MenuItem {
  text: string
  items?: MenuItem[]
  link?: string
  collapsed?: boolean
  collapsible?: boolean
}

const wholeList: MenuItem[] = [
  {
    text: 'meinv',
    items: [
      {
        text: '宝宝',
        collapsible: true,
        collapsed: false, // 默认展开
        items: [
          {
            text: '护肤',
            collapsible: true,
            collapsed: false, // 默认展开
            link: '/meinv/hufu/',
          },
          {
            text: '护肤1',
            collapsible: true,
            collapsed: false, // 默认展开
            link: '/meinv/hufu1/',
          },
        ],
      },
    ],
  },
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
          {
            text: '数据类型转换',
            link: '/front/interview/transfer-type',
          },
          {
            text: '原型和原型链',
            link: '/front/interview/prototypeand-prototype-chain',
          },
          {
            text: 'call /apply /bind',
            link: '/front/interview/call-apply-bind',
          },
          {
            text: 'DOM 事件流和事件委托详解',
            link: '/front/interview/event-stream',
          },
          {
            text: 'new 操作符内部原理详解',
            link: '/front/interview/new-operator',
          },
          {
            text: '防抖、节流的应用场景',
            link: '/front/interview/Anti-vibration-throttling',
          },
          {
            text: 'this指向',
            link: '/front/interview/this',
          },
          {
            text: 'let const var 的区别',
            link: '/front/interview/let-const',
          },
          {
            text: 'Promise 的理解',
            link: '/front/interview/promiss',
          },
          {
            text: 'Promise 为什么支持链式调用',
            link: '/front/interview/promiss-lian',
          },
          {
            text: 'Javascript的运行机制',
            link: '/front/interview/javascript-yunxingjizhi',
          },
          {
            text: '实现继承的几种方式',
            link: '/front/interview/extends',
          },
          {
            text: '浏览器垃圾回收',
            link: '/front/interview/lese',
          },
          {
            text: '多人开发 避免版本冲突',
            link: '/front/interview/kaifa-chongtu',
          },
          {
            text: 'Git 常用命令',
            link: '/front/interview/git-changyong',
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
    text: 'SwyUI',
    collapsible: true, // 允许折叠
    collapsed: true, // 默认折叠
    items: [
      {
        text: '基础组件',
        collapsible: true, // 允许折叠
        collapsed: true, // 默认折叠
        items: [
          {
            text: 'Button 按钮',
            link: '/component/swy-ui/jichu/button',
          },
          {
            text: 'Link 链接',
            link: '/component/swy-ui/jichu/link',
          },
          {
            text: 'Text 文本',
            link: '/component/swy-ui/jichu/text',
          },
          {
            text: 'Icon 图标',
            link: '/component/swy-ui/jichu/icon',
          },
          {
            text: 'Card 卡片',
            link: '/component/swy-ui/jichu/card',
          },
          {
            text: 'Avatar 头像',
            link: '/component/swy-ui/jichu/avatar',
          },
          {
            text: 'Alert 提示',
            link: '/component/swy-ui/jichu/alert',
          },
          {
            text: 'Tag 标签',
            link: '/component/swy-ui/jichu/tag',
          },
        ],
      },
      {
        text: '导航类组件',
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: 'Tabs 标签页',
            link: '/component/swy-ui/navigation/tabs',
          },
          {
            text: 'Breadcrumb 面包屑',
            link: '/component/swy-ui/navigation/breadcrumb',
          },
          {
            text: 'Pagination 分页',
            link: '/component/swy-ui/navigation/pagination',
          },
          {
            text: 'Steps 步骤条',
            link: '/component/swy-ui/navigation/steps',
          },
          {
            text: 'Backtop 回到顶部',
            link: '/component/swy-ui/navigation/backtop',
          },
          {
            text: 'PageHeader 页头',
            link: '/component/swy-ui/navigation/page-header',
          },
          {
            text: 'Anchor 锚点',
            link: '/component/swy-ui/navigation/anchor',
          },
        ],
      },
      {
        text: '布局类组件',
        collapsible: true, // 允许折叠
        collapsed: true, // 默认折叠
        items: [
          {
            text: 'Container 容器布局',
            link: '/component/swy-ui/layout/',
          },
          {
            text: 'Row / Col 栅格布局',
            link: '/component/swy-ui/layout/row-col',
          },
          {
            text: 'Space 间距',
            link: '/component/swy-ui/layout/space',
          },
          {
            text: 'Scrollbar 滚动条',
            link: '/component/swy-ui/layout/scrollbar',
          },
          {
            text: 'Splitter 分割面板',
            link: '/component/swy-ui/layout/splitter',
          },
        ],
      },
      {
        text: '表单增强类组件',
        collapsible: true, // 允许折叠
        collapsed: true, // 默认折叠
        items: [
          {
            text: 'InputNumber 数字输入框',
            link: '/component/swy-ui/form/input-number',
          },
          {
            text: 'Rate 评分',
            link: '/component/swy-ui/form/rate',
          },
          {
            text: 'Slider 滑块',
            link: '/component/swy-ui/form/slider',
          },
        ],
      },
      {
        text: '数据展示类组件',
        collapsible: true, // 允许折叠
        collapsed: true, // 默认折叠
        items: [
          {
            text: 'Image / Descriptions',
            link: '/component/swy-ui/data/',
          },
          {
            text: 'Table / Tree / Collapse / Carousel',
            link: '/component/swy-ui/data-display/',
          },
          {
            text: 'Transfer 穿梭框',
            link: '/component/swy-ui/data/transfer',
          },
          {
            text: 'Timeline 时间线',
            link: '/component/swy-ui/data-display/timeline',
          },
          {
            text: 'Calendar 日历',
            link: '/component/swy-ui/data-display/calendar',
          },
          {
            text: 'Statistic 统计数值',
            link: '/component/swy-ui/data-display/statistic',
          },
          {
            text: 'Segmented 分段控制器',
            link: '/component/swy-ui/data/segmented',
          },
        ],
      },
      {
        text: '反馈类组件',
        collapsible: true, // 允许折叠
        collapsed: true, // 默认折叠
        items: [
          {
            text: 'Empty / Progress / Result / Skeleton',
            link: '/component/swy-ui/feedback/',
          },
          {
            text: 'Tooltip / Popover / Notification / Loading',
            link: '/component/swy-ui/feedback-interaction/',
          },
          {
            text: 'Tour 漫游式引导',
            link: '/component/swy-ui/feedback/tour',
          },
        ],
      },
      {
        text: '其他组件',
        collapsible: true,
        collapsed: true,
        items: [
          {
            text: 'Affix 固钉',
            link: '/component/swy-ui/others/affix',
          },
        ],
      },
      {
        text: '新增组件总览',
        collapsible: true,
        collapsed: false,
        items: [
          {
            text: '📦 新增组件展示 (33个)',
            link: '/component/swy-ui/new-components',
          },
        ],
      },
      {
        text: '表单组件',
        collapsible: true, // 允许折叠
        collapsed: false, // 默认展开
        items: [
          {
            text: 'ProField 原子组件',
            link: '/component/swy-ui/form/profield',
          },
          {
            text: 'Checkbox 复选框',
            link: '/component/swy-ui/form/checkbox',
          },
          {
            text: 'Select 选择器',
            link: '/component/swy-ui/form/select',
          },
          {
            text: 'Switch 开关',
            link: '/component/swy-ui/form/switch',
          },
          {
            text: 'DatePicker 日期选择器',
            link: '/component/swy-ui/form/date-picker',
          },
          {
            text: 'TimePicker 时间选择器',
            link: '/component/swy-ui/form/time-picker',
          },
          {
            text: 'TimeSelect 时间选择',
            link: '/component/swy-ui/form/time-select',
          },
          {
            text: 'Upload 文件上传',
            link: '/component/swy-ui/form/upload',
          },
          {
            text: 'Cascader 级联选择器',
            link: '/component/swy-ui/form/cascader',
          },
          {
            text: 'TreeSelect 树形选择',
            link: '/component/swy-ui/form/tree-select',
          },
          {
            text: 'Autocomplete 自动完成',
            link: '/component/swy-ui/form/autocomplete',
          },
          {
            text: 'ColorPicker 颜色选择器',
            link: '/component/swy-ui/form/color-picker',
          },
          {
            text: '表单综合示例',
            link: '/component/swy-ui/form/example',
          },
        ],
      },
    ],
  },
  {
    text: 'AILargeModel',
    items: [
      {
        text: 'AI大模型基本原理及API使用',
        collapsible: true, // 允许折叠
        collapsed: true, // 默认折叠
        link: '/AILargeModel/jibenyuanli',
      },
      {
        text: 'RAG 大模型',
        collapsible: true, // 允许折叠
        collapsed: true, // 默认折叠
        link: '/AILargeModel/RAG',
      },
      {
        text: 'Embedding 模型',
        collapsible: true, // 允许折叠
        collapsed: true, // 默认折叠
        link: '/AILargeModel/Embedding',
      },
    ],
  },
  {
    text: 'python',
    items: [
      {
        text: '基础语法结构',
        collapsible: true, // 允许折叠
        collapsed: true, // 默认折叠
        link: '/python/basic',
      },
      {
        text: '面向对象编程',
        collapsible: true, // 允许折叠
        collapsed: true, // 默认折叠
        link: '/python/class',
      },
      {
        text: '异常处理',
        collapsible: true, // 允许折叠
        collapsed: true, // 默认折叠
        link: '/python/error',
      },
      {
        text: '函数定义与使用',
        collapsible: true, // 允许折叠
        collapsed: true, // 默认折叠
        link: '/python/function',
      },
      {
        text: '上下文管理（with语句）',
        collapsible: true, // 允许折叠
        collapsed: true, // 默认折叠
        link: '/python/with',
      },
      {
        text: 'Python 核心工具箱',
        collapsible: true, // 允许折叠
        collapsed: true, // 默认折叠
        link: '/python/toolbox',
      },
      {
        text: 'Python 实用工具库',
        collapsible: true, // 允许折叠
        collapsed: true, // 默认折叠
        link: '/python/toollibrary',
      },
      {
        text: '学习路径建议',
        collapsible: true, // 允许折叠
        collapsed: true, // 默认折叠
        link: '/python/student',
      },
    ],
  },
]

export default {
  getSideBar(path: string) {
    const map = wholeList.reduce((acc: CategoryMap, curr) => {
      if (curr.text && curr.items) {
        acc[curr.text] = curr.items
      }
      return acc
    }, {})

    return map[path] || []
  },
}
