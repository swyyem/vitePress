# 表单增强组件

## InputNumber 数字输入框

### 基础用法

:::demo

```vue
<template>
  <SwyInputNumber v-model="value" :min="1" :max="10" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(1)
</script>
```

:::

### 步长

:::demo

```vue
<template>
  <SwyInputNumber v-model="value" :step="2" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(0)
</script>
```

:::

### 精度

:::demo

```vue
<template>
  <SwyInputNumber v-model="value" :precision="2" :step="0.1" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(1)
</script>
```

:::

### 不同尺寸

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <SwyInputNumber v-model="value" size="large" />
    <SwyInputNumber v-model="value" />
    <SwyInputNumber v-model="value" size="small" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(1)
</script>
```

:::

### 按钮位置

:::demo

```vue
<template>
  <SwyInputNumber v-model="value" controls-position="right" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(1)
</script>
```

:::

---

## Rate 评分

### 基础用法

:::demo

```vue
<template>
  <SwyRate v-model="value" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(0)
</script>
```

:::

### 显示分数

:::demo

```vue
<template>
  <SwyRate v-model="value" show-text />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(3)
</script>
```

:::

### 只读

:::demo

```vue
<template>
  <SwyRate v-model="value" disabled />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(4)
</script>
```

:::

### 自定义星星数量

:::demo

```vue
<template>
  <SwyRate v-model="value" :max="10" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(7)
</script>
```

:::

---

## Slider 滑块

### 基础用法

:::demo

```vue
<template>
  <div style="padding: 20px 0;">
    <SwySlider v-model="value" />
    <div style="margin-top: 16px;">当前值：{{ value }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(50)
</script>
```

:::

### 离散值

:::demo

```vue
<template>
  <div style="padding: 20px 0;">
    <SwySlider v-model="value" :step="10" />
    <div style="margin-top: 16px;">当前值：{{ value }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(20)
</script>
```

:::

### 自定义范围

:::demo

```vue
<template>
  <div style="padding: 20px 0;">
    <SwySlider v-model="value" :min="10" :max="200" />
    <div style="margin-top: 16px;">当前值：{{ value }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(100)
</script>
```

:::

### 禁用状态

:::demo

```vue
<template>
  <div style="padding: 20px 0;">
    <SwySlider v-model="value" disabled />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(60)
</script>
```

:::
