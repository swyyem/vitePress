import {
  Fragment,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createTextVNode,
  createVNode,
  defineComponent,
  isVNode,
  mergeProps,
  nextTick,
  normalizeClass,
  normalizeProps,
  normalizeStyle,
  onBeforeUnmount,
  onMounted,
  openBlock,
  ref,
  renderList,
  renderSlot,
  resolveDynamicComponent,
  toDisplayString,
  unref,
  useAttrs,
  watch,
  watchEffect,
  withCtx
} from "./chunk-R2IJRJAJ.js";
import {
  __publicField
} from "./chunk-EQCVQC35.js";

// node_modules/.pnpm/vue-sonner@2.0.2/node_modules/vue-sonner/lib/index.js
var toastsCounter = 1;
var Observer = class {
  constructor() {
    __publicField(this, "subscribers");
    __publicField(this, "toasts");
    __publicField(this, "dismissedToasts");
    __publicField(this, "subscribe", (subscriber) => {
      this.subscribers.push(subscriber);
      return () => {
        const index = this.subscribers.indexOf(subscriber);
        this.subscribers.splice(index, 1);
      };
    });
    __publicField(this, "publish", (data) => {
      this.subscribers.forEach((subscriber) => subscriber(data));
    });
    __publicField(this, "addToast", (data) => {
      this.publish(data);
      this.toasts = [...this.toasts, data];
    });
    __publicField(this, "create", (data) => {
      var _a;
      const { message, ...rest } = data;
      const id = typeof data.id === "number" || data.id && ((_a = data.id) == null ? void 0 : _a.length) > 0 ? data.id : toastsCounter++;
      const alreadyExists = this.toasts.find((toast$1) => {
        return toast$1.id === id;
      });
      const dismissible = data.dismissible === void 0 ? true : data.dismissible;
      if (this.dismissedToasts.has(id)) this.dismissedToasts.delete(id);
      if (alreadyExists) this.toasts = this.toasts.map((toast$1) => {
        if (toast$1.id === id) {
          this.publish({
            ...toast$1,
            ...data,
            id,
            title: message
          });
          return {
            ...toast$1,
            ...data,
            id,
            dismissible,
            title: message
          };
        }
        return toast$1;
      });
      else this.addToast({
        title: message,
        ...rest,
        dismissible,
        id
      });
      return id;
    });
    __publicField(this, "dismiss", (id) => {
      if (id) {
        this.dismissedToasts.add(id);
        requestAnimationFrame(() => this.subscribers.forEach((subscriber) => subscriber({
          id,
          dismiss: true
        })));
      } else this.toasts.forEach((toast$1) => {
        this.subscribers.forEach((subscriber) => subscriber({
          id: toast$1.id,
          dismiss: true
        }));
      });
      return id;
    });
    __publicField(this, "message", (message, data) => {
      return this.create({
        ...data,
        message,
        type: "default"
      });
    });
    __publicField(this, "error", (message, data) => {
      return this.create({
        ...data,
        type: "error",
        message
      });
    });
    __publicField(this, "success", (message, data) => {
      return this.create({
        ...data,
        type: "success",
        message
      });
    });
    __publicField(this, "info", (message, data) => {
      return this.create({
        ...data,
        type: "info",
        message
      });
    });
    __publicField(this, "warning", (message, data) => {
      return this.create({
        ...data,
        type: "warning",
        message
      });
    });
    __publicField(this, "loading", (message, data) => {
      return this.create({
        ...data,
        type: "loading",
        message
      });
    });
    __publicField(this, "promise", (promise, data) => {
      if (!data) return;
      let id;
      if (data.loading !== void 0) id = this.create({
        ...data,
        promise,
        type: "loading",
        message: data.loading,
        description: typeof data.description !== "function" ? data.description : void 0
      });
      const p = Promise.resolve(promise instanceof Function ? promise() : promise);
      let shouldDismiss = id !== void 0;
      let result;
      const originalPromise = p.then(async (response) => {
        result = ["resolve", response];
        const isVueComponent = isVNode(response);
        if (isVueComponent) {
          shouldDismiss = false;
          this.create({
            id,
            type: "default",
            message: response
          });
        } else if (isHttpResponse(response) && !response.ok) {
          shouldDismiss = false;
          const promiseData = typeof data.error === "function" ? await data.error(`HTTP error! status: ${response.status}`) : data.error;
          const description = typeof data.description === "function" ? await data.description(`HTTP error! status: ${response.status}`) : data.description;
          const isExtendedResult = typeof promiseData === "object" && !isVNode(promiseData);
          const toastSettings = isExtendedResult ? promiseData : {
            message: promiseData || "",
            id: id || ""
          };
          this.create({
            id,
            type: "error",
            description,
            ...toastSettings
          });
        } else if (response instanceof Error) {
          shouldDismiss = false;
          const promiseData = typeof data.error === "function" ? await data.error(response) : data.error;
          const description = typeof data.description === "function" ? await data.description(response) : data.description;
          const isExtendedResult = typeof promiseData === "object" && !isVNode(promiseData);
          const toastSettings = isExtendedResult ? promiseData : {
            message: promiseData || "",
            id: id || ""
          };
          this.create({
            id,
            type: "error",
            description,
            ...toastSettings
          });
        } else if (data.success !== void 0) {
          shouldDismiss = false;
          const promiseData = typeof data.success === "function" ? await data.success(response) : data.success;
          const description = typeof data.description === "function" ? await data.description(response) : data.description;
          const isExtendedResult = typeof promiseData === "object" && !isVNode(promiseData);
          const toastSettings = isExtendedResult ? promiseData : {
            message: promiseData || "",
            id: id || ""
          };
          this.create({
            id,
            type: "success",
            description,
            ...toastSettings
          });
        }
      }).catch(async (error) => {
        result = ["reject", error];
        if (data.error !== void 0) {
          shouldDismiss = false;
          const promiseData = typeof data.error === "function" ? await data.error(error) : data.error;
          const description = typeof data.description === "function" ? await data.description(error) : data.description;
          const isExtendedResult = typeof promiseData === "object" && !isVNode(promiseData);
          const toastSettings = isExtendedResult ? promiseData : {
            message: promiseData || "",
            id: id || ""
          };
          this.create({
            id,
            type: "error",
            description,
            ...toastSettings
          });
        }
      }).finally(() => {
        var _a;
        if (shouldDismiss) {
          this.dismiss(id);
          id = void 0;
        }
        (_a = data.finally) == null ? void 0 : _a.call(data);
      });
      const unwrap = () => new Promise((resolve, reject) => originalPromise.then(() => result[0] === "reject" ? reject(result[1]) : resolve(result[1])).catch(reject));
      if (typeof id !== "string" && typeof id !== "number") return { unwrap };
      else return Object.assign(id, { unwrap });
    });
    __publicField(this, "custom", (component, data) => {
      const id = (data == null ? void 0 : data.id) || toastsCounter++;
      this.publish({
        component,
        id,
        ...data
      });
      return id;
    });
    __publicField(this, "getActiveToasts", () => {
      return this.toasts.filter((toast$1) => !this.dismissedToasts.has(toast$1.id));
    });
    this.subscribers = [];
    this.toasts = [];
    this.dismissedToasts = /* @__PURE__ */ new Set();
  }
};
var ToastState = new Observer();
function toastFunction(message, data) {
  const id = (data == null ? void 0 : data.id) || toastsCounter++;
  ToastState.create({
    message,
    id,
    type: "default",
    ...data
  });
  return id;
}
var isHttpResponse = (data) => {
  return data && typeof data === "object" && "ok" in data && typeof data.ok === "boolean" && "status" in data && typeof data.status === "number";
};
var basicToast = toastFunction;
var getHistory = () => ToastState.toasts;
var getToasts = () => ToastState.getActiveToasts();
var toast = Object.assign(basicToast, {
  success: ToastState.success,
  info: ToastState.info,
  warning: ToastState.warning,
  error: ToastState.error,
  custom: ToastState.custom,
  message: ToastState.message,
  promise: ToastState.promise,
  dismiss: ToastState.dismiss,
  loading: ToastState.loading
}, {
  getHistory,
  getToasts
});
function isAction(action) {
  return action.label !== void 0;
}
var VISIBLE_TOASTS_AMOUNT = 3;
var VIEWPORT_OFFSET = "24px";
var MOBILE_VIEWPORT_OFFSET = "16px";
var TOAST_LIFETIME = 4e3;
var TOAST_WIDTH = 356;
var GAP = 14;
var SWIPE_THRESHOLD = 45;
var TIME_BEFORE_UNMOUNT = 200;
function useIsDocumentHidden() {
  const isDocumentHidden = ref(false);
  watchEffect(() => {
    const callback = () => {
      isDocumentHidden.value = document.hidden;
    };
    document.addEventListener("visibilitychange", callback);
    return () => window.removeEventListener("visibilitychange", callback);
  });
  return { isDocumentHidden };
}
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
function getDefaultSwipeDirections(position) {
  const [y, x] = position.split("-");
  const directions = [];
  if (y) directions.push(y);
  if (x) directions.push(x);
  return directions;
}
function assignOffset(defaultOffset, mobileOffset) {
  const styles = {};
  [defaultOffset, mobileOffset].forEach((offset, index) => {
    const isMobile = index === 1;
    const prefix = isMobile ? "--mobile-offset" : "--offset";
    const defaultValue = isMobile ? MOBILE_VIEWPORT_OFFSET : VIEWPORT_OFFSET;
    function assignAll(offset$1) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((key) => {
        styles[`${prefix}-${key}`] = typeof offset$1 === "number" ? `${offset$1}px` : offset$1;
      });
    }
    if (typeof offset === "number" || typeof offset === "string") assignAll(offset);
    else if (typeof offset === "object") [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((key) => {
      if (offset[key] === void 0) styles[`${prefix}-${key}`] = defaultValue;
      else styles[`${prefix}-${key}`] = typeof offset[key] === "number" ? `${offset[key]}px` : offset[key];
    });
    else assignAll(defaultValue);
  });
  return styles;
}
function useVueSonner() {
  const activeToasts = ref([]);
  watchEffect((onInvalidate) => {
    const unsubscribe = ToastState.subscribe((toast$1) => {
      if ("dismiss" in toast$1 && toast$1.dismiss) {
        activeToasts.value = activeToasts.value.filter((t) => t.id !== toast$1.id);
        return;
      }
      nextTick(() => {
        const existingToastIndex = activeToasts.value.findIndex((t) => t.id === toast$1.id);
        if (existingToastIndex !== -1) {
          const updatedToasts = [...activeToasts.value];
          updatedToasts[existingToastIndex] = {
            ...updatedToasts[existingToastIndex],
            ...toast$1
          };
          activeToasts.value = updatedToasts;
        } else activeToasts.value = [toast$1, ...activeToasts.value];
      });
    });
    onInvalidate(() => {
      unsubscribe();
    });
  });
  return { activeToasts };
}
var _hoisted_1$7 = [
  "data-rich-colors",
  "data-styled",
  "data-mounted",
  "data-promise",
  "data-swiped",
  "data-removed",
  "data-visible",
  "data-y-position",
  "data-x-position",
  "data-index",
  "data-front",
  "data-swiping",
  "data-dismissible",
  "data-type",
  "data-invert",
  "data-swipe-out",
  "data-swipe-direction",
  "data-expanded"
];
var _hoisted_2$2 = ["aria-label", "data-disabled"];
var Toast_vue_vue_type_script_setup_true_lang_default = defineComponent({
  __name: "Toast",
  props: {
    toast: {},
    toasts: {},
    index: {},
    swipeDirections: {},
    expanded: { type: Boolean },
    invert: { type: Boolean },
    heights: {},
    gap: {},
    position: {},
    visibleToasts: {},
    expandByDefault: { type: Boolean },
    closeButton: { type: Boolean },
    interacting: { type: Boolean },
    style: {},
    cancelButtonStyle: {},
    actionButtonStyle: {},
    duration: {},
    class: {},
    unstyled: { type: Boolean },
    descriptionClass: {},
    loadingIcon: {},
    classes: {},
    icons: {},
    closeButtonAriaLabel: {},
    defaultRichColors: { type: Boolean }
  },
  emits: [
    "update:heights",
    "update:height",
    "removeToast"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const swipeDirection = ref(null);
    const swipeOutDirection = ref(null);
    const mounted = ref(false);
    const removed = ref(false);
    const swiping = ref(false);
    const swipeOut = ref(false);
    const swiped = ref(false);
    const offsetBeforeRemove = ref(0);
    const initialHeight = ref(0);
    const remainingTime = ref(props.toast.duration || props.duration || TOAST_LIFETIME);
    const dragStartTime = ref(null);
    const toastRef = ref(null);
    const isFront = computed(() => props.index === 0);
    const isVisible = computed(() => props.index + 1 <= props.visibleToasts);
    const toastType = computed(() => props.toast.type);
    const dismissible = computed(() => props.toast.dismissible !== false);
    const toastClass = computed(() => props.toast.class || "");
    const toastDescriptionClass = computed(() => props.descriptionClass || "");
    const heightIndex = computed(() => {
      const currentPosition = props.toast.position || props.position;
      const samePositionHeights = props.heights.filter((h) => h.position === currentPosition);
      const index = samePositionHeights.findIndex((height) => height.toastId === props.toast.id);
      return index >= 0 ? index : 0;
    });
    const toastsHeightBefore = computed(() => {
      const currentPosition = props.toast.position || props.position;
      const samePositionHeights = props.heights.filter((h) => h.position === currentPosition);
      return samePositionHeights.reduce((prev, curr, reducerIndex) => {
        if (reducerIndex >= heightIndex.value) return prev;
        return prev + curr.height;
      }, 0);
    });
    const offset = computed(() => heightIndex.value * props.gap + toastsHeightBefore.value || 0);
    const closeButton = computed(() => props.toast.closeButton ?? props.closeButton);
    const duration = computed(() => props.toast.duration || props.duration || TOAST_LIFETIME);
    const closeTimerStartTimeRef = ref(0);
    const lastCloseTimerStartTimeRef = ref(0);
    const pointerStartRef = ref(null);
    const coords = computed(() => props.position.split("-"));
    const y = computed(() => coords.value[0]);
    const x = computed(() => coords.value[1]);
    const isStringOfTitle = computed(() => typeof props.toast.title !== "string");
    const isStringOfDescription = computed(() => typeof props.toast.description !== "string");
    const { isDocumentHidden } = useIsDocumentHidden();
    const disabled = computed(() => toastType.value && toastType.value === "loading");
    onMounted(() => {
      mounted.value = true;
      remainingTime.value = duration.value;
    });
    watchEffect(async () => {
      if (!mounted.value || !toastRef.value) return;
      await nextTick();
      const toastNode = toastRef.value;
      const originalHeight = toastNode.style.height;
      toastNode.style.height = "auto";
      const newHeight = toastNode.getBoundingClientRect().height;
      toastNode.style.height = originalHeight;
      initialHeight.value = newHeight;
      emit("update:height", {
        toastId: props.toast.id,
        height: newHeight,
        position: props.toast.position || props.position
      });
    });
    function deleteToast() {
      removed.value = true;
      offsetBeforeRemove.value = offset.value;
      setTimeout(() => {
        emit("removeToast", props.toast);
      }, TIME_BEFORE_UNMOUNT);
    }
    function handleCloseToast() {
      var _a, _b;
      if (disabled.value || !dismissible.value) return {};
      deleteToast();
      (_b = (_a = props.toast).onDismiss) == null ? void 0 : _b.call(_a, props.toast);
    }
    function onPointerDown(event) {
      if (disabled.value || !dismissible.value) return;
      dragStartTime.value = /* @__PURE__ */ new Date();
      offsetBeforeRemove.value = offset.value;
      event.target.setPointerCapture(event.pointerId);
      if (event.target.tagName === "BUTTON") return;
      swiping.value = true;
      pointerStartRef.value = {
        x: event.clientX,
        y: event.clientY
      };
    }
    function onPointerUp() {
      var _a, _b, _c, _d, _e, _f, _g;
      if (swipeOut.value || !dismissible.value) return;
      pointerStartRef.value = null;
      const swipeAmountX = Number(((_a = toastRef.value) == null ? void 0 : _a.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0);
      const swipeAmountY = Number(((_b = toastRef.value) == null ? void 0 : _b.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0);
      const timeTaken = (/* @__PURE__ */ new Date()).getTime() - (((_c = dragStartTime.value) == null ? void 0 : _c.getTime()) || 0);
      const swipeAmount = swipeDirection.value === "x" ? swipeAmountX : swipeAmountY;
      const velocity = Math.abs(swipeAmount) / timeTaken;
      if (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > 0.11) {
        offsetBeforeRemove.value = offset.value;
        (_e = (_d = props.toast).onDismiss) == null ? void 0 : _e.call(_d, props.toast);
        if (swipeDirection.value === "x") swipeOutDirection.value = swipeAmountX > 0 ? "right" : "left";
        else swipeOutDirection.value = swipeAmountY > 0 ? "down" : "up";
        deleteToast();
        swipeOut.value = true;
        return;
      } else {
        (_f = toastRef.value) == null ? void 0 : _f.style.setProperty("--swipe-amount-x", `0px`);
        (_g = toastRef.value) == null ? void 0 : _g.style.setProperty("--swipe-amount-y", `0px`);
      }
      swiped.value = false;
      swiping.value = false;
      swipeDirection.value = null;
    }
    function onPointerMove(event) {
      var _a, _b, _c, _d;
      if (!pointerStartRef.value || !dismissible.value) return;
      const isHighlighted = ((_b = (_a = window == null ? void 0 : window.getSelection()) == null ? void 0 : _a.toString()) == null ? void 0 : _b.length) ?? false;
      if (isHighlighted) return;
      const yDelta = event.clientY - pointerStartRef.value.y;
      const xDelta = event.clientX - pointerStartRef.value.x;
      const swipeDirections = props.swipeDirections ?? getDefaultSwipeDirections(props.position);
      if (!swipeDirection.value && (Math.abs(xDelta) > 1 || Math.abs(yDelta) > 1)) swipeDirection.value = Math.abs(xDelta) > Math.abs(yDelta) ? "x" : "y";
      let swipeAmount = {
        x: 0,
        y: 0
      };
      const getDampening = (delta) => {
        const factor = Math.abs(delta) / 20;
        return 1 / (1.5 + factor);
      };
      if (swipeDirection.value === "y") {
        if (swipeDirections.includes("top") || swipeDirections.includes("bottom")) if (swipeDirections.includes("top") && yDelta < 0 || swipeDirections.includes("bottom") && yDelta > 0) swipeAmount.y = yDelta;
        else {
          const dampenedDelta = yDelta * getDampening(yDelta);
          swipeAmount.y = Math.abs(dampenedDelta) < Math.abs(yDelta) ? dampenedDelta : yDelta;
        }
      } else if (swipeDirection.value === "x") {
        if (swipeDirections.includes("left") || swipeDirections.includes("right")) if (swipeDirections.includes("left") && xDelta < 0 || swipeDirections.includes("right") && xDelta > 0) swipeAmount.x = xDelta;
        else {
          const dampenedDelta = xDelta * getDampening(xDelta);
          swipeAmount.x = Math.abs(dampenedDelta) < Math.abs(xDelta) ? dampenedDelta : xDelta;
        }
      }
      if (Math.abs(swipeAmount.x) > 0 || Math.abs(swipeAmount.y) > 0) swiped.value = true;
      (_c = toastRef.value) == null ? void 0 : _c.style.setProperty("--swipe-amount-x", `${swipeAmount.x}px`);
      (_d = toastRef.value) == null ? void 0 : _d.style.setProperty("--swipe-amount-y", `${swipeAmount.y}px`);
    }
    onMounted(() => {
      mounted.value = true;
      if (!toastRef.value) return;
      const height = toastRef.value.getBoundingClientRect().height;
      initialHeight.value = height;
      const newHeights = [{
        toastId: props.toast.id,
        height,
        position: props.toast.position
      }, ...props.heights];
      emit("update:heights", newHeights);
    });
    onBeforeUnmount(() => {
      if (toastRef.value) emit("removeToast", props.toast);
    });
    watchEffect((onInvalidate) => {
      if (props.toast.promise && toastType.value === "loading" || props.toast.duration === Infinity || props.toast.type === "loading") return;
      let timeoutId;
      const pauseTimer = () => {
        if (lastCloseTimerStartTimeRef.value < closeTimerStartTimeRef.value) {
          const elapsedTime = (/* @__PURE__ */ new Date()).getTime() - closeTimerStartTimeRef.value;
          remainingTime.value = remainingTime.value - elapsedTime;
        }
        lastCloseTimerStartTimeRef.value = (/* @__PURE__ */ new Date()).getTime();
      };
      const startTimer = () => {
        if (remainingTime.value === Infinity) return;
        closeTimerStartTimeRef.value = (/* @__PURE__ */ new Date()).getTime();
        timeoutId = setTimeout(() => {
          var _a, _b;
          (_b = (_a = props.toast).onAutoClose) == null ? void 0 : _b.call(_a, props.toast);
          deleteToast();
        }, remainingTime.value);
      };
      if (props.expanded || props.interacting || isDocumentHidden.value) pauseTimer();
      else startTimer();
      onInvalidate(() => {
        clearTimeout(timeoutId);
      });
    });
    watch(() => props.toast.delete, (value) => {
      if (value !== void 0 && value) deleteToast();
    }, { deep: true });
    function handleDragEnd() {
      swiping.value = false;
      swipeDirection.value = null;
      pointerStartRef.value = null;
    }
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A;
      return openBlock(), createElementBlock("li", {
        tabindex: "0",
        ref_key: "toastRef",
        ref: toastRef,
        class: normalizeClass(unref(cn)(props.class, toastClass.value, (_a = _ctx.classes) == null ? void 0 : _a.toast, (_b = _ctx.toast.classes) == null ? void 0 : _b.toast, (_c = _ctx.classes) == null ? void 0 : _c[toastType.value], (_e = (_d = _ctx.toast) == null ? void 0 : _d.classes) == null ? void 0 : _e[toastType.value])),
        "data-sonner-toast": "",
        "data-rich-colors": _ctx.toast.richColors ?? _ctx.defaultRichColors,
        "data-styled": !Boolean(_ctx.toast.component || ((_f = _ctx.toast) == null ? void 0 : _f.unstyled) || _ctx.unstyled),
        "data-mounted": mounted.value,
        "data-promise": Boolean(_ctx.toast.promise),
        "data-swiped": swiped.value,
        "data-removed": removed.value,
        "data-visible": isVisible.value,
        "data-y-position": y.value,
        "data-x-position": x.value,
        "data-index": _ctx.index,
        "data-front": isFront.value,
        "data-swiping": swiping.value,
        "data-dismissible": dismissible.value,
        "data-type": toastType.value,
        "data-invert": _ctx.toast.invert || _ctx.invert,
        "data-swipe-out": swipeOut.value,
        "data-swipe-direction": swipeOutDirection.value,
        "data-expanded": Boolean(_ctx.expanded || _ctx.expandByDefault && mounted.value),
        style: normalizeStyle({
          "--index": _ctx.index,
          "--toasts-before": _ctx.index,
          "--z-index": _ctx.toasts.length - _ctx.index,
          "--offset": `${removed.value ? offsetBeforeRemove.value : offset.value}px`,
          "--initial-height": _ctx.expandByDefault ? "auto" : `${initialHeight.value}px`,
          ..._ctx.style,
          ...props.toast.style
        }),
        onDragend: handleDragEnd,
        onPointerdown: onPointerDown,
        onPointerup: onPointerUp,
        onPointermove: onPointerMove
      }, [closeButton.value && !_ctx.toast.component && toastType.value !== "loading" ? (openBlock(), createElementBlock("button", {
        key: 0,
        "aria-label": _ctx.closeButtonAriaLabel || "Close toast",
        "data-disabled": disabled.value,
        "data-close-button": "true",
        class: normalizeClass(unref(cn)((_g = _ctx.classes) == null ? void 0 : _g.closeButton, (_i = (_h = _ctx.toast) == null ? void 0 : _h.classes) == null ? void 0 : _i.closeButton)),
        onClick: handleCloseToast
      }, [((_j = _ctx.icons) == null ? void 0 : _j.close) ? (openBlock(), createBlock(resolveDynamicComponent((_k = _ctx.icons) == null ? void 0 : _k.close), { key: 0 })) : renderSlot(_ctx.$slots, "close-icon", { key: 1 })], 10, _hoisted_2$2)) : createCommentVNode("v-if", true), _ctx.toast.component ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.toast.component), mergeProps({ key: 1 }, _ctx.toast.componentProps, { onCloseToast: handleCloseToast }), null, 16)) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
        toastType.value !== "default" || _ctx.toast.icon || _ctx.toast.promise ? (openBlock(), createElementBlock("div", {
          key: 0,
          "data-icon": "",
          class: normalizeClass(unref(cn)((_l = _ctx.classes) == null ? void 0 : _l.icon, (_n = (_m = _ctx.toast) == null ? void 0 : _m.classes) == null ? void 0 : _n.icon))
        }, [_ctx.toast.icon ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.toast.icon), { key: 0 })) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [toastType.value === "loading" ? renderSlot(_ctx.$slots, "loading-icon", { key: 0 }) : toastType.value === "success" ? renderSlot(_ctx.$slots, "success-icon", { key: 1 }) : toastType.value === "error" ? renderSlot(_ctx.$slots, "error-icon", { key: 2 }) : toastType.value === "warning" ? renderSlot(_ctx.$slots, "warning-icon", { key: 3 }) : toastType.value === "info" ? renderSlot(_ctx.$slots, "info-icon", { key: 4 }) : createCommentVNode("v-if", true)], 64))], 2)) : createCommentVNode("v-if", true),
        createBaseVNode("div", {
          "data-content": "",
          class: normalizeClass(unref(cn)((_o = _ctx.classes) == null ? void 0 : _o.content, (_q = (_p = _ctx.toast) == null ? void 0 : _p.classes) == null ? void 0 : _q.content))
        }, [createBaseVNode("div", {
          "data-title": "",
          class: normalizeClass(unref(cn)((_r = _ctx.classes) == null ? void 0 : _r.title, (_s = _ctx.toast.classes) == null ? void 0 : _s.title))
        }, [isStringOfTitle.value ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.toast.title), normalizeProps(mergeProps({ key: 0 }, _ctx.toast.componentProps)), null, 16)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(_ctx.toast.title), 1)], 64))], 2), _ctx.toast.description ? (openBlock(), createElementBlock("div", {
          key: 0,
          "data-description": "",
          class: normalizeClass(unref(cn)(_ctx.descriptionClass, toastDescriptionClass.value, (_t = _ctx.classes) == null ? void 0 : _t.description, (_u = _ctx.toast.classes) == null ? void 0 : _u.description))
        }, [isStringOfDescription.value ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.toast.description), normalizeProps(mergeProps({ key: 0 }, _ctx.toast.componentProps)), null, 16)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(_ctx.toast.description), 1)], 64))], 2)) : createCommentVNode("v-if", true)], 2),
        _ctx.toast.cancel ? (openBlock(), createElementBlock("button", {
          key: 1,
          style: normalizeStyle(_ctx.toast.cancelButtonStyle || _ctx.cancelButtonStyle),
          class: normalizeClass(unref(cn)((_v = _ctx.classes) == null ? void 0 : _v.cancelButton, (_w = _ctx.toast.classes) == null ? void 0 : _w.cancelButton)),
          "data-button": "",
          "data-cancel": "",
          onClick: _cache[0] || (_cache[0] = (event) => {
            var _a2, _b2;
            if (!unref(isAction)(_ctx.toast.cancel)) return;
            if (!dismissible.value) return;
            (_b2 = (_a2 = _ctx.toast.cancel).onClick) == null ? void 0 : _b2.call(_a2, event);
            deleteToast();
          })
        }, toDisplayString(unref(isAction)(_ctx.toast.cancel) ? (_x = _ctx.toast.cancel) == null ? void 0 : _x.label : _ctx.toast.cancel), 7)) : createCommentVNode("v-if", true),
        _ctx.toast.action ? (openBlock(), createElementBlock("button", {
          key: 2,
          style: normalizeStyle(_ctx.toast.actionButtonStyle || _ctx.actionButtonStyle),
          class: normalizeClass(unref(cn)((_y = _ctx.classes) == null ? void 0 : _y.actionButton, (_z = _ctx.toast.classes) == null ? void 0 : _z.actionButton)),
          "data-button": "",
          "data-action": "",
          onClick: _cache[1] || (_cache[1] = (event) => {
            var _a2, _b2;
            if (!unref(isAction)(_ctx.toast.action)) return;
            (_b2 = (_a2 = _ctx.toast.action).onClick) == null ? void 0 : _b2.call(_a2, event);
            if (event.defaultPrevented) return;
            deleteToast();
          })
        }, toDisplayString(unref(isAction)(_ctx.toast.action) ? (_A = _ctx.toast.action) == null ? void 0 : _A.label : _ctx.toast.action), 7)) : createCommentVNode("v-if", true)
      ], 64))], 46, _hoisted_1$7);
    };
  }
});
var Toast_default = Toast_vue_vue_type_script_setup_true_lang_default;
var export_helper_default = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) target[key] = val;
  return target;
};
var _sfc_main$4 = {};
var _hoisted_1$6 = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stoke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function _sfc_render$4(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$6, _cache[0] || (_cache[0] = [createBaseVNode("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }, null, -1), createBaseVNode("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }, null, -1)]));
}
var CloseIcon_default = export_helper_default(_sfc_main$4, [["render", _sfc_render$4]]);
var _hoisted_1$5 = ["data-visible"];
var _hoisted_2$1 = { class: "sonner-spinner" };
var Loader_vue_vue_type_script_setup_true_lang_default = defineComponent({
  __name: "Loader",
  props: { visible: { type: Boolean } },
  setup(__props) {
    const bars = Array(12).fill(0);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "sonner-loading-wrapper",
        "data-visible": _ctx.visible
      }, [createBaseVNode("div", _hoisted_2$1, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(bars), (bar) => {
        return openBlock(), createElementBlock("div", {
          key: `spinner-bar-${bar}`,
          class: "sonner-loading-bar"
        });
      }), 128))])], 8, _hoisted_1$5);
    };
  }
});
var Loader_default = Loader_vue_vue_type_script_setup_true_lang_default;
var _sfc_main$3 = {};
var _hoisted_1$4 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
};
function _sfc_render$3(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$4, _cache[0] || (_cache[0] = [createBaseVNode("path", {
    "fill-rule": "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
    "clip-rule": "evenodd"
  }, null, -1)]));
}
var SuccessIcon_default = export_helper_default(_sfc_main$3, [["render", _sfc_render$3]]);
var _sfc_main$2 = {};
var _hoisted_1$3 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
};
function _sfc_render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$3, _cache[0] || (_cache[0] = [createBaseVNode("path", {
    "fill-rule": "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
    "clip-rule": "evenodd"
  }, null, -1)]));
}
var InfoIcon_default = export_helper_default(_sfc_main$2, [["render", _sfc_render$2]]);
var _sfc_main$1 = {};
var _hoisted_1$2 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
};
function _sfc_render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$2, _cache[0] || (_cache[0] = [createBaseVNode("path", {
    "fill-rule": "evenodd",
    d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
    "clip-rule": "evenodd"
  }, null, -1)]));
}
var WarningIcon_default = export_helper_default(_sfc_main$1, [["render", _sfc_render$1]]);
var _sfc_main = {};
var _hoisted_1$1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
};
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, _cache[0] || (_cache[0] = [createBaseVNode("path", {
    "fill-rule": "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
    "clip-rule": "evenodd"
  }, null, -1)]));
}
var ErrorIcon_default = export_helper_default(_sfc_main, [["render", _sfc_render]]);
var _hoisted_1 = ["aria-label"];
var _hoisted_2 = [
  "data-sonner-theme",
  "dir",
  "data-theme",
  "data-rich-colors",
  "data-y-position",
  "data-x-position",
  "data-lifted"
];
var isClient = typeof window !== "undefined" && typeof document !== "undefined";
function getDocumentDirection() {
  if (typeof window === "undefined") return "ltr";
  if (typeof document === "undefined") return "ltr";
  const dirAttribute = document.documentElement.getAttribute("dir");
  if (dirAttribute === "auto" || !dirAttribute) return window.getComputedStyle(document.documentElement).direction;
  return dirAttribute;
}
var Toaster_vue_vue_type_script_setup_true_lang_default = defineComponent({
  name: "Toaster",
  inheritAttrs: false,
  __name: "Toaster",
  props: {
    invert: {
      type: Boolean,
      default: false
    },
    theme: { default: "light" },
    position: { default: "bottom-right" },
    hotkey: { default: () => ["altKey", "KeyT"] },
    richColors: {
      type: Boolean,
      default: false
    },
    expand: {
      type: Boolean,
      default: false
    },
    duration: {},
    gap: { default: GAP },
    visibleToasts: { default: VISIBLE_TOASTS_AMOUNT },
    closeButton: {
      type: Boolean,
      default: false
    },
    toastOptions: { default: () => ({}) },
    class: { default: "" },
    style: {},
    offset: { default: VIEWPORT_OFFSET },
    mobileOffset: { default: MOBILE_VIEWPORT_OFFSET },
    dir: { default: "auto" },
    swipeDirections: {},
    icons: {},
    containerAriaLabel: { default: "Notifications" }
  },
  setup(__props) {
    const props = __props;
    const attrs = useAttrs();
    const toasts = ref([]);
    function filteredToasts(pos, index) {
      return toasts.value.filter((toast$1) => !toast$1.position && index === 0 || toast$1.position === pos);
    }
    const possiblePositions = computed(() => {
      const posList = toasts.value.filter((toast$1) => toast$1.position).map((toast$1) => toast$1.position);
      return posList.length > 0 ? Array.from(new Set([props.position].concat(posList))) : [props.position];
    });
    const toastsByPosition = computed(() => {
      const result = {};
      possiblePositions.value.forEach((pos) => {
        result[pos] = toasts.value.filter((t) => t.position === pos);
      });
      return result;
    });
    const heights = ref([]);
    const expanded = ref(false);
    const interacting = ref(false);
    const actualTheme = ref(props.theme !== "system" ? props.theme : typeof window !== "undefined" ? window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : "light");
    const listRef = ref(null);
    const lastFocusedElementRef = ref(null);
    const isFocusWithinRef = ref(false);
    const hotkeyLabel = props.hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
    function removeToast(toastToRemove) {
      var _a;
      if (!((_a = toasts.value.find((toast$1) => toast$1.id === toastToRemove.id)) == null ? void 0 : _a.delete)) ToastState.dismiss(toastToRemove.id);
      toasts.value = toasts.value.filter(({ id }) => id !== toastToRemove.id);
      setTimeout(() => {
        if (!toasts.value.find((t) => t.id === toastToRemove.id)) heights.value = heights.value.filter((h) => h.toastId !== toastToRemove.id);
      }, TIME_BEFORE_UNMOUNT + 50);
    }
    function onBlur(event) {
      var _a, _b;
      if (isFocusWithinRef.value && !((_b = (_a = event.currentTarget) == null ? void 0 : _a.contains) == null ? void 0 : _b.call(_a, event.relatedTarget))) {
        isFocusWithinRef.value = false;
        if (lastFocusedElementRef.value) {
          lastFocusedElementRef.value.focus({ preventScroll: true });
          lastFocusedElementRef.value = null;
        }
      }
    }
    function onFocus(event) {
      const isNotDismissible = event.target instanceof HTMLElement && event.target.dataset.dismissible === "false";
      if (isNotDismissible) return;
      if (!isFocusWithinRef.value) {
        isFocusWithinRef.value = true;
        lastFocusedElementRef.value = event.relatedTarget;
      }
    }
    function onPointerDown(event) {
      if (event.target) {
        const isNotDismissible = event.target instanceof HTMLElement && event.target.dataset.dismissible === "false";
        if (isNotDismissible) return;
      }
      interacting.value = true;
    }
    watchEffect((onInvalidate) => {
      const unsubscribe = ToastState.subscribe((toast$1) => {
        if (toast$1.dismiss) {
          requestAnimationFrame(() => {
            toasts.value = toasts.value.map((t) => t.id === toast$1.id ? {
              ...t,
              delete: true
            } : t);
          });
          return;
        }
        nextTick(() => {
          const indexOfExistingToast = toasts.value.findIndex((t) => t.id === toast$1.id);
          if (indexOfExistingToast !== -1) toasts.value = [
            ...toasts.value.slice(0, indexOfExistingToast),
            {
              ...toasts.value[indexOfExistingToast],
              ...toast$1
            },
            ...toasts.value.slice(indexOfExistingToast + 1)
          ];
          else toasts.value = [toast$1, ...toasts.value];
        });
      });
      onInvalidate(unsubscribe);
    });
    watchEffect((onInvalidate) => {
      if (typeof window === "undefined") return;
      if (props.theme !== "system") {
        actualTheme.value = props.theme;
        return;
      }
      const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const updateTheme = (matches) => {
        actualTheme.value = matches ? "dark" : "light";
      };
      updateTheme(darkMediaQuery.matches);
      const handler = (event) => {
        updateTheme(event.matches);
      };
      try {
        darkMediaQuery.addEventListener("change", handler);
      } catch {
        darkMediaQuery.addListener(handler);
      }
      onInvalidate(() => {
        try {
          darkMediaQuery.removeEventListener("change", handler);
        } catch {
          darkMediaQuery.removeListener(handler);
        }
      });
    });
    watchEffect(() => {
      if (listRef.value && lastFocusedElementRef.value) {
        lastFocusedElementRef.value.focus({ preventScroll: true });
        lastFocusedElementRef.value = null;
        isFocusWithinRef.value = false;
      }
    });
    watchEffect(() => {
      if (toasts.value.length <= 1) expanded.value = false;
    });
    watchEffect((onInvalidate) => {
      function handleKeyDown(event) {
        const isHotkeyPressed = props.hotkey.every((key) => event[key] || event.code === key);
        const listRefItem = Array.isArray(listRef.value) ? listRef.value[0] : listRef.value;
        if (isHotkeyPressed) {
          expanded.value = true;
          listRefItem == null ? void 0 : listRefItem.focus();
        }
        const isItemActive = document.activeElement === listRef.value || (listRefItem == null ? void 0 : listRefItem.contains(document.activeElement));
        if (event.code === "Escape" && isItemActive) expanded.value = false;
      }
      if (!isClient) return;
      document.addEventListener("keydown", handleKeyDown);
      onInvalidate(() => {
        document.removeEventListener("keydown", handleKeyDown);
      });
    });
    function handleMouseEnter() {
      expanded.value = true;
    }
    function handleMouseLeave() {
      if (!interacting.value) expanded.value = false;
    }
    function handleDragEnd() {
      expanded.value = false;
    }
    function handlePointerUp() {
      interacting.value = false;
    }
    function updateHeights(h) {
      heights.value = h;
    }
    function updateHeight(h) {
      const index = heights.value.findIndex((item) => item.toastId === h.toastId);
      if (index !== -1) heights.value[index] = h;
      else {
        const samePositionIndex = heights.value.findIndex((item) => item.position === h.position);
        if (samePositionIndex !== -1) heights.value.splice(samePositionIndex, 0, h);
        else heights.value.unshift(h);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [createCommentVNode(" Remove item from normal navigation flow, only available via hotkey "), createBaseVNode("section", {
        "aria-label": `${_ctx.containerAriaLabel} ${unref(hotkeyLabel)}`,
        tabIndex: -1,
        "aria-live": "polite",
        "aria-relevant": "additions text",
        "aria-atomic": "false"
      }, [(openBlock(true), createElementBlock(Fragment, null, renderList(possiblePositions.value, (pos, index) => {
        var _a;
        return openBlock(), createElementBlock("ol", mergeProps({
          key: pos,
          ref_for: true,
          ref_key: "listRef",
          ref: listRef,
          "data-sonner-toaster": "",
          "data-sonner-theme": actualTheme.value,
          class: props.class,
          dir: _ctx.dir === "auto" ? getDocumentDirection() : _ctx.dir,
          tabIndex: -1,
          "data-theme": _ctx.theme,
          "data-rich-colors": _ctx.richColors,
          "data-y-position": pos.split("-")[0],
          "data-x-position": pos.split("-")[1],
          "data-lifted": expanded.value && toasts.value.length > 1 && !_ctx.expand,
          style: {
            "--front-toast-height": `${((_a = heights.value[0]) == null ? void 0 : _a.height) || 0}px`,
            "--width": `${unref(TOAST_WIDTH)}px`,
            "--gap": `${_ctx.gap}px`,
            ..._ctx.style,
            ...unref(attrs).style,
            ...unref(assignOffset)(_ctx.offset, _ctx.mobileOffset)
          }
        }, _ctx.$attrs, {
          onBlur,
          onFocus,
          onMouseenter: handleMouseEnter,
          onMousemove: handleMouseEnter,
          onMouseleave: handleMouseLeave,
          onDragend: handleDragEnd,
          onPointerdown: onPointerDown,
          onPointerup: handlePointerUp
        }), [(openBlock(true), createElementBlock(Fragment, null, renderList(filteredToasts(pos, index), (toast$1, idx) => {
          var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          return openBlock(), createBlock(Toast_default, {
            key: toast$1.id,
            heights: heights.value,
            icons: _ctx.icons,
            index: idx,
            toast: toast$1,
            defaultRichColors: _ctx.richColors,
            duration: ((_a2 = _ctx.toastOptions) == null ? void 0 : _a2.duration) ?? _ctx.duration,
            class: normalizeClass(((_b = _ctx.toastOptions) == null ? void 0 : _b.class) ?? ""),
            descriptionClass: (_c = _ctx.toastOptions) == null ? void 0 : _c.descriptionClass,
            invert: _ctx.invert,
            visibleToasts: _ctx.visibleToasts,
            closeButton: ((_d = _ctx.toastOptions) == null ? void 0 : _d.closeButton) ?? _ctx.closeButton,
            interacting: interacting.value,
            position: pos,
            style: normalizeStyle((_e = _ctx.toastOptions) == null ? void 0 : _e.style),
            unstyled: (_f = _ctx.toastOptions) == null ? void 0 : _f.unstyled,
            classes: (_g = _ctx.toastOptions) == null ? void 0 : _g.classes,
            cancelButtonStyle: (_h = _ctx.toastOptions) == null ? void 0 : _h.cancelButtonStyle,
            actionButtonStyle: (_i = _ctx.toastOptions) == null ? void 0 : _i.actionButtonStyle,
            "close-button-aria-label": (_j = _ctx.toastOptions) == null ? void 0 : _j.closeButtonAriaLabel,
            toasts: toastsByPosition.value[pos],
            expandByDefault: _ctx.expand,
            gap: _ctx.gap,
            expanded: expanded.value,
            swipeDirections: props.swipeDirections,
            "onUpdate:heights": updateHeights,
            "onUpdate:height": updateHeight,
            onRemoveToast: removeToast
          }, {
            "close-icon": withCtx(() => [renderSlot(_ctx.$slots, "close-icon", {}, () => [createVNode(CloseIcon_default)])]),
            "loading-icon": withCtx(() => [renderSlot(_ctx.$slots, "loading-icon", {}, () => [createVNode(Loader_default, { visible: toast$1.type === "loading" }, null, 8, ["visible"])])]),
            "success-icon": withCtx(() => [renderSlot(_ctx.$slots, "success-icon", {}, () => [createVNode(SuccessIcon_default)])]),
            "error-icon": withCtx(() => [renderSlot(_ctx.$slots, "error-icon", {}, () => [createVNode(ErrorIcon_default)])]),
            "warning-icon": withCtx(() => [renderSlot(_ctx.$slots, "warning-icon", {}, () => [createVNode(WarningIcon_default)])]),
            "info-icon": withCtx(() => [renderSlot(_ctx.$slots, "info-icon", {}, () => [createVNode(InfoIcon_default)])]),
            _: 2
          }, 1032, [
            "heights",
            "icons",
            "index",
            "toast",
            "defaultRichColors",
            "duration",
            "class",
            "descriptionClass",
            "invert",
            "visibleToasts",
            "closeButton",
            "interacting",
            "position",
            "style",
            "unstyled",
            "classes",
            "cancelButtonStyle",
            "actionButtonStyle",
            "close-button-aria-label",
            "toasts",
            "expandByDefault",
            "gap",
            "expanded",
            "swipeDirections"
          ]);
        }), 128))], 16, _hoisted_2);
      }), 128))], 8, _hoisted_1)], 2112);
    };
  }
});
var Toaster_default = Toaster_vue_vue_type_script_setup_true_lang_default;
var plugin = { install(app) {
  app.component("Toaster", Toaster_default);
} };
var packages_default = plugin;
export {
  Toaster_default as Toaster,
  packages_default as default,
  toast,
  useVueSonner
};
//# sourceMappingURL=vue-sonner.js.map
