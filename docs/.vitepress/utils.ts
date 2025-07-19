
interface MenuItem {
  text: string;
  items?: MenuItem[];
  link?: string;
  collapsed?: boolean;
  collapsible?: boolean;
}

interface CategoryMap {
  [key: string]: MenuItem[];
}

export default {
  getSideBar(path) {
    const wholeList: MenuItem[] = [
      {
        text: "front",
        items: [
          {
            text: "前端工程化",
            items: [
              {
                text: "前端规范搭建",
                link: "/front/engi/rule/",
              },
              {
                text: "Monorepo理论与实践",
                link: "/front/engi/monorepo/",
              },
              {
                text: "前端常见性能优化方案",
                link: "/front/base/performance/",
              },
              {
                text: "前端资源部署策略",
                link: "/front/engi/deploy/",
              },

              {
                text: "微前端架构浅析",
                link: "/front/engi/microFront/",
              },
              {
                text: "前端视角看CICD",
                link: "/front/engi/CICD/",
              },
            ],
          },
          {
            text: "前端基础",
            items: [
              {
                text: "前端最全Debugger技巧",
                link: "/front/base/debugger/",
              },
              {
                text: "从前端视角看AI世界",
                link: "/front/base/Ai/",
              },
              {
                text: "Vue2源码之响应式及队列调度",
                link: "/front/source/vue2/reactive/",
              },
              {
                text: "TS入门及实践",
                link: "/front/base/TS/",
              },
              {
                text: "前端常用设计模式",
                link: "/front/base/designMode/",
              },
              {
                text: "Redux入门及实践",
                link: "/front/base/react/redux/",
              },
              {
                text: "10分钟搭建一个属于自己的博客",
                link: "/front/practice/blog/",
              },
              {
                text: "做过的算法题合集",
                link: "/front/base/algorithm/",
              },
            ],
          },
          {
            text: "Uniapp跨端开发",
            items: [
              {
                text: "包体积优化",
                link: "/front/mini/packageSize/",
              },
              {
                text: "自定义编译变量及环境变量",
                link: "/front/mini/var/",
              },
              {
                text: "Uniapp对接微信原生SDK",
                link: "/front/mini/thirdSDK/",
              },
              {
                text: "Uniapp开发App入门与实践",
                link: "/front/mini/app/",
              },
              {
                text: "App上架各应用市场攻略",
                link: "/front/mini/publish",
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
        text: "back",
        items: [
          {
            text: "后端基础",
            items: [
              {
                text: "论全干工程师的自我修养",
                link: "/back/framework/chooseFrameWork/",
              },
              {
                text: "浅析后端三层架构",
                link: "/back/framework/structure/",
              },

              {
                text: "Nest入门与实践",
                link: "/back/framework/nest/",
              },
              {
                text: "Redis入门与实践",
                link: "/back/framework/redis/",
              },
              {
                text: "关系型数据与非关系型数据库",
                link: "/back/framework/database",
              },
              {
                text: "MySql入门与实践",
                link: "/back/framework/mysql",
              },
            ],
          },
        ],
      },
      {
        text: "others",
        items: [
          {
            text: "常用操作指令",
            items: [
              {
                text: "Git",
                link: "/others/operation/git/",
              },
              {
                text: "MarkDown",
                link: "/others/operation/md/",
              },
              {
                text: "Linux",
                link: "/others/operation/linux/",
              },
            ],
          },
          {
            text: "网络与运维",
            items: [
              {
                text: "Nginx",
                link: "/others/maintain/ng/",
              },
              {
                text: "Docker",
                link: "/others/maintain/docker/",
              },
              {
                text: "Jenkins",
                link: "/others/maintain/jenkins/",
              },
              {
                text: "浅析浏览器缓存",
                link: "/others/maintain/cache/",
              },
            ],
          },
        ],
      },
      {
        text: "Markdown",
        items: [
          {
            text: "Markdown 语法",
            items: [
              {
                text: "表格",
                link: "/Markdown/components/table",
              },
              {
                text: "目录",
                link: "/Markdown/components/mulu",
              },
              {
                text: "容器",
                link: "/Markdown/components/rongqi",
              },
              {
                text: "字体样式",
                link: "/Markdown/components/ziti",
              },
              {
                text: "支持的表情",
                link: "/Markdown/components/emoji",
              },
              {
                text: "代码块",
                link: "/Markdown/components/daima",
              },
              {
                text: "组件",
                link: "/Markdown/components/zujian",
              },
            ],
          },
        ],
      },
      {
        text: "api",
        items: [
          {
            text: "组建的演示方法",
            items: [
              {
                text: "使用标签的写法",
                link: "/api/label",
              },
              {
                text: "使用相对路径的写法",
                link: "/api/path",
              },
              {
                text: "注册方法",
                link: "/api/functions",
              },
            ],
          },
        ],
      },
      {
        text: "component",
        items: [
          {
            text: "ProField 原子组件",
            collapsible: true, // 允许折叠
            collapsed: true,    // 默认折叠
            items: [
              {
                text: "text",
                link: "/component/proField/text",
              },
              {
                text: "autocomplete",
                link: "/component/proField/autocomplete",
              },
              {
                text: "inputNumber",
                link: "/component/proField/inputNumber",
              },
              {
                text: "select",
                link: "/component/proField/select",
              },
              {
                text: "checkbox",
                link: "/component/proField/checkbox",
              },
              {
                text: "price",
                link: "/component/proField/price",
              },
              {
                text: "radio",
                link: "/component/proField/radio",
              },
              {
                text: "rate",
                link: "/component/proField/rate",
              },
              {
                text: "slider",
                link: "/component/proField/slider",
              },
              {
                text: "switch",
                link: "/component/proField/switch",
              },
              {
                text: "avatar",
                link: "/component/proField/avatar",
              },
              {
                text: "image",
                link: "/component/proField/image",
              },
              {
                text: "cascader",
                link: "/component/proField/cascader",
              },
              {
                text: "colorPicker",
                link: "/component/proField/colorPicker",
              },
              {
                text: "segmented",
                link: "/component/proField/segmented",
              },
              {
                text: "divider",
                link: "/component/proField/divider",
              },
              {
                text: "inputTag",
                link: "/component/proField/inputTag",
              },
              {
                text: "mention",
                link: "/component/proField/mention",
              },
              {
                text: "selectV2",
                link: "/component/proField/selectV2",
              },
              {
                text: "timePicker",
                link: "/component/proField/timePicker",
              },
              {
                text: "timeSelect",
                link: "/component/proField/timeSelect",
              },
              {
                text: "transfer",
                link: "/component/proField/transfer",
              },
              {
                text: "treeSelect",
                link: "/component/proField/treeSelect",
              },
              {
                text: "upload",
                link: "/component/proField/upload",
              },
              {
                text: "button",
                link: "/component/proField/button",
              },
              {
                text: "datePicker",
                link: "/component/proField/datePicker",
              },
            ],
          },
        ],
      },
    ];

    const map: CategoryMap = wholeList.reduce((acc, curr) => {
      if (curr.text && curr.items) {
        acc[curr.text] = curr.items;
      }
      return acc;
    }, {} as CategoryMap);
    return map[path] || [];
  },
};

