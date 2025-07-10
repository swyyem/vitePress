import { registerContext } from 'vitepress-script-preview/components';

function add(a, b) {
  return a + b;
}

// Functions or variables that need to be called within the script can be registered here.
registerContext({
  add
});