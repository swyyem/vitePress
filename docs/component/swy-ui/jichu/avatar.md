# Avatar 头像

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <SwyAvatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <SwyAvatar>User</SwyAvatar>
    <SwyAvatar>张三</SwyAvatar>
  </div>
</template>
```

:::

## 尺寸

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <SwyAvatar
      size="small"
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    />
    <SwyAvatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <SwyAvatar
      size="large"
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    />
    <SwyAvatar
      :size="60"
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    />
  </div>
</template>
```

:::

## 形状

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <SwyAvatar
      shape="circle"
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    />
    <SwyAvatar
      shape="square"
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    />
  </div>
</template>
```

:::

## 文字头像

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <SwyAvatar>A</SwyAvatar>
    <SwyAvatar>User</SwyAvatar>
    <SwyAvatar>李四</SwyAvatar>
  </div>
</template>
```

:::
