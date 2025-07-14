import { registerContext } from "../plugins/script-preview/component/";
// 在使用的文件中注册
function add(a, b) {
  return a + b;
}

// Functions or variables that need to be called within the script can be registered here.
registerContext({
  add,
});
