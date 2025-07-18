import {
  Fragment,
  Transition,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createSlots,
  createTextVNode,
  createVNode,
  defineComponent,
  getCurrentInstance,
  guardReactiveProps,
  h,
  mergeDefaults,
  mergeProps,
  nextTick,
  normalizeClass,
  normalizeProps,
  normalizeStyle,
  onBeforeUnmount,
  onMounted,
  openBlock,
  reactive,
  ref,
  renderList,
  renderSlot,
  resolveDynamicComponent,
  toDisplayString,
  toHandlers,
  toRefs,
  unref,
  vModelText,
  vShow,
  watch,
  withCtx,
  withDirectives,
  withModifiers
} from "./chunk-R2IJRJAJ.js";
import "./chunk-EQCVQC35.js";

// node_modules/.pnpm/@wsfe+vue-tree@4.1.1/node_modules/@wsfe/vue-tree/dist/vue-tree.mjs
var Ot = Object.defineProperty;
var Vt = (o, d, t) => d in o ? Ot(o, d, { enumerable: true, configurable: true, writable: true, value: t }) : o[d] = t;
var P = (o, d, t) => (Vt(o, typeof d != "symbol" ? d + "" : d, t), t);
var Rt = [
  "_level",
  "_filterVisible",
  "_parent",
  "_loading",
  "_loaded",
  "_remote",
  "_keyField",
  "children",
  "setChildren"
];
var ke = class _ke {
  //#endregion Properties
  constructor(d, t = null, e = "id", n = false) {
    P(this, "_level", 0);
    P(this, "checked", false);
    P(this, "selected", false);
    P(this, "indeterminate", false);
    P(this, "disabled", false);
    P(this, "expand", false);
    P(this, "visible", true);
    P(this, "_filterVisible", true);
    P(this, "_parent", null);
    P(this, "children", []);
    P(this, "isLeaf", false);
    P(this, "_loading", false);
    P(this, "_loaded", false);
    this._keyField = e, this._remote = n;
    for (let l in d)
      Rt.indexOf(l) === -1 && (this[l] = d[l]);
    this[e] == null && (this[e] = Math.random().toString(36).substring(2)), this._parent = t, this._parent && (this._level = this._parent._level + 1), this.visible = this._parent === null || this._parent.expand && this._parent.visible, Array.isArray(d.children) && this.setChildren(d.children), this.children.length && (this._loaded = true), this._remote || (this.isLeaf = !this.children.length);
  }
  /**
   * 设置子节点
   * @param children 子节点数据数组
   */
  setChildren(d) {
    this.children = d.map((t) => new _ke(
      Object.assign({}, t),
      this,
      this._keyField,
      this._remote
    ));
  }
};
var Ie = ((o) => (o.none = "none", o.parents = "parents", o.children = "children", o))(Ie || {});
var ct = [
  "setData",
  "setChecked",
  "setCheckedKeys",
  "checkAll",
  "clearChecked",
  "setSelected",
  "clearSelected",
  "setExpand",
  "setExpandKeys",
  "setExpandAll",
  "getCheckedNodes",
  "getCheckedKeys",
  "getIndeterminateNodes",
  "getSelectedNode",
  "getSelectedKey",
  "getExpandNodes",
  "getExpandKeys",
  "getCurrentVisibleNodes",
  "getNode",
  "getTreeData",
  "getFlatData",
  "getNodesCount",
  "insertBefore",
  "insertAfter",
  "append",
  "prepend",
  "remove",
  "filter",
  "showCheckedNodes",
  "loadRootNodes",
  "updateNode",
  "updateNodes",
  "scrollTo"
];
var jt = [...ct, "clearKeyword", "getKeyword", "search"];
var ht = ((o) => (o["bottom-start"] = "bottom-start", o["bottom-end"] = "bottom-end", o.bottom = "bottom", o["top-start"] = "top-start", o["top-end"] = "top-end", o.top = "top", o))(ht || {});
var Me = ((o) => (o.top = "top", o.center = "center", o.bottom = "bottom", o))(Me || {});
var ce = ((o) => (o.before = "before", o.body = "body", o.after = "after", o))(ce || {});
var Je = ((o) => (o.dashed = "dashed", o.solid = "solid", o))(Je || {});
var Xt = class {
  constructor() {
    P(this, "listenersMap", {});
  }
  on(d, t) {
    this.listenersMap[d] || (this.listenersMap[d] = []);
    let e = [];
    Array.isArray(t) ? e = t : e = [t], e.forEach((n) => {
      this.listenersMap[d].indexOf(n) === -1 && this.listenersMap[d].push(n);
    });
  }
  off(d, t) {
    if (this.listenersMap[d])
      if (!t)
        this.listenersMap[d] = [];
      else {
        const e = this.listenersMap[d].indexOf(t);
        e > -1 && this.listenersMap[d].splice(e, 1);
      }
  }
  emit(d, ...t) {
    if (!this.listenersMap[d])
      return;
    const e = this.listenersMap[d].length;
    for (let n = 0; n < e; n++)
      this.listenersMap[d][n](...t);
  }
  disposeListeners() {
    for (const d in this.listenersMap)
      this.listenersMap[d] = [];
  }
};
var Yt = class extends Xt {
  //#endregion Properties
  constructor(t) {
    super();
    P(this, "data", []);
    P(this, "flatData", []);
    P(this, "mapData", /* @__PURE__ */ Object.create(null));
    P(this, "unloadCheckedKeys", []);
    P(this, "unloadSelectedKey", null);
    P(this, "currentSelectedKey", null);
    this.options = t;
  }
  /**
   * Use this function to insert nodes into flatData to avoid 'maximun call stack size exceeded' error
   * @param insertIndex The index to insert, the same usage as `this.flatData.splice(insertIndex, 0, insertNodes)`
   * @param insertNodes Tree nodes to insert
   */
  insertIntoFlatData(t, e) {
    this.flatData = this.flatData.slice(0, t).concat(e, this.flatData.slice(t));
  }
  setData(t, e = null, n = null) {
    this.data = t.map(
      (l) => new ke(l, null, this.options.keyField, !!this.options.load)
    );
    for (let l in this.mapData)
      delete this.mapData[l];
    this.currentSelectedKey = null, this.flatData = this.flattenData(this.data), this.setUnloadCheckedKeys(n || []), e && (this.currentSelectedKey = null, this.setUnloadSelectedKey(e)), this.emit("visible-data-change"), this.emit("set-data");
  }
  //#region Set api
  /**
   * 设置单个节点多选选中
   * @param key 设置的节点 key
   * @param value 是否选中
   * @param triggerEvent 是否触发事件
   * @param triggerDataChange 是否触发 `data-change` 事件以通知外部刷新视图
   * @param filtering 是否正在过滤，如果是，则考虑 `filteredNodeCheckable` Prop，用于判断是否是用户点击节点触发的勾选
   */
  setChecked(t, e, n = true, l = true, i = false) {
    const a = this.mapData[t];
    if (!a)
      return this.setUnloadChecked(t, e, n, l);
    a.disabled || a.checked && e || !a.checked && !a.indeterminate && !e || (this.options.cascade ? (this.checkNodeDownward(a, e, i), this.checkNodeUpward(a)) : a.checked = e, n && (a.checked ? this.emit("check", a) : this.emit("uncheck", a)), this.triggerCheckedChange(n, l));
  }
  /**
   * 设置单个未加载节点选中，不公开此 API
   */
  setUnloadChecked(t, e, n = true, l = true) {
    const i = this.findIndex(t, this.unloadCheckedKeys);
    e ? i === -1 && this.unloadCheckedKeys.push(t) : i !== -1 && this.unloadCheckedKeys.splice(i, 1), this.triggerCheckedChange(n, l);
  }
  /**
   * 批量选中/取消多选选中节点
   * @param keys 选中的节点 key 数组
   * @param value 是否选中
   * @param triggerEvent 是否触发事件
   */
  setCheckedKeys(t, e, n = true, l = true) {
    t.forEach((i) => {
      this.setChecked(i, e, false, false);
    }), this.triggerCheckedChange(n, l);
  }
  /**
   * 多选勾选全部节点
   * @param triggerEvent 是否触发事件
   * @param triggerDataChange 是否触发视图刷新
   */
  checkAll(t = true, e = true) {
    if (this.options.cascade) {
      const n = (l) => {
        l.forEach((i) => {
          i.disabled ? n(i.children) : this.setChecked(i[this.options.keyField], true, false, false);
        });
      };
      n(this.data);
    } else {
      const n = this.flatData.length;
      for (let l = 0; l < n; l++) {
        const i = this.flatData[l];
        this.setChecked(i[this.options.keyField], true, false, false);
      }
    }
    this.triggerCheckedChange(t, e);
  }
  /**
   * 清除所有多选已选
   * @param triggerEvent 是否触发事件
   * @param triggerDataChange 是否触发视图刷新
   */
  clearChecked(t = true, e = true) {
    this.getCheckedNodes().forEach((l) => {
      this.setChecked(l[this.options.keyField], false, false, false);
    }), this.unloadCheckedKeys = [], this.triggerCheckedChange(t, e);
  }
  /**
   * 触发 checked-change 的快捷方法
   * @param triggerEvent 是否触发事件
   * @param triggerDataChange 是否触发视图刷新
   */
  triggerCheckedChange(t = true, e = true) {
    t && this.emit("checked-change", this.getCheckedNodes(), this.getCheckedKeys()), e && this.emit("render-data-change");
  }
  /**
   * 触发 selected-change 的快捷方法
   * @param triggerEvent 是否触发事件
   * @param triggerDataChange 是否触发视图刷新
   */
  triggerSelectedChange(t = true, e = true) {
    t && this.emit("selected-change", this.getSelectedNode(), this.getSelectedKey()), e && this.emit("render-data-change");
  }
  /**
   * 设置单选选中
   * @param key 选中节点 key
   * @param value 是否选中
   * @param triggerEvent 是否触发事件
   */
  setSelected(t, e, n = true, l = true) {
    const i = this.mapData[t];
    if (!i)
      return this.setUnloadSelected(t, e, n, l);
    i.disabled || i.selected !== e && (t === this.currentSelectedKey ? e || (i.selected = e, this.currentSelectedKey = null) : e && (this.currentSelectedKey !== null && this.mapData[this.currentSelectedKey] && (this.mapData[this.currentSelectedKey].selected = false), i.selected = e, this.currentSelectedKey = i[this.options.keyField], this.unloadSelectedKey = null), n && (i.selected ? this.emit("select", i) : this.emit("unselect", i)), this.triggerSelectedChange(n, l));
  }
  /**
   * 设置未加载单选选中节点，不公开此 API
   */
  setUnloadSelected(t, e, n = true, l = true) {
    e ? (this.currentSelectedKey = null, this.unloadSelectedKey = t) : this.unloadSelectedKey === t && (this.unloadSelectedKey = null), this.triggerSelectedChange(n, l);
  }
  /**
   * 清除当前单选选中
   * @param triggerEvent 是否触发事件
   * @param triggerDataChange 是否触发视图刷新
   */
  clearSelected(t = true, e = true) {
    this.currentSelectedKey && this.mapData[this.currentSelectedKey] ? this.setSelected(
      this.currentSelectedKey,
      false,
      t,
      e
    ) : this.unloadSelectedKey !== null && (this.unloadSelectedKey = null, this.triggerSelectedChange(t, e));
  }
  /**
   * 设置节点展开
   * @param key 节点 key
   * @param value 是否展开
   * @param expandParent 展开节点时是否同时展开父节点
   * @param triggerEvent 是否触发事件
   * @param triggerDataChange 是否触发 `data-change` 事件以通知外部刷新视图
   */
  setExpand(t, e, n = false, l = true, i = true) {
    const a = this.mapData[t];
    if (!(!a || !n && a.isLeaf) && a.expand !== e) {
      if (!a.isLeaf) {
        if (typeof this.options.load == "function") {
          if (!a._loaded && !a._loading && e) {
            a._loading = true, i && this.emit("visible-data-change"), new Promise((c, f) => {
              const v = this.options.load;
              v(a, c, f);
            }).then((c) => {
              Array.isArray(c) && (this.loadChildren(a, c, e), this.emit("set-data"));
            }).catch((c) => {
              let f = c;
              c instanceof Error || (f = new Error(c)), console.error("[VTree] load tree nodes error.", f);
            }).then(() => {
              a._loading = false, l && this.emit("expand", a), i && this.emit("visible-data-change");
            });
            return;
          } else if (a._loading)
            return;
        }
        a.expand = e;
        let r = a.children.concat();
        for (; r.length; ) {
          const c = r.pop();
          c && (c.expand && c.children.length && (r = c.children.concat(r)), c._filterVisible === false ? c.visible = false : c.visible = c._parent === null || c._parent.expand && c._parent.visible);
        }
        l && this.emit("expand", a), i && this.emit("visible-data-change");
      }
      n && a._parent && e && this.setExpand(
        a._parent[this.options.keyField],
        e,
        n,
        false,
        i
      );
    }
  }
  /**
   * 批量设置节点展开/折叠
   * @param keys 展开的节点 key 数组
   * @param value 是否展开
   */
  setExpandKeys(t, e, n = true) {
    t.forEach((l) => {
      this.setExpand(l, e, false, false, false);
    }), n && this.emit("visible-data-change");
  }
  setExpandAll(t, e = true) {
    this.flatData.forEach((n) => {
      (!this.options.load || n._loaded) && this.setExpand(n[this.options.keyField], t, false, false, false);
    }), e && this.emit("visible-data-change");
  }
  isChildrenChanged(t, e) {
    var n;
    return "children" in e && (!!t.children.length || !!((n = e.children) != null && n.length));
  }
  updateNode(t, e, n = true, l = true) {
    var L;
    const i = this.mapData[t];
    if (!i)
      return;
    const a = {}, r = [
      this.options.keyField,
      "indeterminate",
      "visible",
      "isLeaf"
    ];
    Object.keys(e).forEach((w) => {
      !w.startsWith("_") && !r.includes(w) && (a[w] = e[w]);
    });
    const c = this.getCheckedKeys(), f = this.getSelectedKey();
    let v = this.isChildrenChanged(i, a);
    "children" in a && (i.children.length || (L = a.children) != null && L.length) && (this.removeChildren(t, false, false), Array.isArray(a.children) && this.loadChildren(i, a.children, i.expand), delete a.children), "checked" in a && (this.setChecked(t, a.checked, false, false), delete a.checked), "selected" in a && (this.setSelected(t, a.selected, false, false), delete a.selected), "expand" in a && (this.setExpand(t, a.expand, false, false, false), delete a.expand), Object.keys(a).forEach((w) => {
      i[w] = a[w];
    });
    const m = this.getCheckedKeys(), O = this.getSelectedKey();
    n && (JSON.stringify(m.sort()) !== JSON.stringify(c.sort()) && this.triggerCheckedChange(true, false), O !== f && this.triggerSelectedChange(true, false)), l && (v && this.emit("set-data"), this.emit("visible-data-change"));
  }
  updateNodes(t) {
    const e = t.filter((c) => c[this.options.keyField] != null);
    if (!e.length)
      return;
    const n = this.getCheckedKeys(), l = this.getSelectedKey();
    let i = false;
    e.forEach((c) => {
      const f = c[this.options.keyField], v = this.mapData[f];
      v && (i = i || this.isChildrenChanged(v, c), this.updateNode(f, c, false, false));
    });
    const a = this.getCheckedKeys(), r = this.getSelectedKey();
    JSON.stringify(a.sort()) !== JSON.stringify(n.sort()) && this.triggerCheckedChange(true, false), r !== l && this.triggerSelectedChange(true, false), i && this.emit("set-data"), this.emit("visible-data-change");
  }
  //#endregion Set api
  //#region Get api
  /**
   * 获取多选选中节点
   * @param ignoreMode 忽略模式，可选择忽略父节点或子节点，默认值是 VTree 的 ignoreMode Prop
   */
  getCheckedNodes(t = this.options.ignoreMode) {
    if (t === Ie.children) {
      const e = [], n = (l) => {
        l.forEach((i) => {
          i.checked ? e.push(i) : !i.isLeaf && i.indeterminate && n(i.children);
        });
      };
      return n(this.data), e;
    } else
      return this.flatData.filter((e) => t === Ie.parents ? e.checked && e.isLeaf : e.checked);
  }
  /**
   * 获取多选选中的节点 key ，包括未加载的 key
   * @param ignoreMode 忽略模式，同 `getCheckedNodes`
   */
  getCheckedKeys(t = this.options.ignoreMode) {
    return this.getCheckedNodes(t).map((e) => e[this.options.keyField]).concat(this.unloadCheckedKeys);
  }
  /**
   * 获取多选半选状态节点
   */
  getIndeterminateNodes() {
    return this.flatData.filter((t) => t.indeterminate);
  }
  /**
   * 获取当前单选选中节点
   */
  getSelectedNode() {
    return this.currentSelectedKey === null ? null : this.mapData[this.currentSelectedKey] || null;
  }
  /**
   * 获取当前单选选中节点 key ，有可能是未加载的选中项
   */
  getSelectedKey() {
    return this.currentSelectedKey || this.unloadSelectedKey || null;
  }
  /**
   * 获取未加载但多选选中的节点
   */
  getUnloadCheckedKeys() {
    return this.unloadCheckedKeys;
  }
  /**
   * 获取展开节点
   */
  getExpandNodes() {
    return this.flatData.filter((t) => !t.isLeaf && t.expand);
  }
  /**
   * 获取展开节点 keys
   */
  getExpandKeys() {
    return this.getExpandNodes().map((t) => t[this.options.keyField]);
  }
  /**
   * 根据节点 key  获取节点
   * @param key 节点 key
   */
  getNode(t) {
    return this.mapData[t] || null;
  }
  //#endregion Get api
  //#region Node transfer api
  // 这边的 referenceKey 都是被执行的节点，比如 insertBefore ，在这里 referenceKey 就是指要插入到 referenceKey 节点前面
  insertBefore(t, e, n = true, l = true) {
    const i = this.getInsertedNode(t, e);
    if (!i)
      return null;
    this.remove(i[this.options.keyField], false, false);
    const r = this.mapData[e]._parent, c = this.findIndex(
      e,
      r && r.children
    ), f = this.findIndex(e), v = r && -1 || this.findIndex(e, this.data);
    return this.insertIntoStore(i, r, c, f, v, n, l), l && this.emit("visible-data-change"), i;
  }
  insertAfter(t, e, n = true, l = true) {
    const i = this.getInsertedNode(t, e);
    if (!i)
      return null;
    this.remove(i[this.options.keyField], false, false);
    const a = this.mapData[e], r = a._parent, c = this.findIndex(e, r && r.children) + 1, f = this.flatData.length, v = this.findIndex(e);
    let m = v + 1;
    for (let L = v + 1; L <= f; L++) {
      if (L === f) {
        m = L;
        break;
      }
      if (this.flatData[L]._level <= a._level) {
        m = L;
        break;
      }
    }
    const O = r && -1 || this.findIndex(e, this.data) + 1;
    return this.insertIntoStore(i, r, c, m, O, n, l), l && this.emit("visible-data-change"), i;
  }
  append(t, e, n = true, l = true) {
    const i = this.mapData[e];
    if (!i.isLeaf) {
      const c = i.children.length;
      return this.insertAfter(
        t,
        i.children[c - 1][this.options.keyField],
        n,
        l
      );
    }
    const a = this.getInsertedNode(t, e, true);
    if (!a)
      return null;
    this.remove(a[this.options.keyField], false, false);
    const r = this.findIndex(e) + 1;
    return this.insertIntoStore(a, i, 0, r, void 0, n, l), l && this.emit("visible-data-change"), a;
  }
  prepend(t, e, n = true, l = true) {
    const i = this.mapData[e];
    if (!i.isLeaf)
      return this.insertBefore(
        t,
        i.children[0][this.options.keyField],
        n,
        l
      );
    const a = this.getInsertedNode(t, e, true);
    if (!a)
      return null;
    this.remove(a[this.options.keyField], false, false);
    const r = this.findIndex(e) + 1;
    return this.insertIntoStore(a, i, 0, r, void 0, n, l), l && this.emit("visible-data-change"), a;
  }
  /**
   * 删除节点
   * @param removedKey 要删除的节点 key
   */
  remove(t, e = true, n = true) {
    const l = this.mapData[t];
    if (!l)
      return null;
    const i = this.findIndex(l);
    if (i === -1)
      return null;
    let a = 1;
    const r = this.flatData.length;
    for (let f = i + 1; f < r && this.flatData[f]._level > l._level; f++)
      a++;
    this.flatData.splice(i, a);
    const c = (f) => {
      const v = this.mapData[f];
      delete this.mapData[f], v.children.forEach((m) => c(m[this.options.keyField]));
    };
    if (c(t), !l._parent) {
      const f = this.findIndex(l, this.data);
      f > -1 && this.data.splice(f, 1);
    }
    if (l._parent) {
      const f = this.findIndex(l, l._parent.children);
      f !== -1 && l._parent.children.splice(f, 1), l._parent.isLeaf = !l._parent.children.length, l._parent.isLeaf && (l._parent.expand = false, l._parent.indeterminate = false), this.updateMovingNodeStatus(l, e, n);
    }
    return n && this.emit("visible-data-change"), l;
  }
  removeChildren(t, e = true, n = true) {
    const l = this.mapData[t];
    if (!l || !l.children.length)
      return null;
    let a = l.children[0];
    const r = this.findIndex(l);
    if (r === -1)
      return null;
    let c = 0;
    const f = this.flatData.length;
    for (let v = r + 1; v < f && this.flatData[v]._level > l._level; v++)
      delete this.mapData[this.flatData[v][this.options.keyField]], c++, this.flatData[v].selected && (a = this.flatData[v]);
    return this.flatData.splice(r + 1, c), l.children.splice(0, l.children.length), l.isLeaf = true, l.indeterminate = false, this.updateMovingNodeStatus(a, e, n), n && this.emit("visible-data-change"), l;
  }
  loadChildren(t, e, n) {
    const l = this.findIndex(t);
    if (l === -1)
      return;
    t._loaded = true, t.expand = n, t.setChildren(e), t.isLeaf = !t.children.length;
    const i = this.getCheckedKeys(), a = this.flattenData(
      t.children,
      this.getSelectedKey() === null
    );
    this.insertIntoFlatData(l + 1, a), this.setUnloadCheckedKeys(i), this.unloadSelectedKey !== null && this.setUnloadSelectedKey(this.unloadSelectedKey), this.checkNodeUpward(t, true);
  }
  getInsertedNode(t, e, n = false) {
    const l = this.mapData[e];
    if (!l)
      return null;
    const i = n ? l : l._parent;
    if (t instanceof ke)
      return t[this.options.keyField] === e ? null : t;
    if (typeof t == "object") {
      if (t[this.options.keyField] === e)
        return null;
      const a = this.mapData[t[this.options.keyField]];
      return a || new ke(
        t,
        i,
        this.options.keyField,
        !!this.options.load
      );
    } else
      return !this.mapData[t] || t === e ? null : this.mapData[t];
  }
  /**
   * 将一个节点插入 store 记录中
   * @param node 要插入的节点
   * @param parentNode 要插入节点的父节点
   * @param childIndex 如果有父节点，则需提供要插入的节点在同级节点中的顺序
   * @param flatIndex 在 flatData 中的索引
   * @param dataIndex 如果没有父节点，需要提供节点在 data 中的索引
   */
  insertIntoStore(t, e, n, l, i, a = true, r = true) {
    if (l === -1)
      return;
    n !== -1 && e && e.children.splice(n, 0, t), t._parent = e, e ? (e.isLeaf = false, this.setExpand(
      e[this.options.keyField],
      true,
      false,
      false,
      false
    )) : typeof i == "number" && i > -1 && this.data.splice(i, 0, t);
    const c = this.flattenData([t]);
    t._level = e ? e._level + 1 : 0, c.forEach(
      (f) => f._level = f._parent ? f._parent._level + 1 : 0
    ), this.insertIntoFlatData(l, c), this.updateMovingNodeStatus(t, a, r);
  }
  updateMovingNodeStatus(t, e = true, n = true) {
    this.checkNodeUpward(t), this.triggerCheckedChange(e, n), t.selected && this.setSelected(t[this.options.keyField], true, e, n);
  }
  //#endregion Node transfer api
  /**
   * 过滤本地节点数据
   * @param keyword 过滤关键词
   * @param filterMethod 过滤方法
   */
  filter(t, e) {
    const n = [];
    this.flatData.forEach((l) => {
      l._filterVisible = l._parent && l._parent._filterVisible || e(t, l), l.visible = l._filterVisible, l._filterVisible && n.push(l);
    }), n.forEach((l) => {
      const i = [];
      let a = l._parent;
      for (; a; )
        i.unshift(a), a = a._parent;
      i.forEach((r) => {
        r._filterVisible = true, r.visible = (r._parent === null || r._parent.expand && r._parent.visible) && r._filterVisible, this.options.expandOnFilter && this.setExpand(
          r[this.options.keyField],
          true,
          false,
          false,
          false
        );
      }), l.visible = l._parent === null || l._parent.expand && l._parent.visible;
    }), this.emit("visible-data-change");
  }
  /**
   * 过滤未加载多选节点，对比最终勾选节点是否有变化并触发 checked-change 事件
   * @param keys 全量选中节点 key 数组，包括加载与未加载选中节点
   */
  setUnloadCheckedKeys(t) {
    this.unloadCheckedKeys = t;
    const e = t.concat(), n = this.unloadCheckedKeys.length;
    for (let i = n - 1; i >= 0; i--) {
      const a = this.unloadCheckedKeys[i];
      this.mapData[a] && (this.setChecked(a, true, false, false), this.unloadCheckedKeys.splice(i, 1));
    }
    const l = this.getCheckedKeys();
    l.length === e.length && l.every(
      (i) => e.some((a) => a === i)
    ) || this.emit("checked-change", this.getCheckedNodes(), l);
  }
  /**
   * 过滤未加载单选选中节点，对比是否有变化并触发 selected-change 事件
   * @param key 节点 key
   */
  setUnloadSelectedKey(t) {
    const e = this.getSelectedKey();
    this.mapData[t] ? (this.setSelected(t, true, false), this.unloadSelectedKey = null) : (this.currentSelectedKey && this.setSelected(this.currentSelectedKey, false, false), this.unloadSelectedKey = t);
    const n = this.getSelectedKey();
    n !== e && this.emit("selected-change", this.getSelectedNode(), n);
  }
  /**
   * 保存扁平化的节点数据 `flatData` 与节点数据 Map `mapData`
   * @param nodes 树状节点数据
   * @param overrideSelected 是否根据数据设置 `selected`
   */
  flattenData(t, e = true, n = []) {
    const l = t.length;
    for (let i = 0; i < l; i++) {
      const a = t[i], r = a[this.options.keyField];
      if (n.push(a), this.mapData[r])
        throw new Error("[VTree] Duplicate tree node key.");
      this.mapData[r] = a, a.checked && this.options.cascade && this.checkNodeDownward(a, true), a.selected && e && (this.clearSelected(false, false), this.currentSelectedKey = a[this.options.keyField], this.emit("selected-change", a, this.currentSelectedKey)), (this.options.defaultExpandAll || a.expand) && !this.options.load && !a.isLeaf && (a.expand = false, this.setExpand(a[this.options.keyField], true, false, false, false)), a.children.length && this.flattenData(a.children, e, n);
    }
    return this.options.cascade && l && this.checkNodeUpward(t[0]), n;
  }
  //#region Check nodes
  /**
   * 向下勾选/取消勾选节点，包括自身
   * @param node 需要向下勾选的节点
   * @param value 勾选或取消勾选
   * @param filtering 是否正在过滤，如果是，则考虑 `filteredNodeCheckable` Prop
   */
  checkNodeDownward(t, e, n = false) {
    if (t.children.forEach((l) => {
      this.checkNodeDownward(l, e, n);
    }), t.isLeaf || this.options.load && !t.children.length) {
      if (!t.disabled) {
        if (n && !this.options.filteredNodeCheckable && !t._filterVisible)
          return;
        t.checked = e, t.indeterminate = false;
      }
    } else
      this.checkParentNode(t);
  }
  /**
   * 向上勾选/取消勾选父节点，不包括自身
   * @param node 需要勾选的节点
   * @param fromCurrentNode 是否从当前节点开始处理
   */
  checkNodeUpward(t, e = false) {
    let n = e ? t : t._parent;
    for (; n; )
      this.checkParentNode(n), n = n._parent;
  }
  /**
   * 根据子节点的勾选状态更新当前父节点的勾选状态
   * @param node 需要勾选的节点
   */
  checkParentNode(t) {
    const e = t.children.length;
    if (!e)
      return;
    let n = false, l = false, i = false;
    for (let a = 0; a < e; a++) {
      const r = t.children[a];
      if (r.checked ? n = true : l = true, n && l || r.indeterminate) {
        i = true, t.checked = false, t.indeterminate = true;
        break;
      }
    }
    i || (t.checked = n, t.indeterminate = false);
  }
  //#endregion Check nodes
  //#region Utils
  /**
   * 搜索节点在指定数组中的位置
   */
  findIndex(t, e = this.flatData) {
    if (e !== null) {
      let n = t instanceof ke ? t[this.options.keyField] : t;
      const l = e.length;
      for (let i = 0; i < l; i++)
        if (e[0] instanceof ke) {
          if (n === e[i][this.options.keyField])
            return i;
        } else if (n === e[i])
          return i;
    }
    return -1;
  }
  //#endregion Utils
};
var zt = defineComponent({
  name: "CLoadingIcon"
});
var Jt = (o, d) => {
  const t = o.__vccOpts || o;
  for (const [e, n] of d)
    t[e] = n;
  return t;
};
var qt = { viewBox: "0 0 50 50" };
var Qt = createBaseVNode("circle", {
  class: "vtree-loading-icon__circle",
  cx: "25",
  cy: "25",
  r: "20",
  fill: "none",
  "stroke-width": "5",
  "stroke-miterlimit": "10"
}, null, -1);
var Gt = [
  Qt
];
function Zt(o, d, t, e, n, l) {
  return openBlock(), createElementBlock("svg", qt, Gt);
}
var ut = Jt(zt, [["render", Zt]]);
var Ze = [
  "expand",
  "check",
  "click",
  "select",
  "node-dblclick",
  "node-right-click",
  "node-dragstart",
  "node-dragenter",
  "node-dragover",
  "node-dragleave",
  "node-drop"
];
var ft = [
  "expand",
  "select",
  "unselect",
  "selected-change",
  "check",
  "uncheck",
  "checked-change",
  "set-data"
];
var et = [...Ze, ...ft];
var tt = ["search", ...et];
var el = [
  "clear",
  "dropdown-visible-change",
  ...tt
];
var K = "vtree-tree-node";
var tl = (o, d) => {
  const {
    dragoverBody: t,
    dragoverBefore: e,
    dragoverAfter: n
  } = d, l = computed(() => [
    `${K}__indent-wrapper`
  ]), i = computed(() => {
    var w, V, W, F, B;
    return [
      `${K}__wrapper`,
      {
        [`${K}__wrapper_is-leaf`]: (w = o.data) == null ? void 0 : w.isLeaf,
        [`${K}_disabled`]: o.disableAll || ((V = o.data) == null ? void 0 : V.disabled)
      },
      // 复选
      {
        [`${K}_checked`]: o.checkable && ((W = o.data) == null ? void 0 : W.checked),
        [`${K}_indeterminate`]: o.checkable && ((F = o.data) == null ? void 0 : F.indeterminate)
      },
      // 单选
      {
        [`${K}_selected`]: (B = o.data) == null ? void 0 : B.selected
      }
    ];
  }), a = computed(() => [
    `${K}__node-body`,
    {
      [`${K}__drop_active`]: t.value
    }
  ]), r = computed(() => [
    `${K}__drop`,
    {
      [`${K}__drop_active`]: e.value
    }
  ]), c = computed(() => [
    `${K}__drop`,
    {
      [`${K}__drop_active`]: n.value
    }
  ]), f = computed(() => [`${K}__square`, `${K}__checkbox_wrapper`]), v = computed(() => {
    var w;
    return [
      `${K}__square`,
      `${K}__expand`,
      {
        [`${K}__expand_active`]: (w = o.data) == null ? void 0 : w.expand
      }
    ];
  }), m = computed(() => [`${K}__loading-icon`]), O = computed(() => {
    var w, V, W;
    return [
      `${K}__checkbox`,
      {
        [`${K}__checkbox_checked`]: (w = o.data) == null ? void 0 : w.checked,
        [`${K}__checkbox_indeterminate`]: (V = o.data) == null ? void 0 : V.indeterminate,
        [`${K}__checkbox_disabled`]: o.disableAll || ((W = o.data) == null ? void 0 : W.disabled)
      }
    ];
  }), L = computed(() => {
    var w, V;
    return [
      `${K}__title`,
      {
        [`${K}__title_selected`]: (w = o.data) == null ? void 0 : w.selected,
        [`${K}__title_disabled`]: o.disableAll || ((V = o.data) == null ? void 0 : V.disabled)
      }
    ];
  });
  return {
    indentWrapperCls: l,
    wrapperCls: i,
    nodeBodyCls: a,
    dropBeforeCls: r,
    dropAfterCls: c,
    checkboxWrapperCls: f,
    expandCls: v,
    loadingIconCls: m,
    checkboxCls: O,
    titleCls: L
  };
};
var ll = ["d", "stroke-width", "stroke", "stroke-dasharray"];
var al = ["draggable"];
var Ye = defineComponent({
  name: "VTreeNode",
  __name: "TreeNode",
  props: {
    titleField: {},
    keyField: {},
    checkable: { type: Boolean },
    selectable: { type: Boolean },
    unselectOnClick: { type: Boolean },
    disableAll: { type: Boolean },
    draggable: { type: Boolean },
    droppable: { type: Boolean },
    nodeIndent: {},
    render: { type: Function },
    showLine: { type: [Boolean, Object] },
    data: {},
    getNode: { type: Function },
    noSiblingNodeMap: {}
  },
  emits: [...Ze],
  setup(o, { emit: d }) {
    var J;
    const t = o, e = d, n = ref(false), l = ref(false), i = ref(false), a = computed(() => {
      const s = {
        width: 1,
        type: Je.solid,
        color: "#D3D3D3",
        polyline: false,
        dashDensity: 3
      };
      let h2 = s;
      if (typeof t.showLine == "object") {
        let T = s.dashDensity;
        typeof t.showLine.dashDensity == "number" && t.showLine.dashDensity >= 1 && t.showLine.dashDensity <= 10 && (T = t.showLine.dashDensity), h2 = {
          width: t.showLine.width ?? s.width,
          type: t.showLine.type ?? s.type,
          color: t.showLine.color ?? s.color,
          polyline: t.showLine.polyline ?? s.polyline,
          dashDensity: T
        };
      }
      return h2;
    }), r = computed(() => a.value.width * 100 / t.nodeIndent), c = computed(() => {
      switch (a.value.type) {
        case Je.dashed:
          return 100 / (a.value.dashDensity * 2);
      }
      return "none";
    }), f = (s) => {
      var T;
      if (!a.value.polyline || !s)
        return "M50,0 L50,100";
      const h2 = (T = t.getNode(t.data[t.keyField])) == null ? void 0 : T._parent;
      return h2 && t.noSiblingNodeMap[h2[t.keyField]] && t.noSiblingNodeMap[t.data[t.keyField]] ? "M50,0 L50,50 M100,50 L50,50" : "M50,0 L50,100 M100,50 L50,50";
    }, {
      indentWrapperCls: v,
      wrapperCls: m,
      nodeBodyCls: O,
      dropBeforeCls: L,
      dropAfterCls: w,
      checkboxWrapperCls: V,
      expandCls: W,
      loadingIconCls: F,
      checkboxCls: B,
      titleCls: M
    } = tl(t, {
      dragoverBody: n,
      dragoverBefore: l,
      dragoverAfter: i
    }), N = computed(() => t.getNode(t.data ? t.data[t.keyField] : "") || t.data || {}), I = computed(() => t.checkable), X = ((J = t.data) == null ? void 0 : J.render) || t.render || null, q = computed(() => defineComponent({
      name: "Render",
      functional: true,
      render() {
        return typeof X != "function" ? h("div") : X(N.value);
      }
    })), Y = computed(() => {
      var h2;
      let s = {};
      return t.draggable && !t.disableAll && !((h2 = t.data) != null && h2.disabled) && (s = {
        dragstart: g
      }), s;
    }), R = computed(() => {
      let s = {};
      return t.droppable && (s = {
        dragenter: _.bind(getCurrentInstance()),
        dragover: A.bind(getCurrentInstance()),
        dragleave: Q.bind(getCurrentInstance()),
        drop: U.bind(getCurrentInstance())
      }), s;
    });
    function te() {
      var s;
      (s = t.data) != null && s.isLeaf || e("expand", N.value);
    }
    function oe() {
      var s;
      t.disableAll || (s = t.data) != null && s.disabled || !t.checkable || e("check", N.value);
    }
    function he(s) {
      var h2, T;
      if (e("click", N.value, s), t.selectable) {
        if (t.disableAll || (h2 = t.data) != null && h2.disabled || (T = t.data) != null && T.selected && !t.unselectOnClick)
          return;
        e("select", N.value);
      } else
        t.checkable ? oe() : te();
    }
    function ne(s) {
      e("node-dblclick", N.value, s);
    }
    function p(s) {
      e("node-right-click", N.value, s);
    }
    const k = ref();
    function $(s) {
      const h2 = k.value.getBoundingClientRect(), T = h2.height, le = s.clientY - h2.top;
      return le <= T * 0.3 ? ce.before : le <= T * (0.3 + 0.4) ? ce.body : ce.after;
    }
    function j(s, h2 = false) {
      l.value = false, n.value = false, i.value = false, h2 || (s === ce.before ? l.value = true : s === ce.body ? n.value = true : s === ce.after && (i.value = true));
    }
    function g(s) {
      var h2;
      s.dataTransfer && s.dataTransfer.setData("node", JSON.stringify(t.data)), (h2 = t.data) != null && h2.expand && te(), e("node-dragstart", N.value, s);
    }
    function _(s) {
      s.preventDefault();
      const h2 = $(s);
      j(h2), e("node-dragenter", N.value, s, h2);
    }
    function A(s) {
      s.preventDefault();
      const h2 = $(s);
      j(h2), e("node-dragover", N.value, s, h2);
    }
    function Q(s) {
      const h2 = $(s);
      j(h2, true), e("node-dragleave", N.value, s, h2);
    }
    function U(s) {
      const h2 = $(s);
      j(h2, true), e("node-drop", N.value, s, h2);
    }
    return (s, h2) => {
      var T, le, se, pe;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(v))
      }, [
        s.showLine ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(s.data._level, (ie, ge) => (openBlock(), createElementBlock("svg", {
          key: ie,
          viewBox: "0 0 100 100",
          preserveAspectRatio: "none",
          style: normalizeStyle({
            alignSelf: "stretch",
            width: `${s.nodeIndent}px`
          })
        }, [
          createBaseVNode("path", {
            fill: "none",
            d: f(ge === s.data._level - 1),
            "stroke-width": r.value,
            stroke: a.value.color,
            "stroke-dasharray": c.value
          }, null, 8, ll)
        ], 4))), 128)) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: normalizeClass(unref(m)),
          style: normalizeStyle({
            paddingLeft: s.showLine ? "none" : `${s.data._level * s.nodeIndent}px`
          })
        }, [
          createBaseVNode("div", {
            class: normalizeClass(unref(L))
          }, null, 2),
          createBaseVNode("div", mergeProps({
            ref_key: "nodeBody",
            ref: k,
            class: unref(O)
          }, toHandlers(R.value, true)), [
            createBaseVNode("div", {
              class: normalizeClass(unref(W))
            }, [
              withDirectives(createBaseVNode("i", { onClick: te }, null, 512), [
                [vShow, !((T = s.data) != null && T.isLeaf) && !((le = s.data) != null && le._loading)]
              ]),
              (se = s.data) != null && se._loading ? (openBlock(), createBlock(ut, {
                key: 0,
                class: normalizeClass(unref(F))
              }, null, 8, ["class"])) : createCommentVNode("", true)
            ], 2),
            I.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(unref(V))
            }, [
              createBaseVNode("div", {
                class: normalizeClass(unref(B)),
                onClick: oe
              }, null, 2)
            ], 2)) : createCommentVNode("", true),
            createBaseVNode("div", mergeProps({
              class: unref(M),
              onClick: he,
              onDblclick: ne,
              onContextmenu: p
            }, toHandlers(Y.value, true), {
              draggable: s.draggable && !s.disableAll && !((pe = s.data) != null && pe.disabled)
            }), [
              renderSlot(s.$slots, "default", { node: N.value }, () => [
                unref(X) ? (openBlock(), createBlock(resolveDynamicComponent(q.value), { key: 0 })) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(s.data ? s.data[s.titleField] : ""), 1)
                ], 64))
              ])
            ], 16, al)
          ], 16),
          createBaseVNode("div", {
            class: normalizeClass(unref(w))
          }, null, 2)
        ], 6)
      ], 2);
    };
  }
});
var ue = "vtree-tree";
var nl = () => {
  const o = computed(() => [`${ue}__wrapper`]), d = computed(() => [`${ue}__scroll-area`]), t = computed(() => [`${ue}__block-area`]), e = computed(() => [`${ue}__empty`]), n = computed(() => [`${ue}__empty-text_default`]), l = computed(() => [`${ue}__loading`]), i = computed(() => [`${ue}__loading-wrapper`]), a = computed(() => [`${ue}__loading-icon`]), r = computed(() => [`${ue}__iframe`]);
  return {
    wrapperCls: o,
    scrollAreaCls: d,
    blockAreaCls: t,
    emptyCls: e,
    emptyTextDefaultCls: n,
    loadingCls: l,
    loadingWrapperCls: i,
    loadingIconCls: a,
    iframeCls: r
  };
};
var sl = (o, d) => {
  const t = ref(), e = ref([]), n = ref(0), l = ref(0), i = ref(0), a = ref(0), r = ref(0), c = ref(0), f = ref(0), v = ref(0), m = ref(void 0), O = () => {
    i.value = 0, a.value = 0, t.value && (t.value.scrollTop = 0);
  }, L = () => {
    const N = t.value.clientHeight;
    r.value = Math.max(
      d.renderNodeAmount,
      Math.ceil(N / d.nodeMinHeight) + d.bufferNodeAmount
    );
  }, w = (N = false) => {
    if (n.value > r.value) {
      const I = Math.max(t.value.scrollTop, 0), X = Math.floor(I / d.nodeMinHeight);
      f.value = Math.floor(X / d.bufferNodeAmount) * d.bufferNodeAmount;
    } else
      f.value = 0;
    N && c.value === r.value && v.value === f.value || (e.value = o.blockNodes.slice(f.value, f.value + r.value).map((I) => Object.assign({}, I, {
      _parent: null,
      children: []
    })), i.value = f.value * d.nodeMinHeight, a.value = l.value - (i.value + e.value.length * d.nodeMinHeight));
  }, V = () => {
    L(), w();
  }, W = () => {
    o.blockNodes = o.store.flatData.filter(
      (N) => N.visible
    ), F(), V();
  }, F = () => {
    n.value = o.blockNodes.length, l.value = d.nodeMinHeight * n.value;
  };
  return {
    scrollArea: t,
    renderNodes: e,
    blockLength: n,
    blockAreaHeight: l,
    topSpaceHeight: i,
    bottomSpaceHeight: a,
    renderAmount: r,
    renderAmountCache: c,
    renderStart: f,
    renderStartCache: v,
    resetSpaceHeights: O,
    updateRenderAmount: L,
    updateRenderNodes: w,
    updateRender: V,
    updateBlockNodes: W,
    updateBlockData: F,
    handleTreeScroll: () => {
      m.value && window.cancelAnimationFrame(m.value), c.value = r.value, v.value = f.value, m.value = window.requestAnimationFrame(
        w.bind(null, true)
      );
    },
    scrollTo: (N, I = Me.top) => {
      const X = o.store.mapData[N];
      if (!X || !X.visible)
        return;
      let q = -1;
      for (let R = 0; R < n.value; R++)
        if (o.blockNodes[R][d.keyField] === N) {
          q = R;
          break;
        }
      if (q === -1)
        return;
      let Y = q * d.nodeMinHeight;
      if (I === Me.center) {
        const R = t.value.clientHeight;
        Y = Y - (R - d.nodeMinHeight) / 2;
      } else if (I === Me.bottom) {
        const R = t.value.clientHeight;
        Y = Y - (R - d.nodeMinHeight);
      } else
        typeof I == "number" && (Y = Y - I);
      t.value && (t.value.scrollTop = Y);
    }
  };
};
var ol = (o) => {
  const d = ref();
  onMounted(() => {
    const t = d.value;
    t != null && t.contentWindow && t.contentWindow.addEventListener("resize", o);
  }), onBeforeUnmount(() => {
    const t = d.value;
    t != null && t.contentWindow && t.contentWindow.removeEventListener("resize", o);
  });
};
var il = (o, d, t) => {
  const {
    resetSpaceHeights: e,
    updateExpandedKeys: n,
    updateBlockData: l,
    updateRender: i
  } = t, a = ref([]), r = ref(false);
  function c(s) {
    e();
    let h2 = null, T = null;
    d.checkable ? Array.isArray(d.modelValue) ? h2 = d.modelValue.concat() : typeof d.modelValue == "string" && (h2 = d.modelValue === "" ? [] : d.modelValue.split(d.separator)) : d.selectable && !Array.isArray(d.modelValue) && (T = d.modelValue), o.store.setData(
      s,
      T,
      h2
    ), n();
  }
  function f(s, h2) {
    o.store.setChecked(s, h2);
  }
  function v(s, h2) {
    o.store.setCheckedKeys(s, h2);
  }
  function m() {
    o.store.checkAll();
  }
  function O() {
    o.store.clearChecked();
  }
  function L(s, h2) {
    o.store.setSelected(s, h2);
  }
  function w() {
    o.store.clearSelected();
  }
  function V(s, h2, T = true) {
    o.store.setExpand(s, h2, T);
  }
  function W(s, h2) {
    o.store.setExpandKeys(s, h2);
  }
  function F(s) {
    o.store.setExpandAll(s);
  }
  function B(s) {
    return s = s || d.ignoreMode, o.store.getCheckedNodes(s);
  }
  function M(s) {
    return s = s || d.ignoreMode, o.store.getCheckedKeys(s);
  }
  function N() {
    return o.store.getIndeterminateNodes();
  }
  function I() {
    return o.store.getSelectedNode();
  }
  function X() {
    return o.store.getSelectedKey();
  }
  function q() {
    return o.store.getExpandNodes();
  }
  function Y() {
    return o.store.getExpandKeys();
  }
  function R() {
    return o.store.flatData.filter((s) => s._filterVisible);
  }
  function te(s) {
    return o.store.getNode(s);
  }
  function oe() {
    return o.store.data;
  }
  function he() {
    return o.store.flatData;
  }
  function ne() {
    return o.store.flatData.length;
  }
  function p(s, h2) {
    return o.store.insertBefore(s, h2);
  }
  function k(s, h2) {
    return o.store.insertAfter(s, h2);
  }
  function $(s, h2) {
    return o.store.append(s, h2);
  }
  function j(s, h2) {
    return o.store.prepend(s, h2);
  }
  function g(s) {
    return o.store.remove(s);
  }
  function _(s, h2) {
    const T = (se, pe) => {
      const ie = pe[d.titleField];
      return ie == null || !ie.toString ? false : ie.toString().toLowerCase().indexOf(se.toLowerCase()) > -1;
    }, le = h2 || d.filterMethod || T;
    o.store.filter(s, le);
  }
  function A(s) {
    if (!d.checkable)
      return;
    s = s ?? d.showUnloadCheckedNodes;
    const h2 = o.store.getCheckedNodes();
    if (o.store.filter("", (le, se) => se.checked), !s)
      return;
    const T = o.store.getUnloadCheckedKeys();
    if (T.length) {
      const le = T.map((se) => {
        const pe = d.unloadDataList.concat(h2);
        let ie = se;
        return pe.some((ge) => ge[d.keyField] === se && ge[d.titleField] != null ? (ie = ge[d.titleField], true) : false), new ke(
          {
            [d.keyField]: se,
            [d.titleField]: ie,
            checked: true,
            isLeaf: true
          },
          null,
          d.keyField,
          !!d.load
        );
      });
      a.value = le, o.blockNodes = o.blockNodes.concat(le), l(), i();
    }
  }
  function Q() {
    return r.value = true, new Promise((s, h2) => {
      d.load && d.load(null, s, h2);
    }).then((s) => {
      Array.isArray(s) && c(s);
    }).catch(() => {
    }).then(() => {
      r.value = false;
    });
  }
  function U(s, h2) {
    return o.store.updateNode(s, h2);
  }
  function J(s) {
    return o.store.updateNodes(s);
  }
  return {
    unloadCheckedNodes: a,
    isRootLoading: r,
    setData: c,
    setChecked: f,
    setCheckedKeys: v,
    checkAll: m,
    clearChecked: O,
    setSelected: L,
    clearSelected: w,
    setExpand: V,
    setExpandKeys: W,
    setExpandAll: F,
    getCheckedNodes: B,
    getCheckedKeys: M,
    getIndeterminateNodes: N,
    getSelectedNode: I,
    getSelectedKey: X,
    getExpandNodes: q,
    getExpandKeys: Y,
    getCurrentVisibleNodes: R,
    getNode: te,
    getTreeData: oe,
    getFlatData: he,
    getNodesCount: ne,
    insertBefore: p,
    insertAfter: k,
    append: $,
    prepend: j,
    remove: g,
    filter: _,
    showCheckedNodes: A,
    loadRootNodes: Q,
    updateNode: U,
    updateNodes: J
  };
};
var pt = (o, d) => o.reduce((t, e) => {
  const n = (...l) => {
    var a;
    const i = (a = d.value) == null ? void 0 : a[e];
    if (typeof i == "function")
      return i(...l);
  };
  return t[e] = n, t;
}, {});
var rl = (o, ...d) => {
  const t = {};
  return d.forEach((e) => {
    o.hasOwnProperty(e) && (t[e] = o[e]);
  }), t;
};
var dl = (o, d, t) => {
  const e = ref(false), n = ref(false), l = ref(-1), i = ref(-1), a = ref(false), r = ref(false), c = ref(0), f = ref([]), v = ref([]), m = ref([]), O = () => {
    e.value = false, n.value = false, l.value = -1, i.value = -1, c.value = 0, f.value = [], v.value = [], m.value = [];
  }, L = () => {
    const F = i.value, B = [], M = o.value.length, N = d.value - c.value;
    for (let I = l.value - N + 1; I < M && o.value[I]._level > F; I++)
      B.push(o.value[I]);
    v.value = B;
  };
  return {
    ready: n,
    currentExpandState: a,
    topNodes: f,
    middleNodes: v,
    bottomNodes: m,
    updateBeforeExpand: (F) => {
      if (!t.animation)
        return;
      O();
      const B = F[t.keyField], M = o.value.findIndex((N) => N[t.keyField] === B);
      M > -1 && (l.value = M, i.value = F._level, e.value = true, a.value = F.expand, r.value = !F.expand, c.value = d.value, r.value ? m.value = o.value.slice(l.value + 1) : L());
    },
    updateAfterExpand: () => {
      if (t.animation) {
        if (!e.value) {
          e.value = false;
          return;
        }
        l.value !== -1 && nextTick(() => {
          const F = d.value - c.value;
          f.value = o.value.slice(0, l.value - F + 1), r.value ? L() : m.value = o.value.slice(l.value - F + 1), n.value = true, nextTick(() => {
            a.value = !a.value;
          });
        });
      }
    },
    onExpandAnimationFinish: () => {
      O();
    }
  };
};
var cl = { style: {
  display: "grid"
} };
var hl = { style: { overflow: "hidden" } };
var yt = {
  data: () => [],
  unloadDataList: () => [],
  showUnloadCheckedNodes: true,
  emptyText: "暂无数据",
  titleField: "title",
  keyField: "id",
  separator: ",",
  checkable: false,
  selectable: false,
  filteredNodeCheckable: false,
  cascade: true,
  enableLeafOnly: false,
  disableAll: false,
  defaultExpandAll: false,
  defaultExpandedKeys: () => [],
  expandedKeys: () => [],
  draggable: false,
  droppable: false,
  beforeDropMethod: () => () => true,
  ignoreMode: Ie.none,
  autoLoad: true,
  expandOnFilter: true,
  unselectOnClick: true,
  loading: false,
  nodeMinHeight: 30,
  nodeIndent: 20,
  renderNodeAmount: 100,
  bufferNodeAmount: 20
};
var ul = defineComponent({
  name: "VTree",
  inheritAttrs: false,
  __name: "Tree",
  props: mergeDefaults({
    data: {},
    emptyText: {},
    modelValue: {},
    selectable: { type: Boolean },
    checkable: { type: Boolean },
    separator: {},
    ignoreMode: {},
    titleField: {},
    keyField: {},
    filterMethod: { type: Function },
    showUnloadCheckedNodes: { type: Boolean },
    unloadDataList: {},
    load: { type: Function },
    filteredNodeCheckable: { type: Boolean },
    cascade: { type: Boolean },
    enableLeafOnly: { type: Boolean },
    disableAll: { type: Boolean },
    defaultExpandAll: { type: Boolean },
    defaultExpandedKeys: {},
    expandedKeys: {},
    draggable: { type: Boolean },
    droppable: { type: Boolean },
    beforeDropMethod: { type: Function },
    autoLoad: { type: Boolean },
    render: { type: Function },
    expandOnFilter: { type: Boolean },
    unselectOnClick: { type: Boolean },
    loading: { type: Boolean },
    nodeClassName: { type: [String, Object, Array, Function] },
    showLine: { type: [Boolean, Object] },
    animation: { type: Boolean },
    nodeIndent: {},
    renderNodeAmount: {},
    nodeMinHeight: {},
    bufferNodeAmount: {}
  }, yt),
  emits: ["update:modelValue", ...et],
  setup(o, { expose: d, emit: t }) {
    const e = o, n = t, l = ["node-drop", "check", "select", "expand"], i = Ze.reduce((u, S) => (l.indexOf(S) < 0 && (u[S] = (...x) => {
      n(S, ...x);
    }), u), {}), a = () => ({
      store: new Yt({
        keyField: e.keyField,
        ignoreMode: e.ignoreMode,
        filteredNodeCheckable: e.filteredNodeCheckable,
        cascade: e.cascade,
        defaultExpandAll: e.defaultExpandAll,
        load: e.load,
        expandOnFilter: e.expandOnFilter
      }),
      blockNodes: []
    });
    let r = a();
    (() => {
      ft.forEach((u) => {
        r.store.on(u, (...S) => {
          n(u, ...S);
        });
      });
    })();
    const f = () => {
      e.expandedKeys.length && (r.store.setExpandAll(false, false), r.store.setExpandKeys(e.expandedKeys, true));
    }, {
      wrapperCls: v,
      scrollAreaCls: m,
      blockAreaCls: O,
      emptyCls: L,
      emptyTextDefaultCls: w,
      loadingCls: V,
      loadingWrapperCls: W,
      loadingIconCls: F,
      iframeCls: B
    } = nl(), {
      scrollArea: M,
      renderNodes: N,
      blockLength: I,
      topSpaceHeight: X,
      bottomSpaceHeight: q,
      renderStart: Y,
      resetSpaceHeights: R,
      updateRender: te,
      updateBlockNodes: oe,
      updateBlockData: he,
      handleTreeScroll: ne,
      scrollTo: p
    } = sl(r, e), k = dl(N, Y, e), {
      unloadCheckedNodes: $,
      isRootLoading: j,
      setData: g,
      setChecked: _,
      setCheckedKeys: A,
      checkAll: Q,
      clearChecked: U,
      setSelected: J,
      clearSelected: s,
      setExpand: h2,
      setExpandKeys: T,
      setExpandAll: le,
      getCheckedNodes: se,
      getCheckedKeys: pe,
      getIndeterminateNodes: ie,
      getSelectedNode: ge,
      getSelectedKey: gt,
      getExpandNodes: bt,
      getExpandKeys: mt,
      getCurrentVisibleNodes: vt,
      getNode: Ne,
      getTreeData: Ct,
      getFlatData: _t,
      getNodesCount: St,
      insertBefore: Nt,
      insertAfter: xt,
      append: wt,
      prepend: Dt,
      remove: Et,
      filter: Ft,
      showCheckedNodes: At,
      loadRootNodes: lt,
      updateNode: Kt,
      updateNodes: Bt
    } = il(r, e, {
      resetSpaceHeights: R,
      updateExpandedKeys: f,
      updateBlockData: he,
      updateRender: te
    }), Ve = (u) => typeof e.nodeClassName == "function" ? e.nodeClassName(u) : e.nodeClassName, He = computed(() => {
      var ye;
      const u = [];
      let S = (ye = N.value[0]) == null ? void 0 : ye._parent;
      for (; S; )
        u.push(S), S = S._parent;
      const x = u.concat(N.value), G = {}, ae = [];
      return x.forEach((we) => {
        const at = we._level;
        let Xe = ae.length;
        for (; Xe; ) {
          const nt = ae[Xe - 1], st = nt._level;
          if (st > at)
            G[nt[e.keyField]] = true, ae.pop();
          else if (st === at) {
            ae.pop();
            break;
          } else
            break;
          Xe--;
        }
        ae.push(we);
      }), ae.forEach((we) => {
        G[we[e.keyField]] = true;
      }), G;
    }), $t = (u, S) => {
      if (Array.isArray(u) && Array.isArray(S)) {
        if (u.length === S.length && u.every(
          (x) => S.some((G) => G === x)
        ))
          return true;
      } else if (u === S)
        return true;
      return false;
    }, xe = ref(
      Array.isArray(e.modelValue) ? e.modelValue.concat() : e.modelValue
    ), Ue = (u) => {
      !e.cascade && e.enableLeafOnly && !u.isLeaf || r.store.setChecked(
        u[e.keyField],
        u.indeterminate ? true : !u.checked,
        true,
        true,
        true
      );
    }, Pe = (u) => {
      e.enableLeafOnly && !u.isLeaf || r.store.setSelected(u[e.keyField], !u.selected);
    }, We = (u) => {
      k.updateBeforeExpand(u), r.store.setExpand(u[e.keyField], !u.expand);
    }, Re = (u, S, x) => {
      if (e.droppable && S.dataTransfer)
        try {
          const ae = JSON.parse(S.dataTransfer.getData("node"))[e.keyField], ye = u[e.keyField];
          if (e.beforeDropMethod(
            ae,
            ye,
            x
          )) {
            if (ae === ye)
              return;
            x === ce.before ? r.store.insertBefore(ae, ye) : x === ce.body || !u.isLeaf && u.expand ? r.store.prepend(ae, ye) : x === ce.after && r.store.insertAfter(ae, ye), n("node-drop", u, S, x, Ne(ae));
          }
        } catch (G) {
          throw new Error(G);
        }
    };
    watch(
      () => e.modelValue,
      (u) => {
        if (e.checkable) {
          if ($t(u, xe.value))
            return;
          let S = [];
          Array.isArray(u) ? S = u.concat() : typeof u == "string" && (S = u === "" ? [] : u.split(e.separator)), r.store.clearChecked(false, false), r.store.setCheckedKeys(S, true);
        } else if (e.selectable) {
          if (u === xe.value)
            return;
          const S = r.store.getSelectedKey();
          u !== "" && u != null ? r.store.setSelected(u, true) : (u === "" || u == null) && S && r.store.setSelected(S, false);
        }
      }
    ), watch(
      () => e.data,
      (u) => {
        g(u);
      }
    ), watch(
      () => e.expandedKeys,
      () => {
        f();
      }
    );
    const Lt = () => {
      if ($.value.length) {
        const u = r.store.getUnloadCheckedKeys();
        $.value.forEach((S) => {
          S.checked = u.indexOf(S[e.keyField]) > -1;
        });
      }
    }, Tt = (u, S) => {
      if (e.checkable) {
        let x = S;
        Array.isArray(e.modelValue) || (x = x.join(e.separator)), Array.isArray(x) ? xe.value = x.concat() : xe.value = x, n("update:modelValue", x);
      }
    }, Mt = (u, S) => {
      if (e.selectable && !e.checkable) {
        const x = S || "";
        xe.value = x, n("update:modelValue", x);
      }
    };
    onMounted(() => {
      r.store.on("expand", k.updateAfterExpand), r.store.on("visible-data-change", oe), r.store.on("render-data-change", te), r.store.on(
        "checked-change",
        (u, S) => {
          Tt(u, S), Lt();
        }
      ), r.store.on("selected-change", Mt), e.data.length ? (g(e.data), e.defaultExpandedKeys.length && r.store.setExpandKeys(e.defaultExpandedKeys, true)) : typeof e.load == "function" && e.autoLoad && ((e.modelValue || e.unloadDataList) && g([]), lt());
    }), onBeforeUnmount(() => {
      r.store.disposeListeners();
      const u = a();
      r.store = u.store, r.blockNodes = u.blockNodes;
    }), ol(te);
    const It = [
      "titleField",
      "keyField",
      "checkable",
      "selectable",
      "unselectOnClick",
      "disableAll",
      "draggable",
      "droppable",
      "render",
      "nodeIndent",
      "showLine"
    ], je = reactive(rl(toRefs(e), ...It));
    return d({
      setData: g,
      setChecked: _,
      setCheckedKeys: A,
      checkAll: Q,
      clearChecked: U,
      setSelected: J,
      clearSelected: s,
      setExpand: h2,
      setExpandKeys: T,
      setExpandAll: le,
      getCheckedNodes: se,
      getCheckedKeys: pe,
      getIndeterminateNodes: ie,
      getSelectedNode: ge,
      getSelectedKey: gt,
      getExpandNodes: bt,
      getExpandKeys: mt,
      getCurrentVisibleNodes: vt,
      getNode: Ne,
      getTreeData: Ct,
      getFlatData: _t,
      getNodesCount: St,
      insertBefore: Nt,
      insertAfter: xt,
      append: wt,
      prepend: Dt,
      remove: Et,
      filter: Ft,
      showCheckedNodes: At,
      loadRootNodes: lt,
      updateNode: Kt,
      updateNodes: Bt,
      scrollTo: p
    }), (u, S) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(unref(v))
    }, [
      createBaseVNode("div", {
        ref_key: "scrollArea",
        ref: M,
        class: normalizeClass(unref(m)),
        onScrollPassive: S[0] || (S[0] = withModifiers(
          //@ts-ignore
          (...x) => unref(ne) && unref(ne)(...x),
          ["stop"]
        ))
      }, [
        createBaseVNode("div", {
          class: normalizeClass(unref(O))
        }, [
          createBaseVNode("div", {
            style: normalizeStyle({ height: `${unref(X)}px` })
          }, null, 4),
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(k).ready.value ? unref(k).topNodes.value : unref(N), (x) => (openBlock(), createBlock(Ye, mergeProps({ ref_for: true }, je, {
            key: x[u.keyField],
            data: x,
            getNode: unref(Ne),
            noSiblingNodeMap: He.value
          }, toHandlers(unref(i)), {
            class: Ve(x),
            style: {
              minHeight: `${u.nodeMinHeight}px`
            },
            onCheck: Ue,
            onSelect: Pe,
            onExpand: We,
            onNodeDrop: Re
          }), {
            default: withCtx((G) => [
              renderSlot(u.$slots, "node", mergeProps({ ref_for: true }, G))
            ]),
            _: 2
          }, 1040, ["data", "getNode", "noSiblingNodeMap", "class", "style"]))), 128)),
          unref(k).ready.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createVNode(Transition, {
              name: "vtree-expand-animation",
              onAfterEnter: unref(k).onExpandAnimationFinish,
              onAfterLeave: unref(k).onExpandAnimationFinish
            }, {
              default: withCtx(() => [
                withDirectives(createBaseVNode("div", cl, [
                  createBaseVNode("div", hl, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(k).middleNodes.value, (x) => (openBlock(), createBlock(Ye, mergeProps({ ref_for: true }, je, {
                      key: x[u.keyField],
                      data: x,
                      getNode: unref(Ne),
                      noSiblingNodeMap: He.value
                    }, toHandlers(unref(i)), {
                      class: Ve(x),
                      style: {
                        minHeight: `${u.nodeMinHeight}px`
                      },
                      onCheck: Ue,
                      onSelect: Pe,
                      onExpand: We,
                      onNodeDrop: Re
                    }), {
                      default: withCtx((G) => [
                        renderSlot(u.$slots, "node", mergeProps({ ref_for: true }, G))
                      ]),
                      _: 2
                    }, 1040, ["data", "getNode", "noSiblingNodeMap", "class", "style"]))), 128))
                  ])
                ], 512), [
                  [vShow, unref(k).currentExpandState.value]
                ])
              ]),
              _: 3
            }, 8, ["onAfterEnter", "onAfterLeave"]),
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(k).bottomNodes.value, (x) => (openBlock(), createBlock(Ye, mergeProps({ ref_for: true }, je, {
              key: x[u.keyField],
              data: x,
              getNode: unref(Ne),
              noSiblingNodeMap: He.value
            }, toHandlers(unref(i)), {
              class: Ve(x),
              style: {
                minHeight: `${u.nodeMinHeight}px`
              },
              onCheck: Ue,
              onSelect: Pe,
              onExpand: We,
              onNodeDrop: Re
            }), {
              default: withCtx((G) => [
                renderSlot(u.$slots, "node", mergeProps({ ref_for: true }, G))
              ]),
              _: 2
            }, 1040, ["data", "getNode", "noSiblingNodeMap", "class", "style"]))), 128))
          ], 64)) : createCommentVNode("", true),
          createBaseVNode("div", {
            style: normalizeStyle({ height: `${unref(q)}px` })
          }, null, 4)
        ], 2)
      ], 34),
      withDirectives(createBaseVNode("div", {
        class: normalizeClass(unref(L))
      }, [
        createBaseVNode("span", {
          class: normalizeClass(unref(w))
        }, [
          renderSlot(u.$slots, "empty", {}, () => [
            createTextVNode(toDisplayString(u.emptyText), 1)
          ])
        ], 2)
      ], 2), [
        [vShow, !unref(I)]
      ]),
      withDirectives(createBaseVNode("div", {
        class: normalizeClass(unref(V))
      }, [
        createBaseVNode("div", {
          class: normalizeClass(unref(W))
        }, [
          renderSlot(u.$slots, "loading", {}, () => [
            createVNode(ut, {
              class: normalizeClass(unref(F))
            }, null, 8, ["class"])
          ])
        ], 2)
      ], 2), [
        [vShow, u.loading || unref(j)]
      ]),
      createBaseVNode("iframe", {
        ref: "iframe",
        class: normalizeClass(unref(B))
      }, null, 2)
    ], 2));
  }
});
var Z = "vtree-tree-search";
var fl = (o, d) => {
  const { checkAllStatus: t, isShowingChecked: e } = d, n = computed(() => [`${Z}__wrapper`]), l = computed(() => [`${Z}__search`]), i = computed(() => [`${Z}__check-all-wrapper`]), a = computed(() => [
    `${Z}__check-all`,
    `${K}__checkbox`,
    {
      [`${K}__checkbox_checked`]: t.checked,
      [`${K}__checkbox_indeterminate`]: t.indeterminate,
      [`${K}__checkbox_disabled`]: o.searchDisabled || t.disabled
    }
  ]), r = computed(() => [`${Z}__input-wrapper`]), c = computed(() => [
    `${Z}__input`,
    {
      [`${Z}__input_disabled`]: o.searchDisabled
    }
  ]), f = computed(() => [`${Z}__action-wrapper`]), v = computed(() => [
    `${Z}__checked-button`,
    {
      [`${Z}__checked-button_active`]: e.value
    }
  ]), m = computed(() => [`${Z}__tree-wrapper`]), O = computed(() => [`${Z}__footer`]);
  return {
    wrapperCls: n,
    searchCls: l,
    checkAllWrapperCls: i,
    checkboxCls: a,
    inputWrapperCls: r,
    inputCls: c,
    actionWrapperCls: f,
    checkedButtonCls: v,
    treeWrapperCls: m,
    footerCls: O
  };
};
var pl = ["placeholder", "disabled"];
var yl = { style: { float: "right" } };
var kt = {
  ...yt,
  searchPlaceholder: "搜索关键字",
  showCheckAll: true,
  showCheckedButton: true,
  checkedButtonText: "已选",
  showFooter: true,
  searchLength: 1,
  searchDisabled: false,
  searchRemote: false,
  searchDebounceTime: 300
};
var kl = defineComponent({
  name: "VTreeSearch",
  inheritAttrs: false,
  __name: "TreeSearch",
  props: mergeDefaults({
    data: {},
    emptyText: {},
    modelValue: {},
    selectable: { type: Boolean },
    checkable: { type: Boolean },
    separator: {},
    ignoreMode: {},
    titleField: {},
    keyField: {},
    filterMethod: { type: Function },
    showUnloadCheckedNodes: { type: Boolean },
    unloadDataList: {},
    load: { type: Function },
    filteredNodeCheckable: { type: Boolean },
    cascade: { type: Boolean },
    enableLeafOnly: { type: Boolean },
    disableAll: { type: Boolean },
    defaultExpandAll: { type: Boolean },
    defaultExpandedKeys: {},
    expandedKeys: {},
    draggable: { type: Boolean },
    droppable: { type: Boolean },
    beforeDropMethod: { type: Function },
    autoLoad: { type: Boolean },
    render: { type: Function },
    expandOnFilter: { type: Boolean },
    unselectOnClick: { type: Boolean },
    loading: { type: Boolean },
    nodeClassName: { type: [String, Object, Array, Function] },
    showLine: { type: [Boolean, Object] },
    animation: { type: Boolean },
    nodeIndent: {},
    renderNodeAmount: {},
    nodeMinHeight: {},
    bufferNodeAmount: {},
    searchPlaceholder: {},
    showCheckAll: { type: Boolean },
    showCheckedButton: { type: Boolean },
    checkedButtonText: {},
    showFooter: { type: Boolean },
    searchMethod: { type: Function },
    searchLength: {},
    searchDisabled: { type: Boolean },
    searchRemote: { type: Boolean },
    searchDebounceTime: {}
  }, kt),
  emits: ["update:modelValue", ...tt],
  setup(o, { expose: d, emit: t }) {
    const e = o, n = t, l = ["set-data", "checked-change"], i = et.reduce((g, _) => (l.indexOf(_) < 0 && (g[_] = (...A) => {
      n(_, ...A);
    }), g), {}), a = reactive({
      checked: false,
      /** 半选 */
      indeterminate: false,
      /** 禁用 */
      disabled: false
    }), r = ref(false), c = ref(""), f = ref(void 0), v = ref(0), m = ref(null), {
      wrapperCls: O,
      searchCls: L,
      checkAllWrapperCls: w,
      checkboxCls: V,
      inputWrapperCls: W,
      inputCls: F,
      actionWrapperCls: B,
      checkedButtonCls: M,
      treeWrapperCls: N,
      footerCls: I
    } = fl(e, {
      checkAllStatus: a,
      isShowingChecked: r
    }), X = computed({
      get: () => e.modelValue,
      set: (g) => {
        k(), n("update:modelValue", g);
      }
    });
    function q() {
      c.value = "";
    }
    function Y() {
      return c.value;
    }
    function R(g) {
      let _ = g;
      return typeof g != "string" && (_ = c.value), new Promise((A, Q) => {
        clearTimeout(f.value), f.value = setTimeout(() => {
          if (!(_.length > 0 && _.length < e.searchLength))
            if (r.value = false, n("search", _), typeof e.searchMethod == "function") {
              const U = e.searchMethod(_);
              Promise.resolve(U).then(() => {
                p(), A();
              });
            } else {
              if (!m.value)
                return;
              e.searchRemote ? m.value.loadRootNodes().then(() => {
                p(), A();
              }) : (m.value.filter(_), p(), A());
            }
        }, e.searchDebounceTime);
      });
    }
    function te() {
      const g = e.keyField;
      if (e.searchDisabled || a.disabled || !m.value || !g)
        return;
      const _ = m.value.getCurrentVisibleNodes().map((A) => A[g]);
      a.checked ? m.value.setCheckedKeys(_, false) : m.value.setCheckedKeys(_, true), p();
    }
    function oe() {
      R();
    }
    function he() {
      const g = () => {
        var _, A;
        r.value = !r.value, r.value ? (_ = m.value) == null || _.showCheckedNodes() : (A = m.value) == null || A.filter(c.value, () => true), p();
      };
      c.value ? (q(), R().then(() => {
        g();
      })) : g();
    }
    function ne() {
      k(), p();
    }
    function p() {
      var J;
      const g = ((J = m.value) == null ? void 0 : J.getCurrentVisibleNodes()) || [], _ = g.length;
      let A = false, Q = false, U = false;
      for (let s = 0; s < _; s++) {
        const h2 = g[s];
        if (h2.checked ? A = true : Q = true, A && Q || h2.indeterminate) {
          U = true, a.checked = false, a.indeterminate = true;
          break;
        }
      }
      U || (a.checked = A, a.indeterminate = false);
    }
    function k() {
      var g;
      v.value = ((g = m.value) == null ? void 0 : g.getCheckedKeys().length) || 0;
    }
    function $(g, _) {
      p(), n("checked-change", g, _);
    }
    function j() {
      n("set-data"), ne();
    }
    return onMounted(() => {
      e.checkable && !v.value && ne();
    }), d({
      ...pt(ct, m),
      clearKeyword: q,
      getKeyword: Y,
      search: R
    }), (g, _) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(unref(O))
    }, [
      createBaseVNode("div", {
        class: normalizeClass(unref(L))
      }, [
        g.showCheckAll && g.checkable ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(w))
        }, [
          createBaseVNode("div", {
            class: normalizeClass(unref(V)),
            onClick: te
          }, null, 2)
        ], 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: normalizeClass(unref(W))
        }, [
          renderSlot(g.$slots, "search-input", {}, () => [
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _[0] || (_[0] = (A) => c.value = A),
              type: "text",
              class: normalizeClass(unref(F)),
              placeholder: g.searchPlaceholder,
              disabled: g.searchDisabled,
              onInput: oe
            }, null, 42, pl), [
              [vModelText, c.value]
            ])
          ])
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(unref(B))
        }, [
          g.showCheckedButton && g.checkable ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: normalizeClass(unref(M)),
            onClick: he
          }, toDisplayString(g.checkedButtonText), 3)) : createCommentVNode("", true),
          renderSlot(g.$slots, "actions")
        ], 2)
      ], 2),
      createBaseVNode("div", {
        class: normalizeClass(unref(N))
      }, [
        createVNode(ul, mergeProps({
          ref_key: "treeRef",
          ref: m
        }, e, {
          modelValue: X.value,
          "onUpdate:modelValue": _[1] || (_[1] = (A) => X.value = A)
        }, toHandlers(unref(i)), {
          onSetData: j,
          onCheckedChange: $
        }), createSlots({ _: 2 }, [
          renderList(g.$slots, (A, Q) => ({
            name: Q,
            fn: withCtx((U) => [
              renderSlot(g.$slots, Q, normalizeProps(guardReactiveProps(U)))
            ])
          }))
        ]), 1040, ["modelValue"])
      ], 2),
      g.showFooter && g.checkable ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(unref(I))
      }, [
        renderSlot(g.$slots, "footer", {}, () => [
          createBaseVNode("span", yl, "已选 " + toDisplayString(v.value) + " 个", 1)
        ])
      ], 2)) : createCommentVNode("", true)
    ], 2));
  }
});
var re = "vtree-tree-drop";
var gl = (o, d) => {
  const {
    dropdownVisible: t,
    checkedCount: e,
    selectedTitle: n
  } = d, l = computed(() => [`${re}__wrapper`]), i = computed(() => [`${re}__reference`]), a = computed(() => [
    `${Z}__input`,
    `${re}__display-input`,
    {
      [`${re}__display-input_focus`]: t.value,
      [`${Z}__input_disabled`]: o.dropDisabled
    }
  ]), r = computed(() => {
    let m = false;
    return typeof o.dropPlaceholder == "string" && (o.checkable ? m = e.value === 0 : o.selectable && (m = n.value === "")), [
      `${re}__display-input-text`,
      {
        [`${re}__display-input-placeholder`]: m
      }
    ];
  }), c = computed(() => [
    `${re}__display-icon-drop`,
    {
      [`${re}__display-icon-drop_active`]: t.value
    }
  ]), f = computed(() => [`${re}__display-icon-clear`]), v = computed(() => {
    const m = Array.isArray(o.dropdownClassName) ? o.dropdownClassName : [o.dropdownClassName];
    return [`${re}__dropdown`, ...m];
  });
  return {
    wrapperCls: l,
    referenceCls: i,
    displayInputCls: a,
    displayInputTextCls: r,
    dropIconCls: c,
    clearIconCls: f,
    dropdownCls: v
  };
};
var bl = {
  ...kt,
  dropHeight: 300,
  dropDisabled: false,
  clearable: false,
  placement: ht["bottom-start"],
  transfer: false,
  dropdownWidthFixed: false
};
var Cl = defineComponent({
  name: "VTreeDrop",
  inheritAttrs: false,
  __name: "TreeDrop",
  props: mergeDefaults({
    data: {},
    emptyText: {},
    modelValue: {},
    selectable: { type: Boolean },
    checkable: { type: Boolean },
    separator: {},
    ignoreMode: {},
    titleField: {},
    keyField: {},
    filterMethod: { type: Function },
    showUnloadCheckedNodes: { type: Boolean },
    unloadDataList: {},
    load: { type: Function },
    filteredNodeCheckable: { type: Boolean },
    cascade: { type: Boolean },
    enableLeafOnly: { type: Boolean },
    disableAll: { type: Boolean },
    defaultExpandAll: { type: Boolean },
    defaultExpandedKeys: {},
    expandedKeys: {},
    draggable: { type: Boolean },
    droppable: { type: Boolean },
    beforeDropMethod: { type: Function },
    autoLoad: { type: Boolean },
    render: { type: Function },
    expandOnFilter: { type: Boolean },
    unselectOnClick: { type: Boolean },
    loading: { type: Boolean },
    nodeClassName: { type: [String, Object, Array, Function] },
    showLine: { type: [Boolean, Object] },
    animation: { type: Boolean },
    nodeIndent: {},
    renderNodeAmount: {},
    nodeMinHeight: {},
    bufferNodeAmount: {},
    searchPlaceholder: {},
    showCheckAll: { type: Boolean },
    showCheckedButton: { type: Boolean },
    checkedButtonText: {},
    showFooter: { type: Boolean },
    searchMethod: { type: Function },
    searchLength: {},
    searchDisabled: { type: Boolean },
    searchRemote: { type: Boolean },
    searchDebounceTime: {},
    dropHeight: {},
    dropPlaceholder: {},
    dropDisabled: { type: Boolean },
    clearable: { type: Boolean },
    placement: {},
    transfer: { type: Boolean },
    dropdownClassName: {},
    dropdownMinWidth: {},
    dropdownWidthFixed: { type: Boolean }
  }, bl),
  emits: [
    "update:modelValue",
    ...el
  ],
  setup(o, { expose: d, emit: t }) {
    const e = o, n = t, l = ["set-data", "checked-change", "selected-change"], i = tt.reduce((p, k) => (l.indexOf(k) < 0 && (p[k] = (...$) => {
      n(k, ...$);
    }), p), {}), a = ref(false), r = ref(0), c = ref(""), {
      wrapperCls: f,
      referenceCls: v,
      displayInputCls: m,
      displayInputTextCls: O,
      dropIconCls: L,
      clearIconCls: w,
      dropdownCls: V
    } = gl(e, {
      dropdownVisible: a,
      checkedCount: r,
      selectedTitle: c
    }), W = ref(), F = ref(), B = ref(null), M = reactive({
      /** 多选选中的节点 */
      checkedNodes: [],
      /** 多选选中的节点 key */
      checkedKeys: [],
      /** 单选选中的节点 */
      selectedNode: void 0,
      /** 单选选中的节点 key */
      selectedKey: void 0
    }), N = computed({
      get: () => e.modelValue,
      set: (p) => {
        n("update:modelValue", p);
      }
    }), I = computed(() => e.checkable ? r.value === 0 && typeof e.dropPlaceholder == "string" ? e.dropPlaceholder : `已选 ${r.value} 个` : e.selectable ? c.value === "" && typeof e.dropPlaceholder == "string" ? e.dropPlaceholder : c.value : e.dropPlaceholder || ""), X = computed(() => e.checkable ? r.value !== 0 : e.selectable ? c.value !== "" : false);
    function q() {
      const p = W.value.getBoundingClientRect(), k = p.width, $ = p.height, j = `${typeof e.dropdownMinWidth == "number" ? e.dropdownMinWidth : k}px`;
      F.value.style.minWidth = j, F.value.style.width = e.dropdownWidthFixed ? j : "auto";
      const g = F.value.getBoundingClientRect(), _ = window.getComputedStyle(
        F.value
      ), A = parseFloat(_.marginLeft) + parseFloat(_.marginRight), Q = parseFloat(_.marginTop) + parseFloat(_.marginBottom), U = g.width + A, J = g.height / 0.8 + Q;
      let s = 0, h2 = 0;
      switch (e.transfer && (s = -999, h2 = -999), e.placement) {
        case "bottom-start":
          e.transfer ? (s = window.pageYOffset + p.bottom, h2 = window.pageXOffset + p.left) : s = $;
          break;
        case "bottom-end":
          e.transfer ? (s = window.pageYOffset + p.bottom, h2 = window.pageXOffset + p.right - U) : (s = $, h2 = k - U);
          break;
        case "bottom":
          e.transfer ? (s = window.pageYOffset + p.bottom, h2 = window.pageXOffset + p.left + (k - U) / 2) : (s = $, h2 = (k - U) / 2);
          break;
        case "top-start":
          e.transfer ? (s = window.pageYOffset + p.top - J, h2 = window.pageXOffset + p.left) : s = -J;
          break;
        case "top-end":
          e.transfer ? (s = window.pageYOffset + p.top - J, h2 = window.pageXOffset + p.right - U) : (s = -J, h2 = k - U);
          break;
        case "top":
          e.transfer ? (s = window.pageYOffset + p.top - J, h2 = window.pageXOffset + p.left + (k - U) / 2) : (s = -J, h2 = (k - U) / 2);
          break;
      }
      F.value.style.top = `${s}px`, F.value.style.left = `${h2}px`;
    }
    function Y() {
      e.dropDisabled || (a.value = !a.value);
    }
    function R(p) {
      var k, $;
      !((k = W.value) != null && k.contains(p.target)) && !(($ = F.value) != null && $.contains(p.target)) && (a.value = false);
    }
    function te() {
      var p, k;
      n("clear"), e.checkable ? (p = B.value) == null || p.clearChecked() : e.selectable && ((k = B.value) == null || k.clearSelected());
    }
    function oe(p, k) {
      M.checkedNodes = p, M.checkedKeys = k, r.value = k.length, n("checked-change", p, k);
    }
    function he(p, k) {
      if (M.selectedNode = p, M.selectedKey = k, p) {
        const $ = e.titleField;
        $ && (c.value = p[$]);
      } else
        k ? c.value = k : c.value = "";
      a.value = false, n("selected-change", p, k);
    }
    function ne() {
      var p, k, $, j, g;
      if (M.checkedNodes = ((p = B.value) == null ? void 0 : p.getCheckedNodes()) || [], M.checkedKeys = ((k = B.value) == null ? void 0 : k.getCheckedKeys()) || [], M.selectedNode = (($ = B.value) == null ? void 0 : $.getSelectedNode()) || void 0, M.selectedKey = ((j = B.value) == null ? void 0 : j.getSelectedKey()) || void 0, e.checkable && (r.value = M.checkedKeys.length), e.selectable && e.modelValue != null) {
        const _ = (g = B.value) == null ? void 0 : g.getNode(
          e.modelValue
        );
        if (_) {
          const A = e.titleField;
          A && (c.value = _[A]);
        } else
          c.value = e.modelValue;
      }
    }
    return onMounted(() => {
      document.addEventListener("click", R), e.transfer && document.body.appendChild(F.value), ne();
    }), watch(
      () => a.value,
      (p) => {
        var k;
        n("dropdown-visible-change", p), p ? nextTick(() => {
          q();
        }) : (k = B.value) != null && k.getKeyword() && (B.value.clearKeyword(), B.value.search());
      }
    ), d({
      ...pt(jt, B)
    }), (p, k) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(unref(f))
    }, [
      createBaseVNode("div", {
        ref_key: "referenceRef",
        ref: W,
        class: normalizeClass(unref(v)),
        onClick: Y
      }, [
        renderSlot(p.$slots, "default", normalizeProps(guardReactiveProps(M)), () => [
          createBaseVNode("div", {
            class: normalizeClass(unref(m))
          }, [
            createBaseVNode("span", {
              class: normalizeClass(unref(O))
            }, [
              renderSlot(p.$slots, "display", normalizeProps(guardReactiveProps(M)), () => [
                createTextVNode(toDisplayString(I.value), 1)
              ])
            ], 2),
            p.dropDisabled ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createBaseVNode("i", {
                class: normalizeClass(unref(L))
              }, null, 2),
              p.clearable && X.value ? renderSlot(p.$slots, "clear", { key: 0 }, () => [
                createBaseVNode("i", {
                  class: normalizeClass(unref(w)),
                  onClick: withModifiers(te, ["stop"])
                }, null, 2)
              ]) : createCommentVNode("", true)
            ], 64))
          ], 2)
        ])
      ], 2),
      createVNode(Transition, { name: "vtree-dropdown" }, {
        default: withCtx(() => [
          withDirectives(createBaseVNode("div", {
            ref_key: "dropdownRef",
            ref: F,
            class: normalizeClass(unref(V)),
            style: normalizeStyle({
              height: `${p.dropHeight}px`
            })
          }, [
            createVNode(kl, mergeProps({
              ref_key: "treeSearchRef",
              ref: B
            }, e, {
              modelValue: N.value,
              "onUpdate:modelValue": k[0] || (k[0] = ($) => N.value = $)
            }, toHandlers(unref(i)), {
              onSetData: ne,
              onCheckedChange: oe,
              onSelectedChange: he
            }), createSlots({ _: 2 }, [
              renderList(p.$slots, ($, j) => ({
                name: j,
                fn: withCtx((g) => [
                  renderSlot(p.$slots, j, normalizeProps(guardReactiveProps(g)))
                ])
              }))
            ]), 1040, ["modelValue"])
          ], 6), [
            [vShow, a.value]
          ])
        ]),
        _: 3
      })
    ], 2));
  }
});
export {
  ke as TreeNode,
  Yt as TreeStore,
  Cl as VTreeDrop,
  Ye as VTreeNode,
  kl as VTreeSearch,
  ul as default
};
//# sourceMappingURL=@wsfe_vue-tree.js.map
