/** File: calendar.vue - Vue Component */

<template>
  <div :class="calendarKls">
    <div :class="ns.e('header')">
      <div :class="ns.e('title')">{{ currentMonthTitle }}</div>
      <div v-if="$slots.header" :class="ns.e('header-extra')">
        <slot name="header" :date="selectedDate" />
      </div>
      <div :class="ns.e('button-group')">
        <button type="button" @click="selectDate('prev-month')">上个月</button>
        <button type="button" @click="selectDate('today')">今天</button>
        <button type="button" @click="selectDate('next-month')">下个月</button>
      </div>
    </div>
    <div :class="ns.e('body')">
      <table :class="ns.b('table')" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th v-for="day in weekDays" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, index) in weeks" :key="index">
            <td
              v-for="(day, idx) in week"
              :key="idx"
              :class="[
                ns.be('table', 'day'),
                {
                  'is-selected': isSelected(day),
                  'is-today': isToday(day),
                  prev: day.getMonth() < currentMonth - 1,
                  next: day.getMonth() > currentMonth - 1,
                },
              ]"
              @click="handlePick(day)"
            >
              <div :class="ns.b('day')">
                <slot name="dateCell" :data="getSlotData(day)">
                  <div :class="ns.be('day', 'content')">
                    {{ day.getDate() }}
                  </div>
                </slot>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, ref, watch } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { calendarEmits, calendarProps } from './calendar'

defineOptions({
  name: 'SwyCalendar',
})

const props = defineProps(calendarProps)
const emit = defineEmits(calendarEmits)

const ns = useNamespace('calendar')
const selectedDate = ref<Date>(props.modelValue || new Date())
const currentYear = ref(selectedDate.value.getFullYear())
const currentMonth = ref(selectedDate.value.getMonth() + 1)

const weekDays = ['日', '一', '二', '三', '四', '五', '六']

const calendarKls = computed(() => [ns.b()])
const currentMonthTitle = computed(() => `${currentYear.value}年 ${currentMonth.value}月`)

const weeks = computed(() => {
  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value - 1, 1)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const startDate = new Date(firstDayOfMonth)
  startDate.setDate(startDate.getDate() - firstDayOfWeek)

  const result: Date[][] = []
  const current = new Date(startDate)

  for (let i = 0; i < 6; i++) {
    const week: Date[] = []
    for (let j = 0; j < 7; j++) {
      week.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    result.push(week)
  }
  return result
})

const isSelected = (day: Date) => {
  return day.toDateString() === selectedDate.value.toDateString()
}

const isToday = (day: Date) => {
  return day.toDateString() === new Date().toDateString()
}

const getSlotData = (day: Date) => {
  const year = day.getFullYear()
  const month = day.getMonth() + 1
  const date = day.getDate()
  const dayStr = `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`

  let type = 'current'
  if (day.getMonth() < currentMonth.value - 1) type = 'prev'
  if (day.getMonth() > currentMonth.value - 1) type = 'next'

  return {
    isSelected: isSelected(day),
    type,
    day: dayStr,
    date: day,
  }
}

const handlePick = (day: Date) => {
  selectedDate.value = day
  currentYear.value = day.getFullYear()
  currentMonth.value = day.getMonth() + 1
  emit('update:modelValue', day)
  emit('change', day)
}

const selectDate = (type: 'prev-month' | 'next-month' | 'today') => {
  if (type === 'today') {
    handlePick(new Date())
  } else {
    const targetMonth = type === 'prev-month' ? currentMonth.value - 2 : currentMonth.value
    const targetDate = new Date(currentYear.value, targetMonth, 1)
    currentYear.value = targetDate.getFullYear()
    currentMonth.value = targetDate.getMonth() + 1
  }
}

watch(
  () => props.modelValue,
  val => {
    if (val) {
      selectedDate.value = val
      currentYear.value = val.getFullYear()
      currentMonth.value = val.getMonth() + 1
    }
  }
)

defineExpose({
  selectedDate,
})
</script>
