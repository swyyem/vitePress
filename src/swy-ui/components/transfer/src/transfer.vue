<template>
  <div :class="[ns.b(), ns.is('filterable', filterable)]">
    <!-- Left Panel -->
    <div :class="panelNs.b()">
      <div :class="panelNs.e('header')">
        <swy-checkbox
          v-model="leftAllChecked"
          :indeterminate="leftIndeterminate"
          @change="handleLeftCheckAllChange"
        >
          {{ leftTitle }}
          <span>{{ leftCheckedCount }} / {{ leftData.length }}</span>
        </swy-checkbox>
      </div>
      <div :class="[panelNs.e('body'), ns.is('filterable', filterable)]">
        <div v-if="filterable" :class="panelNs.e('filter')">
          <swy-icon name="search" />
          <input
            v-model="leftQuery"
            :placeholder="filterPlaceholder || '请输入关键词'"
            class="swy-input__inner"
          />
        </div>
        <div :class="panelNs.e('list')">
          <swy-checkbox
            v-for="item in filteredLeftData as any[]"
            :key="item[props.props.key]"
            v-model="leftChecked"
            :label="item[props.props.key]"
            :disabled="item[props.props.disabled]"
            :class="panelNs.e('item')"
          >
            <slot :item="item">
              <span>{{ item[props.props.label] }}</span>
            </slot>
          </swy-checkbox>
          <p v-if="filteredLeftData.length === 0" :class="panelNs.e('empty')">
            {{ filterPlaceholder || '无数据' }}
          </p>
        </div>
      </div>
      <div v-if="$slots['left-footer']" :class="panelNs.e('footer')">
        <slot name="left-footer" />
      </div>
    </div>

    <!-- Operation Buttons -->
    <div :class="ns.e('buttons')">
      <swy-button
        type="primary"
        :class="ns.e('button')"
        :disabled="leftChecked.length === 0"
        @click="addToRight"
      >
        <span>
          <template v-if="buttonTexts[1]">{{ buttonTexts[1] }}</template>
          <swy-icon name="arrow-right" />
        </span>
      </swy-button>
      <swy-button
        type="primary"
        :class="ns.e('button')"
        :disabled="rightChecked.length === 0"
        @click="addToLeft"
      >
        <span>
          <swy-icon name="arrow-left" />
          <template v-if="buttonTexts[0]">{{ buttonTexts[0] }}</template>
        </span>
      </swy-button>
    </div>

    <!-- Right Panel -->
    <div :class="panelNs.b()">
      <div :class="panelNs.e('header')">
        <swy-checkbox
          v-model="rightAllChecked"
          :indeterminate="rightIndeterminate"
          @change="handleRightCheckAllChange"
        >
          {{ rightTitle }}
          <span>{{ rightCheckedCount }} / {{ rightData.length }}</span>
        </swy-checkbox>
      </div>
      <div :class="[panelNs.e('body'), ns.is('filterable', filterable)]">
        <div v-if="filterable" :class="panelNs.e('filter')">
          <swy-icon name="search" />
          <input
            v-model="rightQuery"
            :placeholder="filterPlaceholder || '请输入关键词'"
            class="swy-input__inner"
          />
        </div>
        <div :class="panelNs.e('list')">
          <swy-checkbox
            v-for="item in filteredRightData as any[]"
            :key="item[props.props.key]"
            v-model="rightChecked"
            :label="item[props.props.key]"
            :disabled="item[props.props.disabled]"
            :class="panelNs.e('item')"
          >
            <slot :item="item">
              <span>{{ item[props.props.label] }}</span>
            </slot>
          </swy-checkbox>
          <p v-if="filteredRightData.length === 0" :class="panelNs.e('empty')">
            {{ filterPlaceholder || '无数据' }}
          </p>
        </div>
      </div>
      <div v-if="$slots['right-footer']" :class="panelNs.e('footer')">
        <slot name="right-footer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import SwyCheckbox from '@swy-ui/components/checkbox'
import SwyButton from '@swy-ui/components/button'
import { SwyIcon } from '@swy-ui/components/icon'
import { transferEmits, transferProps } from './transfer'

defineOptions({
  name: 'SwyTransfer',
})

const props = defineProps(transferProps)
const emit = defineEmits(transferEmits)

const ns = useNamespace('transfer')
const panelNs = useNamespace('transfer-panel')

const leftChecked = ref<any[]>([])
const rightChecked = ref<any[]>([])
const leftQuery = ref('')
const rightQuery = ref('')

// Data partition
const leftData = computed(() => {
  return props.data.filter((item: any) => !props.modelValue.includes(item[props.props.key]))
})

const rightData = computed(() => {
  return props.data.filter((item: any) => props.modelValue.includes(item[props.props.key]))
})

// Filtering
const filteredLeftData = computed(() => {
  if (!props.filterable) return leftData.value
  return leftData.value.filter((item: any) => {
    const label = String(item[props.props.label])
    return label.toLowerCase().includes(leftQuery.value.toLowerCase())
  })
})

const filteredRightData = computed(() => {
  if (!props.filterable) return rightData.value
  return rightData.value.filter((item: any) => {
    const label = String(item[props.props.label])
    return label.toLowerCase().includes(rightQuery.value.toLowerCase())
  })
})

// Titles & Counts
const leftTitle = computed(() => props.titles[0] || '列表1')
const rightTitle = computed(() => props.titles[1] || '列表2')
const leftCheckedCount = computed(() => leftChecked.value.length)
const rightCheckedCount = computed(() => rightChecked.value.length)

// Indeterminate states
const leftIndeterminate = computed(() => {
  const count = leftChecked.value.length
  return count > 0 && count < leftData.value.filter(i => !i[props.props.disabled]).length
})

const rightIndeterminate = computed(() => {
  const count = rightChecked.value.length
  return count > 0 && count < rightData.value.filter(i => !i[props.props.disabled]).length
})

const leftAllChecked = ref(false)
const rightAllChecked = ref(false)

const handleLeftCheckAllChange = (val: boolean) => {
  leftChecked.value = val
    ? leftData.value
        .filter((item: any) => !item[props.props.disabled])
        .map((item: any) => item[props.props.key])
    : []
}

const handleRightCheckAllChange = (val: boolean) => {
  rightChecked.value = val
    ? rightData.value
        .filter((item: any) => !item[props.props.disabled])
        .map((item: any) => item[props.props.key])
    : []
}

const addToRight = () => {
  const newValue = [...props.modelValue, ...leftChecked.value]
  emit('update:modelValue', newValue)
  emit('change', newValue, 'right', leftChecked.value)
  leftChecked.value = []
}

const addToLeft = () => {
  const newValue = props.modelValue.filter((item: any) => !rightChecked.value.includes(item))
  emit('update:modelValue', newValue)
  emit('change', newValue, 'left', rightChecked.value)
  rightChecked.value = []
}

watch(leftChecked, val => {
  const availableData = leftData.value.filter(i => !i[props.props.disabled])
  leftAllChecked.value = availableData.length > 0 && val.length === availableData.length
  emit('leftCheckChange', val, [])
})

watch(rightChecked, val => {
  const availableData = rightData.value.filter(i => !i[props.props.disabled])
  rightAllChecked.value = availableData.length > 0 && val.length === availableData.length
  emit('rightCheckChange', val, [])
})

watch(
  () => props.modelValue,
  () => {
    leftChecked.value = []
    rightChecked.value = []
    leftAllChecked.value = false
    rightAllChecked.value = false
  }
)
</script>
