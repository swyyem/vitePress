<template>
  <div :class="calendarKls">
    <div :class="ns.e('header')">
      <div :class="ns.e('title')">{{ currentYear }}年 {{ currentMonth }}月</div>
      <div :class="ns.e('button-group')">
        <button type="button" @click="prevMonth">上个月</button>
        <button type="button" @click="selectDate('today')">今天</button>
        <button type="button" @click="nextMonth">下个月</button>
      </div>
    </div>
    <div :class="ns.e('body')">
      <table :class="ns.e('table')" cellspacing="0" cellpadding="0">
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
                ns.e('day'),
                {
                  [ns.is('selected')]: isSelected(day),
                  [ns.is('today')]: isToday(day),
                },
              ]"
              @click="selectDate(day)"
            >
              <div :class="ns.e('day-content')">
                {{ day ? day.getDate() : '' }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { calendarEmits, calendarProps } from './calendar'

defineOptions({
  name: 'SwyCalendar',
})

const props = defineProps(calendarProps)
const emit = defineEmits(calendarEmits)

const ns = useNamespace('calendar')
const selectedDate = ref(props.modelValue || new Date())
const currentYear = ref(selectedDate.value.getFullYear())
const currentMonth = ref(selectedDate.value.getMonth() + 1)

const weekDays = ['日', '一', '二', '三', '四', '五', '六']

const calendarKls = computed(() => [ns.b()])

const weeks = computed(() => {
  const result: (Date | null)[][] = []
  return result
})

const isSelected = (day: Date | null) => {
  if (!day) return false
  return day.toDateString() === selectedDate.value.toDateString()
}

const isToday = (day: Date | null) => {
  if (!day) return false
  return day.toDateString() === new Date().toDateString()
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

const selectDate = (date: Date | string) => {
  if (date === 'today') {
    selectedDate.value = new Date()
  } else if (date instanceof Date) {
    selectedDate.value = date
  }
  emit('update:modelValue', selectedDate.value)
  emit('change', selectedDate.value)
}

defineExpose({
  selectedDate,
})
</script>
