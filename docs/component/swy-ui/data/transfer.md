# Transfer 穿梭

在两栏中移动元素实现选择

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <SwyTransfer v-model="value" :data="data" :titles="['源列表', '目标列表']" />

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px;">
      <h4 style="margin-top: 0;">已选择</h4>
      <pre style="margin: 0;">{{ value }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([1, 3])

const data = Array.from({ length: 15 }).map((_, index) => ({
  key: index + 1,
  label: `选项 ${index + 1}`,
  disabled: index % 4 === 0,
}))
</script>
```

:::

## 可搜

:::demo

```vue
<template>
  <div>
    <SwyTransfer
      v-model="searchValue"
      :data="searchData"
      filterable
      :filter-placeholder="'请输入关键词'"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const searchValue = ref([])

const searchData = [
  { key: 1, label: 'JavaScript' },
  { key: 2, label: 'TypeScript' },
  { key: 3, label: 'Vue.js' },
  { key: 4, label: 'React' },
  { key: 5, label: 'Angular' },
  { key: 6, label: 'Node.js' },
  { key: 7, label: 'Python' },
  { key: 8, label: 'Java' },
  { key: 9, label: 'Go' },
  { key: 10, label: 'Rust' },
]
</script>
```

:::

## 自定义按钮文

:::demo

```vue
<template>
  <div>
    <SwyTransfer
      v-model="value3"
      :data="data3"
      :button-texts="['移除', '添加']"
      :titles="['待选', '已选']"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value3 = ref([2, 4])

const data3 = [
  { key: 1, label: '北京' },
  { key: 2, label: '上海' },
  { key: 3, label: '广州' },
  { key: 4, label: '深圳' },
  { key: 5, label: '杭州' },
  { key: 6, label: '成都' },
]
</script>
```

:::

## 自定义数据项

:::demo

```vue
<template>
  <div>
    <SwyTransfer v-model="customValue" :data="customData">
      <template #default="{ item }">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 18px;">{{ item.icon }}</span>
          <div>
            <div style="font-weight: 500;">{{ item.label }}</div>
            <div style="font-size: 12px; color: #909399;">{{ item.desc }}</div>
          </div>
        </div>
      </template>
    </SwyTransfer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const customValue = ref([1])

const customData = [
  { key: 1, label: '文档', icon: '📄', desc: '查看文档' },
  { key: 2, label: '图片', icon: '🖼', desc: '查看图片' },
  { key: 3, label: '视频', icon: '🎬', desc: '观看视频' },
  { key: 4, label: '音乐', icon: '🎵', desc: '播放音乐' },
  { key: 5, label: '代码', icon: '💻', desc: '编辑代码' },
]
</script>
```

:::

## API

### Transfer Props

| 参数                 | 说明                    | 类型      | 默认               |
| -------------------- | ----------------------- | --------- | ------------------ |
| modelValue / v-model | 绑定值（已选中的key数组 | `array`   | []                 |
| data                 | 数据                    | `array`   | []                 |
| titles               | 列表标题                | `array`   | ['列表1', '列表2'] |
| buttonTexts          | 按钮文字                | `array`   | []                 |
| filterable           | 是否可搜                | `boolean` | false              |
| filterPlaceholder    | 搜索框占位符            | `string`  | 请输入搜索内       |
| disabled             | 是否禁用                | `boolean` | false              |

### Transfer Events

| 事件               | 说明                     | 参数                            |
| ------------------ | ------------------------ | ------------------------------- |
| change             | 右侧列表元素变化时触     | `(value, direction, movedKeys)` |
| left-check-change  | 左侧列表选中项变化时触发 | `(value, movedKeys)`            |
| right-check-change | 右侧列表选中项变化时触发 | `(value, movedKeys)`            |

### Transfer Slots

| 名称         | 说明             |
| ------------ | ---------------- |
| default      | 自定义数据项的内 |
| left-footer  | 左侧列表底部的内 |
| right-footer | 右侧列表底部的内 |
