import full from "./full.mjs";
import light from "./light.mjs";
import shortcuts from "./shortcuts.mjs";

function useComponents() {
  const components = {
    ...full,
    ...light,
    ...shortcuts,
  };
  const data: string[] = [];
  Object.keys(components).forEach((key) => {
    data.push(key);
  });
  return data;
}

export default {
  full,
  light,
  shortcuts,
  useComponents,
};
