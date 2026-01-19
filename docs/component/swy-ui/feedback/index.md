# 反馈类组件

## Empty 空状态

### 基础用法

:::demo

```vue
<template>
  <SwyEmpty description="暂无数据" />
</template>
```

:::

### 自定义图片

:::demo

```vue
<template>
  <SwyEmpty
    image="https://cdn-icons-png.flaticon.com/512/7486/7486754.png"
    description="没有找到相关内容"
  />
</template>
```

:::

### 自定义尺寸

:::demo

```vue
<template>
  <SwyEmpty :image-size="200" description="空空如也" />
</template>
```

:::

### 底部内容

:::demo

```vue
<template>
  <SwyEmpty description="暂无数据">
    <SwyButton type="primary">创建新数据</SwyButton>
  </SwyEmpty>
</template>
```

:::

---

## Progress 进度条

### 基础用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <SwyProgress :percentage="0" />
    <SwyProgress :percentage="50" />
    <SwyProgress :percentage="100" />
  </div>
</template>
```

:::

### 进度条状态

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <SwyProgress :percentage="100" status="success" />
    <SwyProgress :percentage="70" status="warning" />
    <SwyProgress :percentage="50" status="exception" />
  </div>
</template>
```

:::

### 自定义颜色

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <SwyProgress :percentage="70" color="#409eff" />
    <SwyProgress :percentage="80" color="#67c23a" />
    <SwyProgress :percentage="90" color="#e6a23c" />
  </div>
</template>
```

:::

### 不显示文字

:::demo

```vue
<template>
  <SwyProgress :percentage="60" :show-text="false" />
</template>
```

:::

---

## Result 结果页

### 基础用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 32px;">
    <SwyResult type="success" title="操作成功" subTitle="您的请求已经成功处理" />
    <SwyResult type="warning" title="警告提示" subTitle="请注意相关风险" />
    <SwyResult type="info" title="信息提示" subTitle="这是一条提示信息" />
    <SwyResult type="error" title="操作失败" subTitle="请稍后重试" />
  </div>
</template>
```

:::

### 带操作按钮

:::demo

```vue
<template>
  <SwyResult type="success" title="支付成功" subTitle="订单已生成，请等待发货">
    <template #extra>
      <div style="display: flex; gap: 12px; justify-content: center;">
        <SwyButton>查看订单</SwyButton>
        <SwyButton type="primary">返回首页</SwyButton>
      </div>
    </template>
  </SwyResult>
</template>
```

:::

---

## Skeleton 骨架屏

### 基础用法

:::demo

```vue
<template>
  <SwySkeleton />
</template>
```

:::

### 动画效果

:::demo

```vue
<template>
  <SwySkeleton animated />
</template>
```

:::

### 自定义行数

:::demo

```vue
<template>
  <SwySkeleton :rows="5" animated />
</template>
```

:::

### 加载完成

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <SwyButton @click="loading = !loading">切换加载状态</SwyButton>
    <SwySkeleton :loading="loading" animated>
      <SwyCard>
        <template #header>
          <div>文章标题</div>
        </template>
        <div>这是文章的内容，加载完成后显示真实内容。</div>
      </SwyCard>
    </SwySkeleton>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const loading = ref(true)
</script>
```

:::

---

## Message 消息提示

### 基础用法

:::demo

```vue
<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <SwyButton @click="showMessage('info')">信息消息</SwyButton>
    <SwyButton @click="showMessage('success')">成功消息</SwyButton>
    <SwyButton @click="showMessage('warning')">警告消息</SwyButton>
    <SwyButton @click="showMessage('error')">错误消息</SwyButton>
  </div>
  <SwyMessage v-if="visible" :type="type" :message="message" @close="visible = false" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
const type = ref('info')
const message = ref('')

const showMessage = (msgType: string) => {
  type.value = msgType
  message.value = `这是一条${msgType}消息`
  visible.value = true
}
</script>
```

:::

### 可关闭的消息

:::demo

```vue
<template>
  <SwyButton @click="visible = true">显示可关闭消息</SwyButton>
  <SwyMessage
    v-if="visible"
    type="success"
    message="这条消息可以手动关闭"
    :duration="0"
    show-close
    @close="visible = false"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
```

:::

---

## Dialog 对话框

### 基础用法

:::demo

```vue
<template>
  <SwyButton @click="dialogVisible = true">打开 Dialog</SwyButton>
  <SwyDialog v-model="dialogVisible" title="提示" width="30%">
    <p>这是一段内容</p>
    <p>这是一段内容</p>
    <template #footer>
      <SwyButton @click="dialogVisible = false">取消</SwyButton>
      <SwyButton type="primary" @click="dialogVisible = false">确定</SwyButton>
    </template>
  </SwyDialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dialogVisible = ref(false)
</script>
```

:::

### 自定义头部

:::demo

```vue
<template>
  <SwyButton @click="dialogVisible = true">打开 Dialog</SwyButton>
  <SwyDialog v-model="dialogVisible" width="30%">
    <template #header>
      <div style="font-size: 18px; font-weight: bold; color: #409eff;">✨ 自定义标题</div>
    </template>
    <p>对话框内容</p>
    <template #footer>
      <SwyButton type="primary" @click="dialogVisible = false">知道了</SwyButton>
    </template>
  </SwyDialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dialogVisible = ref(false)
</script>
```

:::

---

## Drawer 抽屉

### 基础用法

:::demo

```vue
<template>
  <div style="display: flex; gap: 12px;">
    <SwyButton @click="() => openDrawer('rtl')">从右往左开</SwyButton>
    <SwyButton @click="() => openDrawer('ltr')">从左往右开</SwyButton>
    <SwyButton @click="() => openDrawer('ttb')">从上往下开</SwyButton>
    <SwyButton @click="() => openDrawer('btt')">从下往上开</SwyButton>
  </div>
  <SwyDrawer v-model="drawerVisible" :title="drawerTitle" :direction="direction">
    <p>这是抽屉内容</p>
  </SwyDrawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const drawerVisible = ref(false)
const direction = ref('rtl')
const drawerTitle = ref('')

const openDrawer = (dir: string) => {
  direction.value = dir
  const dirMap: Record<string, string> = {
    rtl: '从右往左',
    ltr: '从左往右',
    ttb: '从上往下',
    btt: '从下往上',
  }
  drawerTitle.value = dirMap[dir]
  drawerVisible.value = true
}
</script>
```

:::

### 自定义尺寸

:::demo

```vue
<template>
  <SwyButton @click="drawerVisible = true">打开大抽屉</SwyButton>
  <SwyDrawer v-model="drawerVisible" title="大号抽屉" size="50%">
    <p>这是一个宽度为 50% 的抽屉</p>
    <template #footer>
      <div style="text-align: right;">
        <SwyButton @click="drawerVisible = false">关闭</SwyButton>
      </div>
    </template>
  </SwyDrawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const drawerVisible = ref(false)
</script>
```

:::
