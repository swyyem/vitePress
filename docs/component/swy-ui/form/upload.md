# Upload 上传

通过点击或者拖拽上传文件�?

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <SwyUpload
      action="https://jsonplaceholder.typicode.com/posts/"
      :file-list="fileList"
      @change="handleChange"
    >
      <SwyButton type="primary">点击上传</SwyButton>
    </SwyUpload>

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px;">
      <h4 style="margin-top: 0;">文件列表�?/h4>
      <pre style="margin: 0;">{{ fileList }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const fileList = ref([])

const handleChange = (file: any, fileList: any[]) => {
  console.log('文件变化:', file, fileList)
}
</script>
```

:::

## 拖拽上传

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <SwyUpload
      action="https://jsonplaceholder.typicode.com/posts/"
      :file-list="dragFileList"
      drag
      @change="handleDragChange"
    >
      <div
        style="padding: 40px; text-align: center; border: 2px dashed #d9d9d9; border-radius: 4px;"
      >
        <div style="font-size: 24px; margin-bottom: 10px;">📁</div>
        <div>
          将文件拖到此处，�?          <span style="color: #409eff; cursor: pointer;">点击上传</span>
        </div>
      </div>
    </SwyUpload>

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px;">
      <h4 style="margin-top: 0;">已上传文件：{{ dragFileList.length }} �?/h4>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dragFileList = ref([])

const handleDragChange = (file: any, fileList: any[]) => {
  dragFileList.value = fileList
}
</script>
```

:::

## 图片上传

:::demo

```vue
<template>
  <div>
    <SwyUpload
      action="https://jsonplaceholder.typicode.com/posts/"
      :file-list="imageList"
      list-type="picture-card"
      accept="image/*"
      @change="handleImageChange"
      @preview="handlePreview"
    >
      <div style="font-size: 28px;">+</div>
    </SwyUpload>

    <div v-if="previewUrl" style="margin-top: 20px;">
      <img :src="previewUrl" style="max-width: 400px;" alt="preview" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const imageList = ref([])
const previewUrl = ref('')

const handleImageChange = (file: any, fileList: any[]) => {
  imageList.value = fileList
}

const handlePreview = (file: any) => {
  previewUrl.value = file.url
}
</script>
```

:::

## 文件列表控制

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <SwyUpload
      action="https://jsonplaceholder.typicode.com/posts/"
      :file-list="controlFileList"
      :limit="3"
      :on-exceed="handleExceed"
      @change="handleControlChange"
      @remove="handleRemove"
    >
      <SwyButton type="primary">选择文件</SwyButton>
      <template #tip>
        <div style="color: #606266; font-size: 12px; margin-top: 7px;">
          只能上传jpg/png文件，且不超�?00kb，最�?个文�?        </div>
      </template>
    </SwyUpload>

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px;">
      <div>已上�? {{ controlFileList.length }} / 3 个文�?/div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const controlFileList = ref([])

const handleControlChange = (file: any, fileList: any[]) => {
  controlFileList.value = fileList
}

const handleRemove = (file: any) => {
  console.log('移除文件:', file)
}

const handleExceed = () => {
  alert('最多只能上�?个文件！')
}
</script>
```

:::

## API

### Upload Props

| 参数               | 说明               | 类型                            | 默认�? |
| ------------------ | ------------------ | ------------------------------- | ------ |
| action             | 上传的地址         | `string`                        | �?     |
| fileList / v-model | 上传的文件列�?     | `array`                         | []     |
| multiple           | 是否支持多选文�?   | `boolean`                       | false  |
| limit              | 最大允许上传个�?   | `number`                        | �?     |
| accept             | 接受上传的文件类�? | `string`                        | �?     |
| drag               | 是否启用拖拽上传   | `boolean`                       | false  |
| listType           | 文件列表的类�?     | `text / picture / picture-card` | text   |
| disabled           | 是否禁用           | `boolean`                       | false  |

### Upload Events

| 事件�?  | 说明                               | 参数                         |
| ------- | ---------------------------------- | ---------------------------- |
| change  | 文件状态改变时的钩�?               | `(file, fileList)`           |
| success | 文件上传成功时的钩子               | `(response, file, fileList)` |
| error   | 文件上传失败时的钩子               | `(error, file, fileList)`    |
| remove  | 文件列表移除文件时的钩子           | `(file, fileList)`           |
| preview | 点击文件列表中已上传的文件时的钩�? | `(file)`                     |
| exceed  | 文件超出个数限制时的钩子           | `(files, fileList)`          |
