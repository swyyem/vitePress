# Anchor 锚点

用于跳转到页面指定位置

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; gap: 20px;">
    <div style="width: 200px;">
      <SwyAnchor>
        <SwyAnchorLink href="#section1" title="第一部分" />
        <SwyAnchorLink href="#section2" title="第二部分" />
        <SwyAnchorLink href="#section3" title="第三部分" />
      </SwyAnchor>
    </div>

    <div
      style="flex: 1; height: 400px; overflow: auto; border: 1px solid #dcdfe6; border-radius: 4px; padding: 20px;"
      id="anchor-container"
    >
      <div id="section1" style="margin-bottom: 40px;">
        <h3>第一部分</h3>
        <p v-for="i in 10" :key="i">第一部分的内容...</p>
      </div>

      <div id="section2" style="margin-bottom: 40px;">
        <h3>第二部分</h3>
        <p v-for="i in 10" :key="i">第二部分的内容...</p>
      </div>

      <div id="section3" style="margin-bottom: 40px;">
        <h3>第三部分</h3>
        <p v-for="i in 10" :key="i">第三部分的内容...</p>
      </div>
    </div>
  </div>
</template>
```

:::

## 嵌套锚点

:::demo

```vue
<template>
  <div style="display: flex; gap: 20px;">
    <div style="width: 200px;">
      <SwyAnchor>
        <SwyAnchorLink href="#api" title="API">
          <SwyAnchorLink href="#props" title="Props" />
          <SwyAnchorLink href="#events" title="Events" />
          <SwyAnchorLink href="#slots" title="Slots" />
        </SwyAnchorLink>
        <SwyAnchorLink href="#examples" title="示例">
          <SwyAnchorLink href="#basic" title="基础用法" />
          <SwyAnchorLink href="#advanced" title="高级用法" />
        </SwyAnchorLink>
      </SwyAnchor>
    </div>

    <div
      style="flex: 1; height: 500px; overflow: auto; border: 1px solid #dcdfe6; border-radius: 4px; padding: 20px;"
    >
      <div id="api" style="margin-bottom: 30px;">
        <h2>API</h2>

        <div id="props" style="margin: 20px 0;">
          <h3>Props</h3>
          <p v-for="i in 5" :key="i">Props 相关内容...</p>
        </div>

        <div id="events" style="margin: 20px 0;">
          <h3>Events</h3>
          <p v-for="i in 5" :key="i">Events 相关内容...</p>
        </div>

        <div id="slots" style="margin: 20px 0;">
          <h3>Slots</h3>
          <p v-for="i in 5" :key="i">Slots 相关内容...</p>
        </div>
      </div>

      <div id="examples" style="margin-bottom: 30px;">
        <h2>示例</h2>

        <div id="basic" style="margin: 20px 0;">
          <h3>基础用法</h3>
          <p v-for="i in 5" :key="i">基础用法示例...</p>
        </div>

        <div id="advanced" style="margin: 20px 0;">
          <h3>高级用法</h3>
          <p v-for="i in 5" :key="i">高级用法示例...</p>
        </div>
      </div>
    </div>
  </div>
</template>
```

:::

## 自定义样式

:::demo

```vue
<template>
  <div style="display: flex; gap: 20px;">
    <SwyAnchor
      :offset-top="60"
      style="width: 200px; padding: 20px; background: #f5f7fa; border-radius: 8px;"
    >
      <SwyAnchorLink href="#intro" title="📖 简介" />
      <SwyAnchorLink href="#features" title="✨ 特性" />
      <SwyAnchorLink href="#install" title="📦 安装" />
      <SwyAnchorLink href="#usage" title="🚀 使用" />
    </SwyAnchor>

    <div
      style="flex: 1; height: 400px; overflow: auto; border: 1px solid #dcdfe6; border-radius: 4px; padding: 20px;"
    >
      <div id="intro" style="margin-bottom: 30px;">
        <h3>📖 简介</h3>
        <p v-for="i in 8" :key="i">组件简介内容...</p>
      </div>

      <div id="features" style="margin-bottom: 30px;">
        <h3>✨ 特性</h3>
        <p v-for="i in 8" :key="i">组件特性介绍...</p>
      </div>

      <div id="install" style="margin-bottom: 30px;">
        <h3>📦 安装</h3>
        <p v-for="i in 8" :key="i">安装说明...</p>
      </div>

      <div id="usage" style="margin-bottom: 30px;">
        <h3>🚀 使用</h3>
        <p v-for="i in 8" :key="i">使用指南...</p>
      </div>
    </div>
  </div>
</template>
```

:::

## API

### Anchor Props

| 参数      | 说明                             | 类型                   | 默认值 |
| --------- | -------------------------------- | ---------------------- | ------ |
| container | 滚动容器                         | `string / HTMLElement` | window |
| offsetTop | 距离窗口顶部达到指定偏移量后触发 | `number`               | 0      |
| bounds    | 锚点区域边界                     | `number`               | 5      |

### Anchor Events

| 事件名 | 说明               | 参数                        |
| ------ | ------------------ | --------------------------- |
| change | 锚点链接改变时触发 | `(href: string)`            |
| click  | 点击锚点链接时触发 | `(event: MouseEvent, link)` |

### AnchorLink Props

| 参数  | 说明     | 类型     | 默认值 |
| ----- | -------- | -------- | ------ |
| href  | 锚点链接 | `string` | —      |
| title | 文字内容 | `string` | —      |
