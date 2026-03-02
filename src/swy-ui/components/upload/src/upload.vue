<!-- File: upload.vue - 文件上传组件 -->
<template>
  <div :class="['swy-upload', `swy-upload--${props.listType}`, props.disabled && 'is-disabled']">
    <!-- ══════════════════════════════════════
         picture-card 模式：卡片格子 + 上传按钮
    ══════════════════════════════════════ -->
    <template v-if="props.listType === 'picture-card'">
      <ul class="swy-upload__card-list">
        <!-- 已有文件卡片 -->
        <li
          v-for="file in internalList"
          :key="file.uid"
          :class="['swy-upload__card-item', `is-${file.status}`]"
        >
          <!-- 图片预览 -->
          <img v-if="file.url" :src="file.url" class="swy-upload__card-img" />
          <span v-else class="swy-upload__card-placeholder">
            <svg viewBox="0 0 1024 1024" width="32" height="32" fill="#c0c4cc">
              <path
                d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zM338 304a80 80 0 110 160 80 80 0 010-160zm494 398H208L414 515l92 92 130-165z"
              />
            </svg>
          </span>
          <!-- 上传进度遮罩 -->
          <div v-if="file.status === 'uploading'" class="swy-upload__card-progress">
            <div
              class="swy-upload__card-progress-inner"
              :style="{ width: file.percent + '%' }"
            ></div>
            <span class="swy-upload__card-percent">{{ file.percent }}%</span>
          </div>
          <!-- 悬停操作层 -->
          <div v-if="!props.disabled" class="swy-upload__card-mask">
            <span class="swy-upload__card-mask-del" @click="handleRemove(file)">
              <svg viewBox="0 0 1024 1024" width="16" height="16" fill="#fff">
                <path
                  d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H360c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32z"
                />
              </svg>
            </span>
          </div>
          <!-- 成功角标 -->
          <span v-if="file.status === 'success'" class="swy-upload__card-badge">
            <svg viewBox="0 0 1024 1024" width="12" height="12" fill="#fff">
              <path
                d="M406.656 706.944L195.84 496.256a32 32 0 10-45.248 45.248l256 256 512-512a32 32 0 00-45.248-45.248L406.592 706.944z"
              />
            </svg>
          </span>
        </li>

        <!-- 新增上传按钮格子 -->
        <li
          v-if="!props.limit || internalList.length < props.limit"
          class="swy-upload__card-add"
          :class="{ 'is-disabled': props.disabled }"
          @click="handleClick"
        >
          <svg viewBox="0 0 1024 1024" width="28" height="28" fill="#8c939d">
            <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" />
            <path d="M152 482h704q8 0 8 8v60q0 8-8 8H152q-8 0-8-8v-60q0-8 8-8z" />
          </svg>
        </li>
      </ul>
    </template>

    <!-- ══════════════════════════════════════
         text / picture 模式：触发器 + 文件列表
    ══════════════════════════════════════ -->
    <template v-else>
      <!-- 拖拽区域 -->
      <div
        v-if="props.drag"
        class="swy-upload__dragger"
        :class="{ 'is-dragover': isDragover, 'is-disabled': props.disabled }"
        @click="handleClick"
        @dragover.prevent="isDragover = true"
        @dragleave.prevent="isDragover = false"
        @drop.prevent="handleDrop"
      >
        <svg viewBox="0 0 1024 1024" width="48" height="48" fill="#c0c4cc">
          <path
            d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"
          />
        </svg>
        <p class="swy-upload__dragger-text">
          将文件拖到此处，或
          <em>点击上传</em>
        </p>
        <slot name="tip" />
      </div>

      <!-- 普通点击触发器 -->
      <template v-else>
        <div class="swy-upload__trigger" @click="handleClick">
          <slot>
            <button type="button" class="swy-upload__btn" :disabled="props.disabled">
              <svg
                viewBox="0 0 1024 1024"
                width="12"
                height="12"
                fill="currentColor"
                style="margin-right: 6px"
              >
                <path
                  d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13z"
                />
                <path
                  d="M878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"
                />
              </svg>
              点击上传
            </button>
          </slot>
        </div>
        <div v-if="$slots.tip" class="swy-upload__tip">
          <slot name="tip" />
        </div>
      </template>

      <!-- 文件列表 -->
      <ul v-if="props.showFileList && internalList.length" class="swy-upload__list">
        <li
          v-for="file in internalList"
          :key="file.uid"
          :class="['swy-upload__list-item', `is-${file.status}`]"
        >
          <!-- picture 模式缩略图 -->
          <img
            v-if="props.listType === 'picture' && file.url"
            :src="file.url"
            class="swy-upload__list-thumb"
          />
          <!-- 文件图标 -->
          <span v-else class="swy-upload__list-icon">
            <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor">
              <path
                d="M854.6 288.7L639.4 73.4c-6-6-14.2-9.4-22.7-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.3-16.6-9.4-22.6zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z"
              />
            </svg>
          </span>

          <!-- 文件名 -->
          <span class="swy-upload__list-name" :title="file.name">{{ file.name }}</span>

          <!-- 文件大小 -->
          <span class="swy-upload__list-size">{{ formatSize(file.size) }}</span>

          <!-- 进度条 -->
          <div v-if="file.status === 'uploading'" class="swy-upload__list-progress">
            <div class="swy-upload__list-progress-bar" :style="{ width: file.percent + '%' }"></div>
          </div>

          <!-- 状态图标 -->
          <span v-if="file.status === 'success'" class="swy-upload__list-status is-success">
            <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor">
              <path
                d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
              />
            </svg>
          </span>
          <span v-else-if="file.status === 'error'" class="swy-upload__list-status is-error">
            <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor">
              <path
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155.3-130.1-155c-1.2-1.5-1.9-3.3-1.9-5.2 0-4.4 3.6-8 8-8l66.1.3L512 460.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 510l130 155.3c1.2 1.5 1.9 3.3 1.9 5.2 0 4.5-3.5 8-8 8z"
              />
            </svg>
          </span>

          <!-- 删除按钮 -->
          <button
            v-if="!props.disabled"
            type="button"
            class="swy-upload__list-del"
            @click="handleRemove(file)"
          >
            <svg viewBox="0 0 1024 1024" width="12" height="12" fill="currentColor">
              <path
                d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
              />
            </svg>
          </button>
        </li>
      </ul>
    </template>

    <!-- 隐藏的 file input -->
    <input
      ref="inputRef"
      type="file"
      style="display: none"
      :multiple="props.multiple"
      :accept="props.accept"
      :disabled="props.disabled"
      @change="handleInputChange"
    />
  </div>
</template>

<script lang="ts" setup>
// ========== 依赖导入 ==========
import { ref, watch, onBeforeUnmount } from 'vue'
import { uploadEmits, uploadProps } from './upload'
import type { UploadFileItem } from './upload'

defineOptions({ name: 'SwyUpload' })

const props = defineProps(uploadProps)
const emit = defineEmits(uploadEmits)

// ========== DOM 引用 ==========
const inputRef = ref<HTMLInputElement>()

// ========== 内部文件列表 ==========
const internalList = ref<UploadFileItem[]>([...props.fileList])

// 外部 fileList 变化时同步
watch(
  () => props.fileList,
  val => {
    internalList.value = [...val]
  },
  { deep: true }
)

// ========== 状态 ==========
const isDragover = ref(false)

// ========== 工具函数 ==========
function genUid() {
  return `upload-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function createPreviewUrl(file: File): string | undefined {
  if (file.type.startsWith('image/')) {
    return URL.createObjectURL(file)
  }
  return undefined
}

// 释放 ObjectURL 避免内存泄漏
const objectUrls: string[] = []
onBeforeUnmount(() => {
  objectUrls.forEach(url => URL.revokeObjectURL(url))
})

// ========== XHR 上传 ==========
function doUpload(item: UploadFileItem) {
  if (!props.action) {
    // 无 action：仅本地存储，直接标记成功
    item.status = 'success'
    item.percent = 100
    emit('success', null, item, internalList.value)
    emit('change', item, internalList.value)
    return
  }

  item.status = 'uploading'
  const xhr = new XMLHttpRequest()

  // 进度
  xhr.upload.addEventListener('progress', (e: ProgressEvent) => {
    if (e.lengthComputable) {
      item.percent = Math.round((e.loaded / e.total) * 100)
      emit('progress', e, item, internalList.value)
    }
  })

  // 完成
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      item.status = 'success'
      item.percent = 100
      let response: unknown
      try {
        response = JSON.parse(xhr.responseText)
      } catch {
        response = xhr.responseText
      }
      item.response = response
      emit('success', response, item, internalList.value)
    } else {
      item.status = 'error'
      emit('error', new Error(`${xhr.status} ${xhr.statusText}`), item, internalList.value)
    }
    emit('change', item, internalList.value)
  })

  // 错误
  xhr.addEventListener('error', () => {
    item.status = 'error'
    emit('error', new Error('Network Error'), item, internalList.value)
    emit('change', item, internalList.value)
  })

  // 构建 FormData
  const formData = new FormData()
  Object.entries(props.data ?? {}).forEach(([k, v]) => formData.append(k, v))
  formData.append(props.name, item.raw)

  xhr.open('POST', props.action)
  xhr.withCredentials = props.withCredentials ?? false

  // 请求头
  Object.entries(props.headers ?? {}).forEach(([k, v]) => xhr.setRequestHeader(k, v))

  xhr.send(formData)
}

// ========== 处理选中文件 ==========
async function processFiles(files: File[]) {
  // limit 判断
  if (props.limit !== undefined) {
    const remaining = props.limit - internalList.value.length
    if (files.length > remaining) {
      emit('exceed', files, internalList.value)
      props.onExceed?.(files, internalList.value)
      return
    }
  }

  for (const rawFile of files) {
    // beforeUpload 钩子
    if (props.beforeUpload) {
      let result: boolean | File
      try {
        result = await props.beforeUpload(rawFile)
      } catch {
        continue
      }
      if (result === false) continue
    }

    // 生成预览 URL
    const url = createPreviewUrl(rawFile)
    if (url) objectUrls.push(url)

    const item: UploadFileItem = {
      uid: genUid(),
      name: rawFile.name,
      size: rawFile.size,
      type: rawFile.type,
      status: 'ready',
      percent: 0,
      raw: rawFile,
      url,
    }

    internalList.value.push(item)
    emit('change', item, internalList.value)

    // 自动上传
    if (props.autoUpload) {
      doUpload(item)
    }
  }
}

// ========== 事件处理 ==========
function handleClick() {
  if (props.disabled) return
  inputRef.value?.click()
}

function handleInputChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files?.length) return
  processFiles(Array.from(files))
  // 重置 input，允许再次选择同一文件
  if (inputRef.value) inputRef.value.value = ''
}

function handleDrop(e: DragEvent) {
  isDragover.value = false
  if (props.disabled) return
  const files = e.dataTransfer?.files
  if (!files?.length) return
  processFiles(Array.from(files))
}

async function handleRemove(file: UploadFileItem) {
  // beforeRemove 钩子
  if (props.beforeRemove) {
    let allow: boolean
    try {
      allow = await props.beforeRemove(file, internalList.value)
    } catch {
      return
    }
    if (allow === false) return
  }

  const idx = internalList.value.findIndex(f => f.uid === file.uid)
  if (idx !== -1) internalList.value.splice(idx, 1)

  // 释放预览 URL
  if (file.url && file.url.startsWith('blob:')) {
    URL.revokeObjectURL(file.url)
  }

  emit('remove', file, internalList.value)
}

// ========== 手动上传（autoUpload=false 时） ==========
function submit() {
  internalList.value.filter(f => f.status === 'ready').forEach(f => doUpload(f))
}

// ========== 清空列表 ==========
function clearFiles() {
  internalList.value.forEach(f => {
    if (f.url?.startsWith('blob:')) URL.revokeObjectURL(f.url)
  })
  internalList.value = []
}

// ========== 中止上传（暂不支持 abort，占位） ==========
function abort() {
  // 预留：复杂场景可在 doUpload 里保存 xhr 引用
}

defineExpose({ submit, clearFiles, abort, fileList: internalList })
</script>

<style>
/* ══ 容器 ══════════════════════════════════ */
.swy-upload {
  display: inline-block;
  width: 100%;
}

.swy-upload.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* ══ 默认上传按钮 ═══════════════════════ */
.swy-upload__trigger {
  display: inline-block;
}

.swy-upload__btn {
  display: inline-flex;
  align-items: center;
  padding: 7px 15px;
  font-size: 14px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  color: #606266;
  cursor: pointer;
  transition:
    border-color 0.2s,
    color 0.2s;
  outline: none;
}

.swy-upload__btn:hover:not(:disabled) {
  color: #409eff;
  border-color: #c6e2ff;
  background: #ecf5ff;
}

.swy-upload__btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.swy-upload__tip {
  font-size: 12px;
  color: #909399;
  margin-top: 6px;
}

/* ══ 拖拽区域 ══════════════════════════════ */
.swy-upload__dragger {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 360px;
  height: 180px;
  border: 1px dashed #dcdfe6;
  border-radius: 6px;
  background: #fafafa;
  cursor: pointer;
  transition:
    border-color 0.2s,
    background 0.2s;
  box-sizing: border-box;
}

.swy-upload__dragger:hover:not(.is-disabled) {
  border-color: #409eff;
}

.swy-upload__dragger.is-dragover {
  border-color: #409eff;
  background: #ecf5ff;
}

.swy-upload__dragger.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.swy-upload__dragger-text {
  font-size: 14px;
  color: #606266;
  margin: 0;
}

.swy-upload__dragger-text em {
  font-style: normal;
  color: #409eff;
}

/* ══ 文件列表（text / picture）═══════════ */
.swy-upload__list {
  list-style: none;
  margin: 8px 0 0;
  padding: 0;
  max-width: 360px;
}

.swy-upload__list-item {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 8px;
  border-radius: 4px;
  font-size: 13px;
  color: #606266;
  transition: background 0.15s;
  position: relative;
}

.swy-upload__list-item:hover {
  background: #f5f7fa;
}

.swy-upload__list-item.is-error {
  color: #f56c6c;
}

/* 缩略图（picture 模式） */
.swy-upload__list-thumb {
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
  border: 1px solid #e4e7ed;
}

.swy-upload__list-icon {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  color: #909399;
}

.swy-upload__list-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.swy-upload__list-size {
  flex-shrink: 0;
  font-size: 12px;
  color: #c0c4cc;
}

/* 进度条 */
.swy-upload__list-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #e4e7ed;
  border-radius: 0 0 4px 4px;
  overflow: hidden;
}

.swy-upload__list-progress-bar {
  height: 100%;
  background: #409eff;
  transition: width 0.2s;
}

/* 状态图标 */
.swy-upload__list-status {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
}

.swy-upload__list-status.is-success {
  color: #67c23a;
}
.swy-upload__list-status.is-error {
  color: #f56c6c;
}

/* 删除按钮 */
.swy-upload__list-del {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  padding: 2px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #c0c4cc;
  border-radius: 50%;
  transition:
    color 0.15s,
    background 0.15s;
  outline: none;
}

.swy-upload__list-del:hover {
  color: #f56c6c;
  background: #fef0f0;
}

/* ══ picture-card 模式 ══════════════════ */
.swy-upload__card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

/* 单个卡片 */
.swy-upload__card-item,
.swy-upload__card-add {
  width: 148px;
  height: 148px;
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.swy-upload__card-item.is-error {
  border-color: #f56c6c;
}

.swy-upload__card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.swy-upload__card-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 上传进度遮罩 */
.swy-upload__card-progress {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.swy-upload__card-progress-inner {
  width: 80%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  overflow: hidden;
}

.swy-upload__card-progress-inner::after {
  content: '';
  display: block;
  height: 100%;
  background: #fff;
  transition: width 0.2s;
}

.swy-upload__card-percent {
  color: #fff;
  font-size: 12px;
}

/* 悬停操作层 */
.swy-upload__card-mask {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  opacity: 0;
  transition: opacity 0.2s;
}

.swy-upload__card-item:hover .swy-upload__card-mask {
  opacity: 1;
}

.swy-upload__card-mask-del {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transition: background 0.15s;
}

.swy-upload__card-mask-del:hover {
  background: rgba(255, 255, 255, 0.4);
}

/* 成功角标 */
.swy-upload__card-badge {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  background: #67c23a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 新增按钮格子 */
.swy-upload__card-add {
  border: 1px dashed #d9d9d9;
  background: #fafafa;
  color: #8c939d;
  transition:
    border-color 0.2s,
    color 0.2s;
}

.swy-upload__card-add:hover:not(.is-disabled) {
  border-color: #409eff;
  color: #409eff;
}

.swy-upload__card-add.is-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
