<template>
  <div :class="transferKls">
    <div :class="ns.e('panel')">
      <div :class="ns.e('header')">
        <el-checkbox v-model="leftAllChecked" @change="handleLeftCheckAll">
          {{ leftTitle }}
        </el-checkbox>
        <span>{{ leftCheckedCount }} / {{ leftData.length }}</span>
      </div>
      <div :class="ns.e('body')">
        <el-checkbox-group v-model="leftChecked">
          <el-checkbox
            v-for="item in leftData"
            :key="item[props.props.key]"
            :label="item[props.props.key]"
            :disabled="item[props.props.disabled]"
          >
            {{ item[props.props.label] }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

    <div :class="ns.e('buttons')">
      <el-button type="primary" :disabled="leftChecked.length === 0" @click="addToRight">
        &gt;
      </el-button>
      <el-button type="primary" :disabled="rightChecked.length === 0" @click="addToLeft">
        &lt;
      </el-button>
    </div>

    <div :class="ns.e('panel')">
      <div :class="ns.e('header')">
        <el-checkbox v-model="rightAllChecked" @change="handleRightCheckAll">
          {{ rightTitle }}
        </el-checkbox>
        <span>{{ rightCheckedCount }} / {{ rightData.length }}</span>
      </div>
      <div :class="ns.e('body')">
        <el-checkbox-group v-model="rightChecked">
          <el-checkbox
            v-for="item in rightData"
            :key="item[props.props.key]"
            :label="item[props.props.key]"
            :disabled="item[props.props.disabled]"
          >
            {{ item[props.props.label] }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { transferEmits, transferProps } from './transfer'

defineOptions({
  name: 'SwyTransfer',
})

const props = defineProps(transferProps)
const emit = defineEmits(transferEmits)

const ns = useNamespace('transfer')
const leftChecked = ref<unknown[]>([])
const rightChecked = ref<unknown[]>([])
const leftAllChecked = ref(false)
const rightAllChecked = ref(false)

const transferKls = computed(() => [ns.b()])

const leftData = computed(() => {
  return props.data.filter(
    (item: Record<string, unknown>) => !props.modelValue.includes(item[props.props.key])
  )
})

const rightData = computed(() => {
  return props.data.filter((item: Record<string, unknown>) =>
    props.modelValue.includes(item[props.props.key])
  )
})

const leftCheckedCount = computed(() => leftChecked.value.length)
const rightCheckedCount = computed(() => rightChecked.value.length)

const leftTitle = computed(() => props.titles[0] || '列表1')
const rightTitle = computed(() => props.titles[1] || '列表2')

const handleLeftCheckAll = (val: boolean) => {
  leftChecked.value = val
    ? leftData.value.map((item: Record<string, unknown>) => item[props.props.key])
    : []
}

const handleRightCheckAll = (val: boolean) => {
  rightChecked.value = val
    ? rightData.value.map((item: Record<string, unknown>) => item[props.props.key])
    : []
}

const addToRight = () => {
  const newValue = [...props.modelValue, ...leftChecked.value]
  emit('update:modelValue', newValue)
  emit('change', newValue, 'right', leftChecked.value)
  leftChecked.value = []
}

const addToLeft = () => {
  const newValue = props.modelValue.filter((item: unknown) => !rightChecked.value.includes(item))
  emit('update:modelValue', newValue)
  emit('change', newValue, 'left', rightChecked.value)
  rightChecked.value = []
}

watch(
  () => props.modelValue,
  () => {
    leftChecked.value = []
    rightChecked.value = []
  }
)

defineExpose({
  leftChecked,
  rightChecked,
})
</script>
