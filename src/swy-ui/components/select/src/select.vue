<template>
  <div :class="[ns.b(), ns.m(size), ns.is('disabled', disabled), ns.is('focus', isFocused)]">
    <select
      ref="selectRef"
      v-model="selectedValue"
      :class="ns.e('inner')"
      :disabled="disabled"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @change="handleChange"
    >
      <option v-if="placeholder" value="" disabled selected hidden>
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { selectProps, selectEmits } from './select'

defineOptions({
  name: 'SwySelect',
})

const props = defineProps(selectProps)
const emit = defineEmits(selectEmits)

const ns = useNamespace('select')
const selectRef = ref<HTMLSelectElement>()
const isFocused = ref(false)

const selectedValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const handleChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  emit('change', target.value)
}

defineExpose({
  selectRef,
})
</script>

<style lang="scss" scoped>
@use '../../../theme-chalk/src/mixins/mixins' as *;
@use '../../../theme-chalk/src/common/var' as *;

@include b(select) {
  position: relative;
  display: inline-block;
  width: 100%;

  @include e(inner) {
    width: 100%;
    padding: 8px 12px;
    font-size: 14px;
    line-height: 1.5;
    color: #606266;
    background-color: #ffffff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23C0C4CC' d='M2.5 4.5L6 8l3.5-3.5'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 36px;

    &:hover {
      border-color: #c0c4cc;
    }

    &:focus {
      border-color: #409eff;
    }

    &:disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }

  @include when(focus) {
    @include e(inner) {
      border-color: #409eff;
    }
  }

  @include when(disabled) {
    @include e(inner) {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }

  @include m(small) {
    @include e(inner) {
      padding: 6px 10px;
      font-size: 13px;
      padding-right: 32px;
      background-position: right 10px center;
    }
  }

  @include m(large) {
    @include e(inner) {
      padding: 10px 14px;
      font-size: 15px;
      padding-right: 40px;
      background-position: right 14px center;
    }
  }
}
</style>
