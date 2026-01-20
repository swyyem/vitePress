# 导航组件

## Tabs 标签页

### 基础用法

:::demo

```vue
<template>
  <SwyTabs v-model="activeTab">
    <SwyTabPane label="用户管理" name="user">
      <div style="padding: 20px;">用户管理内容</div>
    </SwyTabPane>
    <SwyTabPane label="配置管理" name="config">
      <div style="padding: 20px;">配置管理内容</div>
    </SwyTabPane>
    <SwyTabPane label="角色管理" name="role">
      <div style="padding: 20px;">角色管理内容</div>
    </SwyTabPane>
  </SwyTabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const activeTab = ref('user')
</script>
```

:::

---

## Breadcrumb 面包屑

### 基础用法

:::demo

```vue
<template>
  <SwyBreadcrumb>
    <SwyBreadcrumbItem>首页</SwyBreadcrumbItem>
    <SwyBreadcrumbItem>活动管理</SwyBreadcrumbItem>
    <SwyBreadcrumbItem>活动列表</SwyBreadcrumbItem>
    <SwyBreadcrumbItem>活动详情</SwyBreadcrumbItem>
  </SwyBreadcrumb>
</template>
```

:::

### 自定义分隔符

:::demo

```vue
<template>
  <SwyBreadcrumb separator=">">
    <SwyBreadcrumbItem>首页</SwyBreadcrumbItem>
    <SwyBreadcrumbItem>活动管理</SwyBreadcrumbItem>
    <SwyBreadcrumbItem>活动列表</SwyBreadcrumbItem>
  </SwyBreadcrumb>
</template>
```

:::

---

## Pagination 分页

### 基础用法

:::demo

```vue
<template>
  <SwyPagination
    :current-page="currentPage"
    :page-size="10"
    :total="100"
    @current-change="handlePageChange"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentPage = ref(1)

const handlePageChange = (page: number) => {
  currentPage.value = page
  console.log('当前页:', page)
}
</script>
```

:::

### 带背景色

:::demo

```vue
<template>
  <SwyPagination :current-page="currentPage" :page-size="10" :total="100" background />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const currentPage = ref(3)
</script>
```

:::

### 小型分页

:::demo

```vue
<template>
  <SwyPagination :current-page="currentPage" :page-size="10" :total="50" small />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const currentPage = ref(2)
</script>
```

:::

---

## Menu 菜单

为网站提供导航功能的菜单。

### 基础用法

垂直菜单，支持子菜单。

:::demo

```vue
<template>
  <SwyMenu default-active="1" @select="handleSelect">
    <SwyMenuItem index="1">处理中心</SwyMenuItem>
    <SwySubMenu index="2">
      <template #title>我的工作台</template>
      <SwyMenuItem index="2-1">选项1</SwyMenuItem>
      <SwyMenuItem index="2-2">选项2</SwyMenuItem>
    </SwySubMenu>
    <SwyMenuItem index="3" :disabled="true">消息中心</SwyMenuItem>
    <SwyMenuItem index="4">订单管理</SwyMenuItem>
  </SwyMenu>
</template>

<script lang="ts" setup>
const handleSelect = (index: string, indexPath: string[]) => {
  console.log(index, indexPath)
}
</script>
```

:::

### 水平菜单

水平的顶栏菜单。

:::demo

```vue
<template>
  <SwyMenu mode="horizontal" default-active="1">
    <SwyMenuItem index="1">处理中心</SwyMenuItem>
    <SwyMenuItem index="2">我的工作台</SwyMenuItem>
    <SwyMenuItem index="3">订单管理</SwyMenuItem>
  </SwyMenu>
</template>
```

:::

---

## Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

### 基础用法

悬停在下拉菜单上展开更多操作。

:::demo

```vue
<template>
  <SwyDropdown @command="handleCommand">
    <span>下拉菜单</span>
    <template #dropdown>
      <SwyDropdownItem command="a">黄金糕</SwyDropdownItem>
      <SwyDropdownItem command="b">狮子头</SwyDropdownItem>
      <SwyDropdownItem command="c">螺蛳粉</SwyDropdownItem>
      <SwyDropdownItem command="d" :disabled="true">双皮奶</SwyDropdownItem>
      <SwyDropdownItem command="e" :divided="true">蚵仔煎</SwyDropdownItem>
    </template>
  </SwyDropdown>
</template>

<script lang="ts" setup>
const handleCommand = (command: string | number) => {
  console.log('click on item ' + command)
}
</script>
```

:::

### 触发方式

可以配置点击激活或者悬停激活。

:::demo

```vue
<template>
  <SwyDropdown trigger="click" @command="handleCommand">
    <span>点击下拉菜单</span>
    <template #dropdown>
      <SwyDropdownItem command="a">黄金糕</SwyDropdownItem>
      <SwyDropdownItem command="b">狮子头</SwyDropdownItem>
      <SwyDropdownItem command="c">螺蛳粉</SwyDropdownItem>
    </template>
  </SwyDropdown>
</template>

<script lang="ts" setup>
const handleCommand = (command: string | number) => {
  console.log('click on item ' + command)
}
</script>
```

:::
