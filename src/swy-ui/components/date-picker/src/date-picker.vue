<template>
  <div :class="datePickerKls" :style="datePickerStyle">
    <SwyInput
      ref="inputRef"
      v-model="displayValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="true"
      :size="size"
      :clearable="clearable"
      @click="handleInputClick"
      @clear="handleClear"
    >
      <template #prefix>
        <span :class="ns.e('icon')">📅</span>
      </template>
    </SwyInput>

    <transition name="swy-zoom-in-top">
      <div v-show="visible" :class="ns.e('panel')">
        <div :class="ns.e('header')">
          <button type="button" :class="ns.e('prev-btn')" @click="prevYear">«</button>
          <button type="button" :class="ns.e('prev-btn')" @click="prevMonth">‹</button>
          <span :class="ns.e('header-label')">{{ currentYear }}年 {{ currentMonth }}月</span>
          <button type="button" :class="ns.e('next-btn')" @click="nextMonth">›</button>
          <button type="button" :class="ns.e('next-btn')" @click="nextYear">»</button>
        </div>

        <div :class="ns.e('content')">
          <div :class="ns.e('week-header')">
            <div v-for="week in weekDays" :key="week" :class="ns.e('week-cell')">
              {{ week }}
            </div>
          </div>

          <div :class="ns.e('date-table')">
            <div
              v-for="date in dateList"
              :key="date.timestamp"
              :class="[
                ns.e('date-cell'),
                ns.is('today', date.isToday),
                ns.is('selected', date.isSelected),
                ns.is('disabled', date.isDisabled),
                ns.is('prev-month', date.isPrevMonth),
                ns.is('next-month', date.isNextMonth)
              ]"
              @click="handleDateClick(date)"
            >
              <span :class="ns.e('date-cell-text')">{{ date.day }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { datePickerEmits, datePickerProps } from './date-picker'
import SwyInput from '../../input'

interface DateCell {
  day: number
  date: Date
  timestamp: number
  isPrevMonth: boolean
  isNextMonth: boolean
  isToday: boolean
  isSelected: boolean
  isDisabled: boolean
}

defineOptions({
  name: 'SwyDatePicker',
})

const props = defineProps(datePickerProps)
const emit = defineEmits(datePickerEmits)

const ns = useNamespace('date-picker')
const inputRef = ref()
const visible = ref(false)
const displayValue = ref('')
const selectedDate = ref<Date | null>(null)
const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth() + 1)

const weekDays = ['日', '一', '二', '三', '四', '五', '六']

const datePickerKls = computed(() => [
  ns.b(),
  ns.m(props.size),
  ns.is('disabled', props.disabled)
])

const datePickerStyle = computed(() => ({}))

// 生成日期列表
const dateList = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value
  const firstDay = new Date(year, month - 1, 1)
  const lastDay = new Date(year, month, 0)
  const prevMonthLastDay = new Date(year, month - 1, 0)

  const firstDayOfWeek = firstDay.getDay()
  const daysInMonth = lastDay.getDate()
  const daysInPrevMonth = prevMonthLastDay.getDate()

  const dates: DateCell[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // 上个月的日期
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i
    const date = new Date(year, month - 2, day)
    dates.push({
      day,
      date,
      timestamp: date.getTime(),
      isPrevMonth: true,
      isNextMonth: false,
      isToday: false,
      isSelected: false,
      isDisabled: props.disabledDate ? props.disabledDate(date) : false
    })
  }

  // 当前月的日期
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month - 1, i)
    const isToday = date.getTime() === today.getTime()
    const isSelected = selectedDate.value ? date.getTime() === selectedDate.value.getTime() : false

    dates.push({
      day: i,
      date,
      timestamp: date.getTime(),
      isPrevMonth: false,
      isNextMonth: false,
      isToday,
      isSelected,
      isDisabled: props.disabledDate ? props.disabledDate(date) : false
    })
  }

  // 下个月的日期（补齐6行）
  const remainingCells = 42 - dates.length
  for (let i = 1; i <= remainingCells; i++) {
    const date = new Date(year, month, i)
    dates.push({
      day: i,
      date,
      timestamp: date.getTime(),
      isPrevMonth: false,
      isNextMonth: true,
      isToday: false,
      isSelected: false,
      isDisabled: props.disabledDate ? props.disabledDate(date) : false
    })
  }

  return dates
})

const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const handleInputClick = () => {
  if (!props.disabled) {
    visible.value = !visible.value
  }
}

const handleDateClick = (dateInfo: DateCell) => {
  if (dateInfo.isDisabled || props.disabled) return

  selectedDate.value = dateInfo.date
  displayValue.value = formatDate(dateInfo.date)
  visible.value = false

  emit('update:modelValue', displayValue.value)
  emit('change', displayValue.value)
}

const handleClear = () => {
  displayValue.value = ''
  selectedDate.value = null
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
}

const prevYear = () => {
  currentYear.value--
}

const nextYear = () => {
  currentYear.value++
}

const prevMonth = () => {
  if (currentMonth.value === 1) {
    currentMonth.value = 12
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 12) {
    currentMonth.value = 1
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

// 点击外部关闭面板
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const picker = target.closest(`.${ns.b()}`)
  if (!picker && visible.value) {
    visible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)

  // 初始化值
  if (props.modelValue) {
    const date = new Date(props.modelValue)
    if (!isNaN(date.getTime())) {
      selectedDate.value = date
      displayValue.value = formatDate(date)
      currentYear.value = date.getFullYear()
      currentMonth.value = date.getMonth() + 1
    }
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    const date = new Date(newVal)
    if (!isNaN(date.getTime())) {
      selectedDate.value = date
      displayValue.value = formatDate(date)
    }
  } else {
    selectedDate.value = null
    displayValue.value = ''
  }
})

defineExpose({
  inputRef,
  visible,
})
</script>
