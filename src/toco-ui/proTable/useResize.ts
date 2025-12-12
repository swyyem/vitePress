import { onMounted, onBeforeUnmount, nextTick, ref, type Ref } from 'vue';
import type { ProTableProps } from './table.types';

type UseResizeOptions = {
  tableBodyRef: Ref<HTMLElement | null>;
  height?: number;
  width?: number;
  recordCreatorProps: ProTableProps['recordCreatorProps'];
  hasPager: boolean;
};

export const useResize = (options: UseResizeOptions) => {
  const bodyHeight = ref<number>(options.height || 100);
  const bodyWidth = ref<number>(options.width || 100);
  // 计算表格体高度
  const calculateBodyHeight = () => {
    if (!options.tableBodyRef.value) {
      return;
    }
    const boundClient = options.tableBodyRef.value.getBoundingClientRect();
    const height = options.height || boundClient.height || 0;
    const width = options.width || boundClient.width || 0;
    if (height > 0) {
      const operateHeight = options.recordCreatorProps ? 32 : 0;
      const pageHeight = options.hasPager ? 44 : 0;
      // 设置表格体高度
      bodyHeight.value = height - pageHeight - operateHeight;
    }
    if (width > 0) {
      bodyWidth.value = width;
    }
  };
  // 监听窗口大小变化
  const handleResize = () => {
    nextTick(calculateBodyHeight);
  };

  onMounted(() => {
    nextTick(() => {
      calculateBodyHeight();
      window.addEventListener('resize', handleResize);
    });
  });
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });

  return {
    bodyHeight,
    bodyWidth,
    calculateBodyHeight,
  };
};
