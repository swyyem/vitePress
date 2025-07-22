# 基础用法

<br>
<br>

:::demo

```vue
<template>
  <div style="height: 500px">
    <ProTable
      ref="tableColumnRef"
      rowKey="id"
      removedKey="enableFlag"
      firstRowSelected
      :request="getData"
      :toolbar="false"
      :columns="columns"
      :edit="editableConfig"
    >
      <ProColumn title="操作" valueType="option" width="120" fixed="right">
        <template #default="scope">
          <el-button link type="primary" size="default" @click="handleEdit(scope)">编辑</el-button>
          <el-button link type="primary" size="default" @click="handleDelete(scope)">
            删除
          </el-button>
        </template>
      </ProColumn>
    </ProTable>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
const toolbarColumns = {
  title: '编辑态',
};

const editableConfig = {
  type: 'only' as const,
  defaultRow: true, // 默认新增一行
  keyboard: true, // 开启键盘
  keyboardNextRow: 'chargeItemCount', // 回车进入到下一行，不传则默认从最后一列切换
};

const handleEdit = (scope: any) => {
  console.log('scope', scope);
};

const handleDelete = (scope: any) => {
  console.log('scope', scope);
};

const getRandom = () => {
  return Math.floor(Math.random() * 10000);
};

const generateData = (n: number = 10, start?: number): any[] => {
  const res: any[] = [];
  const realStart = start || getRandom();
  for (let i = 0; i < n; i++) {
    res.push({
      id: realStart + i,
      nesting: {
        chargeItemId: i === 0 ? `45436_${i}` : `45435_${i}`,
      },
      chargeItemCount: 10,
      filmFeeType: 2,
      graphicFeeFlag: false,
      digitalImagingFeeFlag: true,
      useScopeList: ['INP'],
      enableFlag: i % 3 === 0 ? true : false,
    });
  }
  return res;
};

// 模拟接口数据
const getData = (params: any) => {
  console.log('==', params);
  const list = generateData(params.size);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {
          count: 35,
          result: list,
          hasMore: true,
        },
      });
    }, 500);
  });
};

const columns = [
  {
    label: '序号',
    type: 'seq',
    width: '50',
  },
  {
    prop: 'nesting.chargeItemId',
    label: '收费项目ID',
    width: 120,
    ellipsis: true,
    mode: 'read',
  },
  {
    field: 'chargeItemCount',
    title: '收费价格',
    width: '100',
    valueType: 'price',
  },
  {
    field: 'graphicFeeFlag',
    title: '图文费标识',
    width: '95',
    valueType: 'checkbox',
    proFieldProps: {
      fieldProps: {
        multiple: false,
      },
    },
  },
  {
    field: 'digitalImagingFeeFlag',
    title: '数字影像费标识',
    width: '125',
    valueType: 'checkbox',
    proFieldProps: {
      fieldProps: {
        multiple: false,
      },
    },
  },
  {
    field: 'number',
    title: '数量',
    // width: '80',
    valueType: 'inputNumber',
    proFieldProps: {
      fieldProps: {
        controls: false,
        onKeydown: (e: KeyboardEvent) => {
          console.log('=ev=', e);
        },
      },
    },
  },
];
</script>
```
