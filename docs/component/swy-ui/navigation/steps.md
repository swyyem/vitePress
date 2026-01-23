# Steps 步骤

引导用户按照流程完成任务的分步导航条

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 30px;">
    <SwySteps :active="active">
      <SwyStep title="步骤1" description="这是步骤1的描述" />
      <SwyStep title="步骤2" description="这是步骤2的描述" />
      <SwyStep title="步骤3" description="这是步骤3的描述" />
      <SwyStep title="步骤4" description="这是步骤4的描述" />
    </SwySteps>

    <div style="display: flex; gap: 10px;">
      <SwyButton @click="prev" :disabled="active === 0">上一</SwyButton>
      <SwyButton type="primary" @click="next" :disabled="active === 3">下一</SwyButton>
    </div>

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px;">
      当前步骤：{{ active + 1 }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)

const next = () => {
  if (active.value < 3) active.value++
}

const prev = () => {
  if (active.value > 0) active.value--
}
</script>
```

:::

## 带图标的步骤

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 30px;">
    <SwySteps :active="activeIcon">
      <SwyStep title="登录账号" icon="👤" />
      <SwyStep title="完善信息" icon="📝" />
      <SwyStep title="上传资料" icon="📁" />
      <SwyStep title="等待审核" icon="⏱️" />
    </SwySteps>

    <div style="display: flex; gap: 10px;">
      <SwyButton @click="activeIcon = 0">重置</SwyButton>
      <SwyButton type="primary" @click="activeIcon++">下一</SwyButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIcon = ref(1)
</script>
```

:::

## 竖向步骤

:::demo

```vue
<template>
  <div style="display: flex; gap: 40px;">
    <SwySteps :active="verticalActive" direction="vertical" style="width: 300px;">
      <SwyStep title="创建项目" description="2024-01-01 12:00" />
      <SwyStep title="设计阶段" description="2024-01-05 14:30" />
      <SwyStep title="开发阶段" description="2024-01-15 09:00" />
      <SwyStep title="测试阶段" description="预计 2024-02-01" />
      <SwyStep title="上线发布" description="预计 2024-02-10" />
    </SwySteps>

    <div style="flex: 1;">
      <div style="padding: 20px; background: #f5f7fa; border-radius: 4px;">
        <h4 style="margin-top: 0;">
          当前阶段：{{
            ['创建项目', '设计阶段', '开发阶段', '测试阶段', '上线发布'][verticalActive]
          }}
        </h4>
        <SwyButton type="primary" @click="verticalActive = (verticalActive + 1) % 5">
          下一阶段
        </SwyButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const verticalActive = ref(2)
</script>
```

:::

## 简洁风格

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 30px;">
    <SwySteps :active="simpleActive" simple>
      <SwyStep title="填写信息" />
      <SwyStep title="确认信息" />
      <SwyStep title="完成" />
    </SwySteps>

    <div style="text-align: center;">
      <SwyButton @click="simpleActive = (simpleActive + 1) % 3">切换步骤</SwyButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const simpleActive = ref(0)
</script>
```

:::

## 步骤状态

:::demo

```vue
<template>
  <div>
    <SwySteps :active="1" process-status="success" finish-status="success">
      <SwyStep title="已完成" />
      <SwyStep title="进行中" />
      <SwyStep title="未开始" />
      <SwyStep title="未开始" />
    </SwySteps>

    <SwySteps :active="2" process-status="error" style="margin-top: 30px;">
      <SwyStep title="已完成" />
      <SwyStep title="已完成" />
      <SwyStep title="失败" />
      <SwyStep title="未开始" />
    </SwySteps>
  </div>
</template>
```

:::

## API

### Steps Props

| 参数          | 说明               | 类型                                        | 默认值     |
| ------------- | ------------------ | ------------------------------------------- | ---------- |
| active        | 当前激活步骤的索引 | `number`                                    | 0          |
| direction     | 显示方向           | `horizontal / vertical`                     | horizontal |
| simple        | 是否应用简洁风格   | `boolean`                                   | false      |
| processStatus | 当前步骤的状态     | `wait / process / finish / error / success` | process    |
| finishStatus  | 已完成步骤的状态   | `wait / process / finish / error / success` | finish     |
| alignCenter   | 居中对齐           | `boolean`                                   | false      |

### Step Props

| 参数        | 说明           | 类型                                        | 默认值 |
| ----------- | -------------- | ------------------------------------------- | ------ |
| title       | 标题           | `string`                                    | —      |
| description | 描述性文本     | `string`                                    | —      |
| icon        | 图标           | `string`                                    | —      |
| status      | 当前步骤的状态 | `wait / process / finish / error / success` | —      |
