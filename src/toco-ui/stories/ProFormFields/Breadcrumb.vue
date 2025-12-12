<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item>
      <a href="/">promotion management</a>
    </el-breadcrumb-item>
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts">
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus';
export default {
  name: 'BreadcrumbMenu', // 修改组件名称
  components: {
    ElBreadcrumb,
    ElBreadcrumbItem,
  },
};
</script>
