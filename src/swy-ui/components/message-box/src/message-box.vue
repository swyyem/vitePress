<!-- File: message-box.vue - 消息弹框组件 -->
<template>
  <teleport to="body">
    <transition name="swy-message-box-fade">
      <div v-if="visible" :class="[ns.b() + '-overlay']" @click.self="handleMaskClick">
        <div :class="[ns.b(), ns.is('center', props.center)]">
          <!-- 关闭按钮 -->
          <button v-if="props.showClose" :class="ns.e('close')" @click="handleClose">
            <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
              <path
                d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9c-4.4 5.2-.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
              />
            </svg>
          </button>

          <!-- 标题 -->
          <div v-if="props.title" :class="ns.e('header')">
            <span :class="ns.e('title')">{{ props.title }}</span>
          </div>

          <!-- 内容区域 -->
          <div :class="ns.e('content')">
            <div :class="ns.e('container')">
              <!-- 图标 -->
              <span v-if="props.type" :class="[ns.e('status'), ns.e('status') + '--' + props.type]">
                <!-- success -->
                <svg
                  v-if="props.type === 'success'"
                  viewBox="0 0 1024 1024"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                >
                  <path
                    d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"
                  />
                </svg>
                <!-- warning -->
                <svg
                  v-else-if="props.type === 'warning'"
                  viewBox="0 0 1024 1024"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                >
                  <path
                    d="M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"
                  />
                </svg>
                <!-- error -->
                <svg
                  v-else-if="props.type === 'error'"
                  viewBox="0 0 1024 1024"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                >
                  <path
                    d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155.3-130.1-155c-1.2-1.5-1.9-3.3-1.9-5.2 0-4.4 3.6-8 8-8l66.1.3L512 460.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 510l130 155.3c1.2 1.5 1.9 3.3 1.9 5.2 0 4.5-3.5 8-8 8z"
                  />
                </svg>
                <!-- info -->
                <svg v-else viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
                  <path
                    d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"
                  />
                </svg>
              </span>

              <!-- 消息文字 -->
              <div :class="ns.e('message')">
                <!-- eslint-disable-next-line vue/no-v-html -->
                <p v-if="props.dangerouslyUseHTMLString" v-html="props.message" />
                <p v-else>{{ props.message }}</p>
              </div>
            </div>

            <!-- Prompt 输入框 -->
            <div v-if="props.showInput" :class="ns.e('input')">
              <input
                v-model="inputVal"
                :placeholder="props.inputPlaceholder"
                :class="ns.e('input-inner')"
                @keydown.enter="handleConfirm"
              />
            </div>
          </div>

          <!-- 操作按钮 -->
          <div :class="ns.e('btns')">
            <button
              v-if="props.showCancelButton"
              :class="[
                ns.e('btn'),
                ns.e('btn') + '--cancel',
                ns.e('btn') + '--' + props.cancelButtonType,
              ]"
              @click="handleCancel"
            >
              {{ props.cancelButtonText }}
            </button>
            <button
              v-if="props.showConfirmButton"
              :class="[
                ns.e('btn'),
                ns.e('btn') + '--confirm',
                ns.e('btn') + '--' + props.confirmButtonType,
              ]"
              @click="handleConfirm"
            >
              {{ props.confirmButtonText }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
// ========== 依赖导入 ==========
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { messageBoxProps, messageBoxEmits } from './message-box'

defineOptions({ name: 'SwyMessageBox' })

const props = defineProps(messageBoxProps)
const emit = defineEmits(messageBoxEmits)

// ========== 命名空间 ==========
const ns = useNamespace('message-box')

// ========== 显示状态 ==========
/** 弹框是否可见 */
const visible = ref(false)

// ========== Prompt 输入值 ==========
/** 输入框当前值 */
const inputVal = ref(props.inputValue || '')

// 同步外部传入的 inputValue 变化
watch(
  () => props.inputValue,
  v => {
    inputVal.value = v || ''
  }
)

// ========== ESC 键盘监听 ==========
/** 键盘事件处理：ESC 关闭 */
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && visible.value && props.closeOnPressEscape) {
    handleClose()
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})

// ========== 事件处理 ==========
/** 点击遮罩 */
function handleMaskClick() {
  if (props.closeOnClickModal) handleClose()
}

/** 关闭弹框（× / ESC / 遮罩） */
function handleClose() {
  visible.value = false
  emit('close')
}

/** 取消按钮 */
function handleCancel() {
  visible.value = false
  emit('cancel')
}

/** 确认按钮 */
function handleConfirm() {
  visible.value = false
  emit('confirm', props.showInput ? inputVal.value : undefined)
}

// ========== 暴露给父组件 / 命令式 API ==========
defineExpose({
  /** 弹框可见状态 */
  visible,
  /** 打开弹框 */
  open: () => {
    visible.value = true
  },
  /** 关闭弹框 */
  close: handleClose,
})
</script>
