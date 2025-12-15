---
outline: deep
---

## 注册或执行方法

<script setup>
import { registerContext } from '@script-preview';
function add(a, b) {
  return a + b;
}

function multiply() {
  const a=JSON.stringify({a:1})
  const b=a&&JSON.parse(a)
  console.log(b)
  return b
}
// 脚本内需要调用的函数或变量可以在这里注册
registerContext({
  add,
  multiply
});
</script>

::: script-preview expand=true
console.log('1 + 2 =', add(1, 2));
console.log('Hello VitePress!');
console.log('1 \* 2 =', multiply());
console.error('This is an error message.');

:::
