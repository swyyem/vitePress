import type { FunctionalComponent } from 'vue';
import { h } from 'vue';
import type { SubmitterProps } from './index';
import type { RowProps } from 'element-plus';
import { ElButton, ElRow } from 'element-plus';

// @typescript-eslint/no-explicit-any

/**
 * 表单页脚提交组件
 * 功能：提供表单提交、重置按钮的统一封装
 * 特性：
 * 1. 支持自定义渲染模式
 * 2. 支持按钮显隐控制
 * 3. 支持按钮对齐方式配置
 * 4. 支持按钮属性透传
 */
const FormFooter: FunctionalComponent<SubmitterProps> = props => {
  // 如果明确设置 render=false，则不渲染任何内容
  if (props.render === false) {
    return null;
  }

  // 解构props参数，设置默认值
  const {
    onSubmit, // 提交回调函数
    onReset, // 重置回调函数
    render, // 自定义渲染函数
    searchConfig = {}, // 搜索配置（包含按钮文本）
    submitButtonProps, // 提交按钮属性
    resetButtonProps, // 重置按钮属性
    align = 'right', // 按钮对齐方式，默认右对齐
  } = props;

  // 对齐方式映射表（将语义化对齐转换为Element Plus的justify值）
  const justifyMap = {
    left: 'start',
    right: 'end',
    center: 'center',
  };

  // 提交按钮点击处理
  const submit = () => {
    onSubmit?.(); // 安全调用，避免未定义时报错
  };

  // 重置按钮点击处理
  const reset = (e: MouseEvent) => {
    onReset?.(e); // 传递事件对象
  };

  // 从配置中获取按钮文本，设置默认值
  const { submitText = '保存', resetText = '重置' } = searchConfig;

  // 按钮DOM数组
  const dom: any = [];

  // 渲染提交按钮（当submitButtonProps不为false时）
  if (submitButtonProps !== false) {
    dom.push(
      h(
        ElButton,
        {
          type: 'primary',
          ...submitButtonProps,
          onClick: () => {
            submit();
          },
        },
        () => submitText
      )
    );
  }

  // 渲染重置按钮（当resetButtonProps不为false时）
  if (resetButtonProps !== false) {
    dom.push(
      h(
        ElButton,
        {
          ...resetButtonProps,
          onClick: e => {
            reset(e); // 传递事件对象
          },
        },
        () => resetText
      )
    );
  }

  // 最终渲染的DOM
  const renderDom = render
    ? // 自定义渲染模式：将props和基础DOM传递给render函数
      render(
        { ...props, submit, reset },
        dom.filter((item: any) => typeof item !== 'number')
      )
    : dom.length > 0
      ? // 默认渲染模式：使用ElRow布局
        h(
          ElRow,
          { justify: justifyMap[align] as RowProps['justify'], style: { marginTop: '16px' } },
          () => dom
        )
      : null; // 没有按钮时不渲染
  console.log(dom);

  return renderDom;
};

// 设置组件显示名称（便于调试）
FormFooter.displayName = 'FormFooter';

export default FormFooter;
