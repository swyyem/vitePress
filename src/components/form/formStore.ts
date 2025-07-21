/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormRules, FormItemProps } from "element-plus";
import { reactive, ref, watch, toRaw } from "vue";
import { isEqual } from "lodash-unified";
import { isArray } from "../utils";
import { removeInternalKey } from "../proTable/utils";
import { structuredClone } from "./utils";
import type { Ref } from "vue";
import type {
  DisplayEnum,
  EffectType,
  EffectContextType,
  ProFormProps,
  EffectCallbackType,
} from "./index";
import type { ProSchemaValueEnumType } from "../proField/index";
// {
//   "target": "key",
//   "decorator": {
//     display: "ctx.$self.value === '123' ? 'none' : 'visible'"
//   }
// }
// required 合入到 rules 中
type StateType = {
  display?: DisplayEnum;
  label?: string;
  required?: boolean;
  rules?: FormItemProps["rules"];
} & Record<string, any>;

const getRequiredIndex = (rules: StateType["rules"]) => {
  const realRules = isArray(rules) ? rules : [rules];
  const index = realRules.findIndex((rule) => rule?.required);
  return index;
};
const requiredMergeRules = ({
  required,
  rules,
  label,
}: {
  required?: boolean;
  rules?: StateType["rules"];
  label?: string;
}) => {
  const tpRules = rules || [];
  const realRules = isArray(tpRules) ? tpRules : [tpRules];
  if (typeof required === "boolean") {
    const index = getRequiredIndex(realRules);
    if (required) {
      const curRule = { required: true, message: `${label}不能为空` };
      // 不存在时添加
      if (index === -1) {
        realRules.push(curRule);
      }
    } else {
      // 存在时删除
      if (index !== -1) {
        realRules.splice(index, 1);
      }
    }
  }
  return realRules;
};
const getOptionByValue = (
  value: any,
  valueEnum?: ProSchemaValueEnumType[],
  option?: ProSchemaValueEnumType | ProSchemaValueEnumType[]
): ProSchemaValueEnumType | ProSchemaValueEnumType[] | undefined => {
  if (option) {
    return toRaw(option);
  }
  if (isArray(valueEnum)) {
    const cur = valueEnum.find((item) => item.value === value);
    return cur ? toRaw(cur) : undefined;
  }
  return undefined;
};
// 单个 Field 的数据
class FormModel {
  private key: string; // 标记
  private state: StateType;

  constructor(key: string, state: StateType) {
    this.key = key;
    const { display, required, rules, label, ...rest } = state;
    const realRules = requiredMergeRules({
      required,
      rules,
      label: label || key,
    });
    const initialValue: StateType = {
      display,
      label,
      required, // 标记
      ...rest,
    };
    if (realRules.length) {
      initialValue.rules = realRules;
    }
    this.state = reactive(initialValue);
  }

  // 暂无使用场景，先不处理
  setStates(state: StateType) {
    Object.assign(this.state, state);
  }

  getState(stateKey: string) {
    return this.state[stateKey];
  }

  setState(stateKey: string | string[], value: any) {
    // filedProps 场景
    if (isArray(stateKey)) {
      let current = this.state;
      const lastIndex = stateKey.length - 1;
      for (let i = 0; i < lastIndex; i++) {
        const key = stateKey[i];
        if (!current[key]) {
          current[key] = {};
        }
        current = current[key];
      }
      current[stateKey[lastIndex]] = value;
    } else {
      // required 变化时，需要合并到 rules
      if (stateKey === "required") {
        const rules = requiredMergeRules({
          required: value,
          rules: this.state.rules,
          label: this.state.label || this.key,
        });
        this.state["rules"] = rules;
        this.state["required"] = value;
      } else if (stateKey === "rules") {
        const newRules = isArray(value) ? value : [value];
        const hasIndex = getRequiredIndex(newRules);
        // 传入的 requried 优先
        if (hasIndex > -1) {
          this.state["rules"] = newRules;
        } else {
          const originRule = this.state.rules ? this.state.rules : [];
          const existIndex = getRequiredIndex(originRule);
          const lastRules = newRules.slice();
          // rules 已经存在 required，合入到新的 rules 中
          if (existIndex > -1) {
            lastRules.push((originRule as any)[existIndex]);
          }
          this.state["rules"] = lastRules;
        }
      } else if (stateKey === "label" && this.state.required) {
        this.state["rules"] = requiredMergeRules({
          required: this.state.required,
          rules: this.state.rules,
          label: value || this.key,
        });
        this.state["label"] = value;
      } else {
        this.state[stateKey] = value;
      }
    }
    return this.state;
  }
}

// 执行字符串表达式
const evaluateExpression = (expression: string, context: any) => {
  try {
    const fn = new Function(
      "ctx",
      `
      return ${expression};
    `
    );
    return fn(context);
  } catch (error) {
    console.error("表达式执行错误:", error);
    return null;
  }
};
type ValuesType = Record<string, any>;

// form 的 rules 和 fieldForm 的rules 需要统一
class FormStore {
  private values: ValuesType;
  private rules: FormRules;
  private models: Record<string, FormModel>;
  private instances: Record<string, any>[];
  private effects: Record<string, EffectType[]> = {};
  private effectCbs: Record<string, EffectCallbackType> = {};
  private mode: Ref<ProFormProps["mode"]>;
  private removeValues: ValuesType = {};
  private watchStopCbs: Record<string, () => void> = {};
  constructor(
    values?: ValuesType,
    rules?: FormRules,
    mode?: ProFormProps["mode"]
  ) {
    this.values = reactive(values || {});
    this.rules = rules || {}; // 不支持后续的 form 上 rules 的变化
    this.models = {};
    this.instances = [];
    // 确保 mode 的类型与 ProFormProps['mode'] 一致
    this.mode = ref<ProFormProps["mode"]>(mode || "edit");
  }

  addModel(key: string, state: StateType) {
    // 不存在则添加
    if (!this.models[key]) {
      // 先获取 form 的 rules
      const curRule = this.rules[key];
      const stateRule = state.rules;
      state.rules = stateRule || curRule;
      if (curRule && stateRule) {
        // 确保 rules 是数组形式
        const curRuleArray = isArray(curRule) ? curRule : [curRule];
        const stateRuleArray = isArray(stateRule) ? stateRule : [stateRule];
        state.rules = [...curRuleArray, ...stateRuleArray];
      }
      this.models[key] = new FormModel(key, state);
    }
    this.removeSnapshotValue(key);
  }

  getModel(key: string) {
    return this.models[key];
  }

  removeModel(key: string) {
    delete this.models[key];
  }

  addEffectCb(sourceKey: string, cb: EffectCallbackType) {
    this.effectCbs[sourceKey] = cb;
  }

  getEffectCb(sourceKey: string) {
    return this.effectCbs[sourceKey];
  }

  removeEffectCb(sourceKey: string) {
    delete this.effectCbs[sourceKey];
  }

  addEffect(sourceKey: string, effects?: EffectType[]) {
    if (!effects?.length) {
      return;
    }
    const transEffects = effects.map((item) => {
      const { trigger = "change" } = item;
      return {
        ...item,
        trigger: trigger,
      };
    });
    this.effects[sourceKey] = transEffects;
    // effects 中的 trigger 为 change 时，需要监听值的变化
    const hasChange = transEffects.some(
      (effect) => effect.trigger === "change"
    );
    // 监听值的变化
    if (hasChange) {
      this.watchStopCbs[sourceKey] = watch(
        () => this.getValue(sourceKey),
        (newVal, oldVal) => {
          if (!isEqual(newVal, oldVal)) {
            this.runEffects(sourceKey, "change");
          }
        },
        { deep: true }
      );
    }
  }

  removeEffect(sourceKey: string) {
    delete this.effects[sourceKey];
    // 删除 effect 同时移除 effectCb
    this.removeEffectCb(sourceKey);
    this.watchStopCbs[sourceKey]?.();
    delete this.watchStopCbs[sourceKey];
  }

  getEffectContext(
    sourceKey: string,
    targetKeys: string[],
    isArr: boolean
  ): EffectContextType {
    const arr = targetKeys.map((key) => {
      const val = this.getValue(key);
      const curModel = this.getModel(key);
      const option = getOptionByValue(
        val,
        curModel?.getState("valueEnum"),
        curModel?.getState("option")
      );
      return {
        option,
        value: val,
        rules: curModel?.getState("rule"),
      };
    });
    const selfValue = this.getValue(sourceKey);
    const selfModel = this.getModel(sourceKey);
    const selfOption = getOptionByValue(
      selfValue,
      selfModel?.getState("valueEnum"),
      selfModel?.getState("option")
    );
    return {
      $self: {
        option: selfOption,
        value: selfValue,
        rules: selfModel?.getState("rule"),
      },
      $target: isArr ? arr : arr[0],
    };
  }

  executeEffect(
    obj: EffectType["decorator"] | EffectType["component"],
    context: EffectContextType,
    tar: string,
    isComponent?: boolean
  ) {
    if (obj) {
      Object.entries(obj).forEach(([decoratorKey, expression]) => {
        if (!expression) {
          return;
        }
        const result =
          typeof expression === "string"
            ? evaluateExpression(expression, context)
            : expression(context, this.getNormalValues());
        // this.setEffect(tar, decoratorKey, result, isComponent)
        // 处理 result 为 Promise 的情况
        if (result instanceof Promise) {
          result
            .then((v) => {
              this.setEffect(tar, decoratorKey, v, isComponent);
            })
            .catch((error) => {
              console.error("ProForm Effect Promise 执行错误:", error);
            });
        } else {
          this.setEffect(tar, decoratorKey, result, isComponent);
        }
      });
    }
  }

  runEffects(sourceKey: string, trigger: EffectType["trigger"]) {
    const effects = this.effects[sourceKey]?.filter(
      (effect) => effect.trigger === trigger
    );
    if (!effects?.length) {
      return;
    }
    effects.forEach((effect) => {
      const { target, decorator, component, batchLogic } = effect;
      const targets = isArray(target) ? target : [target];
      const context = this.getEffectContext(
        sourceKey,
        targets,
        isArray(target)
      );
      targets.forEach((tar) => {
        const model = this.getModel(tar);
        if (!model) {
          return;
        }
        this.executeEffect(decorator, context, tar);
        this.executeEffect(component, context, tar, true);
      });
      // batchLogic 批量操作
      if (batchLogic) {
        batchLogic(context.$self.value, {
          getValue: (key: string) => {
            return removeInternalKey(toRaw(this.getValue(key)));
          },
          setFormValues: (values: ValuesType) => {
            if (values) {
              // 嵌套时使用 setValues 有问题
              Object.keys(values).forEach((key) => {
                this.setValue(key, values[key]);
              });
            }
          },
        });
      }
    });
  }

  setEffect(key: string, stateKey: string, value: any, isComponent?: boolean) {
    if (stateKey === "value") {
      this.setValue(key, value);
    } else {
      const model = this.getModel(key);
      const effectCb = this.getEffectCb(key);
      if (isComponent) {
        const modelState = model?.setState(["fieldProps", stateKey], value);
        effectCb?.("fieldProps", modelState.fieldProps);
      } else {
        model?.setState(stateKey, value);
        effectCb?.(stateKey, value);
      }
    }
  }

  addInstance(key: string, instance: any, getInstance: () => any) {
    this.instances.push({
      key,
      instance,
      getInstance,
    });
    // console.log('=instances=', this.instances)
  }

  removeInstance(key: string) {
    const index = this.instances.findIndex((item) => item.key === key);
    this.instances.splice(index, 1);
  }

  getInstances() {
    return this.instances;
  }

  getValues() {
    return this.values;
  }

  getNormalValues() {
    return structuredClone(toRaw(this.values));
  }

  getLogicValues() {
    const cloneData = structuredClone(this.values);
    Object.keys(this.removeValues).forEach((key) => {
      this.removeValue(key, cloneData);
    });
    return cloneData;
  }

  // 可选覆盖
  setValues(values: ValuesType, isCover?: boolean) {
    const v = structuredClone(values);
    if (isCover) {
      // 清空当前值
      Object.keys(this.values).forEach((key) => {
        delete this.values[key];
      });
      // 添加新值
      Object.keys(v).forEach((key) => {
        this.values[key] = v[key];
      });
    } else {
      Object.keys(v).forEach((key) => {
        this.values[key] = v[key];
      });
    }
  }

  deleteValues(values: ValuesType) {
    Object.keys(this.values).forEach((key) => {
      if (values[key]) {
        delete this.values[key];
      }
    });
  }

  getValue(key: string) {
    const keyArr = String(key).split(".");
    if (keyArr.length === 1) {
      return this.values[key];
    }
    return keyArr.reduce((obj, k) => {
      if (k.includes("[") && k.includes("]")) {
        const [arrayKey, indexStr] = k.split("[");
        const index = parseInt(indexStr.replace("]", ""));
        return obj?.[arrayKey]?.[index];
      }
      return obj?.[k];
    }, this.values);
  }

  setValue(key: string, value: any) {
    const keyArr = key.split(".");
    if (keyArr.length === 1) {
      this.values[key] = value;
    } else {
      const lastKey = keyArr.pop()!;
      const target = keyArr.reduce((obj, k) => {
        if (k.includes("[") && k.includes("]")) {
          const [arrayKey, indexStr] = k.split("[");
          const index = parseInt(indexStr.replace("]", ""));
          if (!obj[arrayKey]) obj[arrayKey] = [];
          if (!obj[arrayKey][index]) obj[arrayKey][index] = {};
          return obj[arrayKey][index];
        }
        if (!obj[k]) obj[k] = {};
        return obj[k];
      }, this.values);
      if (lastKey.includes("[") && lastKey.includes("]")) {
        const [arrayKey, indexStr] = lastKey.split("[");
        const index = parseInt(indexStr.replace("]", ""));
        if (!target[arrayKey]) target[arrayKey] = [];
        target[arrayKey][index] = value;
      } else {
        target[lastKey] = value;
      }
    }
  }

  removeValue(key: string, obj?: ValuesType) {
    const keyArr = key.split(".");
    const realValues = obj || this.values;
    if (keyArr.length === 1) {
      delete realValues[key];
    } else {
      const lastKey = keyArr.pop()!;
      const target = keyArr.reduce((obj, k) => {
        if (k.includes("[") && k.includes("]")) {
          const [arrayKey, indexStr] = k.split("[");
          const index = parseInt(indexStr.replace("]", ""));
          return obj?.[arrayKey]?.[index];
        }
        return obj?.[k];
      }, realValues);
      if (target) {
        if (lastKey.includes("[") && lastKey.includes("]")) {
          const [arrayKey, indexStr] = lastKey.split("[");
          const index = parseInt(indexStr.replace("]", ""));
          if (target[arrayKey]) {
            target[arrayKey].splice(index, 1);
            if (target[arrayKey].length === 0) {
              delete target[arrayKey];
            }
          }
        } else {
          delete target[lastKey];
        }
        // 如果父对象为空，递归删除
        if (Object.keys(target).length === 0) {
          this.removeValue(keyArr.join("."), realValues);
        }
      }
    }
  }

  // 逻辑移除值
  removeSnapshot(key: string) {
    this.removeValues[key] = key;
  }

  // 从快照中移除
  removeSnapshotValue(key: string) {
    if (this.removeValues[key]) {
      delete this.removeValues[key];
    }
  }

  setRules(rules: FormRules) {
    Object.assign(this.rules, rules);
  }

  getRule(key: string) {
    return this.getModel(key)?.getState("rules");
  }

  setRule(key: string, rule: FormItemProps["rules"]) {
    const model = this.getModel(key);
    model?.setState("rules", rule);
  }

  getMode() {
    return this.mode.value;
  }

  setMode(mode: ProFormProps["mode"]) {
    this.mode.value = mode;
  }
}
export default FormStore;
