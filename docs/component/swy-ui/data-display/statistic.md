# Statistic 统计数值

用于突出显示某个数据。

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; gap: 40px;">
    <SwyStatistic title="今日访问" :value="1234" />
    <SwyStatistic title="新增用户" :value="567" />
    <SwyStatistic title="转化率" :value="89.5" suffix="%" />
  </div>
</template>
```

:::

## 带前缀和后缀

:::demo

```vue
<template>
  <div style="display: flex; gap: 40px; flex-wrap: wrap;">
    <SwyStatistic title="账户余额" :value="9999.99" prefix="¥" :precision="2" />
    <SwyStatistic title="在线用户" :value="5678" suffix="人" />
    <SwyStatistic title="增长率" :value="15.8" suffix="%" prefix="+" />
    <SwyStatistic title="下载量" :value="1234567" suffix="次" />
  </div>
</template>
```

:::

## 自定义样式

:::demo

```vue
<template>
  <div style="display: flex; gap: 40px;">
    <SwyStatistic
      title="今日销售额"
      :value="88888.88"
      prefix="¥"
      :precision="2"
      :value-style="{ color: '#cf1322', fontSize: '28px', fontWeight: 'bold' }"
    />

    <SwyStatistic
      title="订单数量"
      :value="2345"
      :value-style="{ color: '#3f8600', fontSize: '28px' }"
    />

    <SwyStatistic
      title="待处理"
      :value="56"
      :value-style="{ color: '#faad14', fontSize: '28px' }"
    />
  </div>
</template>
```

:::

## 数值动画

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 30px;">
    <div style="display: flex; gap: 40px;">
      <SwyStatistic
        title="访问量"
        :value="count"
        :value-style="{ color: '#409eff', fontSize: '32px' }"
      />

      <SwyStatistic
        title="收益"
        :value="revenue"
        prefix="¥"
        :precision="2"
        :value-style="{ color: '#67c23a', fontSize: '32px' }"
      />
    </div>

    <div>
      <SwyButton type="primary" @click="startCount">开始动画</SwyButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const count = ref(0)
const revenue = ref(0)

const startCount = () => {
  count.value = 0
  revenue.value = 0

  const countInterval = setInterval(() => {
    if (count.value < 8888) {
      count.value += 123
    } else {
      clearInterval(countInterval)
      count.value = 8888
    }
  }, 50)

  const revenueInterval = setInterval(() => {
    if (revenue.value < 12345.67) {
      revenue.value += 200
    } else {
      clearInterval(revenueInterval)
      revenue.value = 12345.67
    }
  }, 50)
}
</script>
```

:::

## 卡片样式

:::demo

```vue
<template>
  <div
    style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;"
  >
    <div
      style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; color: white;"
    >
      <SwyStatistic
        title="总销售额"
        :value="234567.89"
        prefix="¥"
        :precision="2"
        :title-style="{ color: 'rgba(255,255,255,0.85)' }"
        :value-style="{ color: 'white', fontSize: '28px', fontWeight: 'bold' }"
      />
    </div>

    <div
      style="padding: 20px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 8px; color: white;"
    >
      <SwyStatistic
        title="新增订单"
        :value="3456"
        suffix="单"
        :title-style="{ color: 'rgba(255,255,255,0.85)' }"
        :value-style="{ color: 'white', fontSize: '28px', fontWeight: 'bold' }"
      />
    </div>

    <div
      style="padding: 20px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 8px; color: white;"
    >
      <SwyStatistic
        title="活跃用户"
        :value="12890"
        suffix="人"
        :title-style="{ color: 'rgba(255,255,255,0.85)' }"
        :value-style="{ color: 'white', fontSize: '28px', fontWeight: 'bold' }"
      />
    </div>

    <div
      style="padding: 20px; background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); border-radius: 8px; color: white;"
    >
      <SwyStatistic
        title="转化率"
        :value="68.5"
        suffix="%"
        :precision="1"
        :title-style="{ color: 'rgba(255,255,255,0.85)' }"
        :value-style="{ color: 'white', fontSize: '28px', fontWeight: 'bold' }"
      />
    </div>
  </div>
</template>
```

:::

## API

### Statistic Props

| 参数             | 说明         | 类型     | 默认值 |
| ---------------- | ------------ | -------- | ------ |
| value            | 数值内容     | `number` | 0      |
| title            | 标题         | `string` | —      |
| precision        | 数值精度     | `number` | 0      |
| prefix           | 前缀         | `string` | —      |
| suffix           | 后缀         | `string` | —      |
| valueStyle       | 数值样式     | `object` | —      |
| titleStyle       | 标题样式     | `object` | —      |
| groupSeparator   | 千分位分隔符 | `string` | ,      |
| decimalSeparator | 小数点       | `string` | .      |

### Statistic Slots

| 名称   | 说明       |
| ------ | ---------- |
| title  | 自定义标题 |
| prefix | 自定义前缀 |
| suffix | 自定义后缀 |
