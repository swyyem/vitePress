<template>
  <ElInput placeholder="输入框" v-model="value" />
</template>
<script setup>
// import { ElInput } from "element-plus";
import { ref } from "vue";
const value = ref("111111");
</script>
