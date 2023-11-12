(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // globals:Shiny
  var require_Shiny = __commonJS({
    "globals:Shiny"(exports, module) {
      module.exports = window.Shiny;
    }
  });

  // node_modules/svelte/src/runtime/internal/utils.js
  function noop() {
  }
  function assign(tar, src) {
    for (const k in src)
      tar[k] = src[k];
    return (
      /** @type {T & S} */
      tar
    );
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return /* @__PURE__ */ Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function is_function(thing) {
    return typeof thing === "function";
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
  }
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }
  function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
      const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
      return definition[0](slot_ctx);
    }
  }
  function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
  }
  function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
      const lets = definition[2](fn(dirty));
      if ($$scope.dirty === void 0) {
        return lets;
      }
      if (typeof lets === "object") {
        const merged = [];
        const len = Math.max($$scope.dirty.length, lets.length);
        for (let i = 0; i < len; i += 1) {
          merged[i] = $$scope.dirty[i] | lets[i];
        }
        return merged;
      }
      return $$scope.dirty | lets;
    }
    return $$scope.dirty;
  }
  function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
      const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
      slot.p(slot_context, slot_changes);
    }
  }
  function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
      const dirty = [];
      const length = $$scope.ctx.length / 32;
      for (let i = 0; i < length; i++) {
        dirty[i] = -1;
      }
      return dirty;
    }
    return -1;
  }
  function exclude_internal_props(props) {
    const result = {};
    for (const k in props)
      if (k[0] !== "$")
        result[k] = props[k];
    return result;
  }
  function compute_rest_props(props, keys) {
    const rest = {};
    keys = new Set(keys);
    for (const k in props)
      if (!keys.has(k) && k[0] !== "$")
        rest[k] = props[k];
    return rest;
  }

  // node_modules/svelte/src/runtime/internal/globals.js
  var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
    // @ts-ignore Node typings have this
    global
  );

  // node_modules/svelte/src/runtime/internal/ResizeObserverSingleton.js
  var ResizeObserverSingleton = class _ResizeObserverSingleton {
    /**
     * @private
     * @readonly
     * @type {WeakMap<Element, import('./private.js').Listener>}
     */
    _listeners = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;
    /**
     * @private
     * @type {ResizeObserver}
     */
    _observer = void 0;
    /** @type {ResizeObserverOptions} */
    options;
    /** @param {ResizeObserverOptions} options */
    constructor(options) {
      this.options = options;
    }
    /**
     * @param {Element} element
     * @param {import('./private.js').Listener} listener
     * @returns {() => void}
     */
    observe(element2, listener) {
      this._listeners.set(element2, listener);
      this._getObserver().observe(element2, this.options);
      return () => {
        this._listeners.delete(element2);
        this._observer.unobserve(element2);
      };
    }
    /**
     * @private
     */
    _getObserver() {
      return this._observer ?? (this._observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          _ResizeObserverSingleton.entries.set(entry.target, entry);
          this._listeners.get(entry.target)?.(entry);
        }
      }));
    }
  };
  ResizeObserverSingleton.entries = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;

  // node_modules/svelte/src/runtime/internal/dom.js
  var is_hydrating = false;
  function start_hydrating() {
    is_hydrating = true;
  }
  function end_hydrating() {
    is_hydrating = false;
  }
  function append(target, node) {
    target.appendChild(node);
  }
  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }
  function detach(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
  function element(name) {
    return document.createElement(name);
  }
  function text(data) {
    return document.createTextNode(data);
  }
  function space() {
    return text(" ");
  }
  function empty() {
    return text("");
  }
  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
  }
  function attr(node, attribute, value) {
    if (value == null)
      node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
      node.setAttribute(attribute, value);
  }
  var always_set_through_set_attribute = ["width", "height"];
  function set_attributes(node, attributes) {
    const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
    for (const key in attributes) {
      if (attributes[key] == null) {
        node.removeAttribute(key);
      } else if (key === "style") {
        node.style.cssText = attributes[key];
      } else if (key === "__value") {
        node.value = node[key] = attributes[key];
      } else if (descriptors[key] && descriptors[key].set && always_set_through_set_attribute.indexOf(key) === -1) {
        node[key] = attributes[key];
      } else {
        attr(node, key, attributes[key]);
      }
    }
  }
  function set_custom_element_data_map(node, data_map) {
    Object.keys(data_map).forEach((key) => {
      set_custom_element_data(node, key, data_map[key]);
    });
  }
  function set_custom_element_data(node, prop, value) {
    const lower = prop.toLowerCase();
    if (lower in node) {
      node[lower] = typeof node[lower] === "boolean" && value === "" ? true : value;
    } else if (prop in node) {
      node[prop] = typeof node[prop] === "boolean" && value === "" ? true : value;
    } else {
      attr(node, prop, value);
    }
  }
  function set_dynamic_element_data(tag) {
    return /-/.test(tag) ? set_custom_element_data_map : set_attributes;
  }
  function init_binding_group(group) {
    let _inputs;
    return {
      /* push */
      p(...inputs) {
        _inputs = inputs;
        _inputs.forEach((input) => group.push(input));
      },
      /* remove */
      r() {
        _inputs.forEach((input) => group.splice(group.indexOf(input), 1));
      }
    };
  }
  function children(element2) {
    return Array.from(element2.childNodes);
  }
  function get_custom_elements_slots(element2) {
    const result = {};
    element2.childNodes.forEach(
      /** @param {Element} node */
      (node) => {
        result[node.slot || "default"] = true;
      }
    );
    return result;
  }

  // node_modules/svelte/src/runtime/internal/lifecycle.js
  var current_component;
  function set_current_component(component) {
    current_component = component;
  }
  function get_current_component() {
    if (!current_component)
      throw new Error("Function called outside component initialization");
    return current_component;
  }
  function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
    return context;
  }
  function getContext(key) {
    return get_current_component().$$.context.get(key);
  }
  function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
      callbacks.slice().forEach((fn) => fn.call(this, event));
    }
  }

  // node_modules/svelte/src/runtime/internal/scheduler.js
  var dirty_components = [];
  var binding_callbacks = [];
  var render_callbacks = [];
  var flush_callbacks = [];
  var resolved_promise = /* @__PURE__ */ Promise.resolve();
  var update_scheduled = false;
  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }
  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }
  function add_flush_callback(fn) {
    flush_callbacks.push(fn);
  }
  var seen_callbacks = /* @__PURE__ */ new Set();
  var flushidx = 0;
  function flush() {
    if (flushidx !== 0) {
      return;
    }
    const saved_component = current_component;
    do {
      try {
        while (flushidx < dirty_components.length) {
          const component = dirty_components[flushidx];
          flushidx++;
          set_current_component(component);
          update(component.$$);
        }
      } catch (e) {
        dirty_components.length = 0;
        flushidx = 0;
        throw e;
      }
      set_current_component(null);
      dirty_components.length = 0;
      flushidx = 0;
      while (binding_callbacks.length)
        binding_callbacks.pop()();
      for (let i = 0; i < render_callbacks.length; i += 1) {
        const callback = render_callbacks[i];
        if (!seen_callbacks.has(callback)) {
          seen_callbacks.add(callback);
          callback();
        }
      }
      render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
  }
  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      const dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }
  function flush_render_callbacks(fns) {
    const filtered = [];
    const targets = [];
    render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
    targets.forEach((c) => c());
    render_callbacks = filtered;
  }

  // node_modules/svelte/src/runtime/internal/transitions.js
  var outroing = /* @__PURE__ */ new Set();
  var outros;
  function group_outros() {
    outros = {
      r: 0,
      c: [],
      p: outros
      // parent group
    };
  }
  function check_outros() {
    if (!outros.r) {
      run_all(outros.c);
    }
    outros = outros.p;
  }
  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }
  function transition_out(block, local, detach2, callback) {
    if (block && block.o) {
      if (outroing.has(block))
        return;
      outroing.add(block);
      outros.c.push(() => {
        outroing.delete(block);
        if (callback) {
          if (detach2)
            block.d(1);
          callback();
        }
      });
      block.o(local);
    } else if (callback) {
      callback();
    }
  }

  // node_modules/svelte/src/runtime/internal/spread.js
  function get_spread_update(levels, updates) {
    const update2 = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
      const o = levels[i];
      const n2 = updates[i];
      if (n2) {
        for (const key in o) {
          if (!(key in n2))
            to_null_out[key] = 1;
        }
        for (const key in n2) {
          if (!accounted_for[key]) {
            update2[key] = n2[key];
            accounted_for[key] = 1;
          }
        }
        levels[i] = n2;
      } else {
        for (const key in o) {
          accounted_for[key] = 1;
        }
      }
    }
    for (const key in to_null_out) {
      if (!(key in update2))
        update2[key] = void 0;
    }
    return update2;
  }

  // node_modules/svelte/src/shared/boolean_attributes.js
  var _boolean_attributes = (
    /** @type {const} */
    [
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "inert",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ]
  );
  var boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);

  // node_modules/svelte/src/runtime/internal/Component.js
  function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== void 0) {
      component.$$.bound[index] = callback;
      callback(component.$$.ctx[index]);
    }
  }
  function create_component(block) {
    block && block.c();
  }
  function mount_component(component, target, anchor) {
    const { fragment, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    add_render_callback(() => {
      const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
      if (component.$$.on_destroy) {
        component.$$.on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
      flush_render_callbacks($$.after_update);
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }
    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }
  function init(component, options, instance11, create_fragment13, not_equal, props, append_styles = null, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
      fragment: null,
      ctx: [],
      // state
      props,
      update: noop,
      not_equal,
      bound: blank_object(),
      // lifecycle
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
      // everything else
      callbacks: blank_object(),
      dirty,
      skip_bound: false,
      root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance11 ? instance11(component, options.props || {}, (i, ret, ...rest) => {
      const value = rest.length ? rest[0] : ret;
      if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i])
          $$.bound[i](value);
        if (ready)
          make_dirty(component, i);
      }
      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    $$.fragment = create_fragment13 ? create_fragment13($$.ctx) : false;
    if (options.target) {
      if (options.hydrate) {
        start_hydrating();
        const nodes = children(options.target);
        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach);
      } else {
        $$.fragment && $$.fragment.c();
      }
      if (options.intro)
        transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor);
      end_hydrating();
      flush();
    }
    set_current_component(parent_component);
  }
  var SvelteElement;
  if (typeof HTMLElement === "function") {
    SvelteElement = class extends HTMLElement {
      /** The Svelte component constructor */
      $$ctor;
      /** Slots */
      $$s;
      /** The Svelte component instance */
      $$c;
      /** Whether or not the custom element is connected */
      $$cn = false;
      /** Component props data */
      $$d = {};
      /** `true` if currently in the process of reflecting component props back to attributes */
      $$r = false;
      /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
      $$p_d = {};
      /** @type {Record<string, Function[]>} Event listeners */
      $$l = {};
      /** @type {Map<Function, Function>} Event listener unsubscribe functions */
      $$l_u = /* @__PURE__ */ new Map();
      constructor($$componentCtor, $$slots, use_shadow_dom) {
        super();
        this.$$ctor = $$componentCtor;
        this.$$s = $$slots;
        if (use_shadow_dom) {
          this.attachShadow({ mode: "open" });
        }
      }
      addEventListener(type, listener, options) {
        this.$$l[type] = this.$$l[type] || [];
        this.$$l[type].push(listener);
        if (this.$$c) {
          const unsub = this.$$c.$on(type, listener);
          this.$$l_u.set(listener, unsub);
        }
        super.addEventListener(type, listener, options);
      }
      removeEventListener(type, listener, options) {
        super.removeEventListener(type, listener, options);
        if (this.$$c) {
          const unsub = this.$$l_u.get(listener);
          if (unsub) {
            unsub();
            this.$$l_u.delete(listener);
          }
        }
      }
      async connectedCallback() {
        this.$$cn = true;
        if (!this.$$c) {
          let create_slot2 = function(name) {
            return () => {
              let node;
              const obj = {
                c: function create() {
                  node = element("slot");
                  if (name !== "default") {
                    attr(node, "name", name);
                  }
                },
                /**
                 * @param {HTMLElement} target
                 * @param {HTMLElement} [anchor]
                 */
                m: function mount(target, anchor) {
                  insert(target, node, anchor);
                },
                d: function destroy(detaching) {
                  if (detaching) {
                    detach(node);
                  }
                }
              };
              return obj;
            };
          };
          await Promise.resolve();
          if (!this.$$cn) {
            return;
          }
          const $$slots = {};
          const existing_slots = get_custom_elements_slots(this);
          for (const name of this.$$s) {
            if (name in existing_slots) {
              $$slots[name] = [create_slot2(name)];
            }
          }
          for (const attribute of this.attributes) {
            const name = this.$$g_p(attribute.name);
            if (!(name in this.$$d)) {
              this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
            }
          }
          this.$$c = new this.$$ctor({
            target: this.shadowRoot || this,
            props: {
              ...this.$$d,
              $$slots,
              $$scope: {
                ctx: []
              }
            }
          });
          const reflect_attributes = () => {
            this.$$r = true;
            for (const key in this.$$p_d) {
              this.$$d[key] = this.$$c.$$.ctx[this.$$c.$$.props[key]];
              if (this.$$p_d[key].reflect) {
                const attribute_value = get_custom_element_value(
                  key,
                  this.$$d[key],
                  this.$$p_d,
                  "toAttribute"
                );
                if (attribute_value == null) {
                  this.removeAttribute(this.$$p_d[key].attribute || key);
                } else {
                  this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
                }
              }
            }
            this.$$r = false;
          };
          this.$$c.$$.after_update.push(reflect_attributes);
          reflect_attributes();
          for (const type in this.$$l) {
            for (const listener of this.$$l[type]) {
              const unsub = this.$$c.$on(type, listener);
              this.$$l_u.set(listener, unsub);
            }
          }
          this.$$l = {};
        }
      }
      // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
      // and setting attributes through setAttribute etc, this is helpful
      attributeChangedCallback(attr2, _oldValue, newValue) {
        if (this.$$r)
          return;
        attr2 = this.$$g_p(attr2);
        this.$$d[attr2] = get_custom_element_value(attr2, newValue, this.$$p_d, "toProp");
        this.$$c?.$set({ [attr2]: this.$$d[attr2] });
      }
      disconnectedCallback() {
        this.$$cn = false;
        Promise.resolve().then(() => {
          if (!this.$$cn) {
            this.$$c.$destroy();
            this.$$c = void 0;
          }
        });
      }
      $$g_p(attribute_name) {
        return Object.keys(this.$$p_d).find(
          (key) => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name
        ) || attribute_name;
      }
    };
  }
  function get_custom_element_value(prop, value, props_definition, transform) {
    const type = props_definition[prop]?.type;
    value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
    if (!transform || !props_definition[prop]) {
      return value;
    } else if (transform === "toAttribute") {
      switch (type) {
        case "Object":
        case "Array":
          return value == null ? null : JSON.stringify(value);
        case "Boolean":
          return value ? "" : null;
        case "Number":
          return value == null ? null : value;
        default:
          return value;
      }
    } else {
      switch (type) {
        case "Object":
        case "Array":
          return value && JSON.parse(value);
        case "Boolean":
          return value;
        case "Number":
          return value != null ? +value : value;
        default:
          return value;
      }
    }
  }
  var SvelteComponent = class {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    $$ = void 0;
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    $$set = void 0;
    /** @returns {void} */
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    /**
     * @template {Extract<keyof Events, string>} K
     * @param {K} type
     * @param {((e: Events[K]) => void) | null | undefined} callback
     * @returns {() => void}
     */
    $on(type, callback) {
      if (!is_function(callback)) {
        return noop;
      }
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
      };
    }
    /**
     * @param {Partial<Props>} props
     * @returns {void}
     */
    $set(props) {
      if (this.$$set && !is_empty(props)) {
        this.$$.skip_bound = true;
        this.$$set(props);
        this.$$.skip_bound = false;
      }
    }
  };

  // node_modules/svelte/src/shared/version.js
  var PUBLIC_VERSION = "4";

  // node_modules/svelte/src/runtime/internal/disclose-version/index.js
  if (typeof window !== "undefined")
    (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);

  // App.svelte
  var import_Shiny = __toESM(require_Shiny());

  // node_modules/tailwind-merge/dist/bundle-mjs.mjs
  var CLASS_PART_SEPARATOR = "-";
  function createClassUtils(config) {
    const classMap = createClassMap(config);
    const {
      conflictingClassGroups,
      conflictingClassGroupModifiers
    } = config;
    function getClassGroupId(className) {
      const classParts = className.split(CLASS_PART_SEPARATOR);
      if (classParts[0] === "" && classParts.length !== 1) {
        classParts.shift();
      }
      return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
    }
    function getConflictingClassGroupIds(classGroupId, hasPostfixModifier) {
      const conflicts = conflictingClassGroups[classGroupId] || [];
      if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
        return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
      }
      return conflicts;
    }
    return {
      getClassGroupId,
      getConflictingClassGroupIds
    };
  }
  function getGroupRecursive(classParts, classPartObject) {
    if (classParts.length === 0) {
      return classPartObject.classGroupId;
    }
    const currentClassPart = classParts[0];
    const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
    const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
    if (classGroupFromNextClassPart) {
      return classGroupFromNextClassPart;
    }
    if (classPartObject.validators.length === 0) {
      return void 0;
    }
    const classRest = classParts.join(CLASS_PART_SEPARATOR);
    return classPartObject.validators.find(({
      validator
    }) => validator(classRest))?.classGroupId;
  }
  var arbitraryPropertyRegex = /^\[(.+)\]$/;
  function getGroupIdForArbitraryProperty(className) {
    if (arbitraryPropertyRegex.test(className)) {
      const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
      const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(":"));
      if (property) {
        return "arbitrary.." + property;
      }
    }
  }
  function createClassMap(config) {
    const {
      theme,
      prefix
    } = config;
    const classMap = {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    };
    const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
    prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
      processClassesRecursively(classGroup, classMap, classGroupId, theme);
    });
    return classMap;
  }
  function processClassesRecursively(classGroup, classPartObject, classGroupId, theme) {
    classGroup.forEach((classDefinition) => {
      if (typeof classDefinition === "string") {
        const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
        classPartObjectToEdit.classGroupId = classGroupId;
        return;
      }
      if (typeof classDefinition === "function") {
        if (isThemeGetter(classDefinition)) {
          processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
          return;
        }
        classPartObject.validators.push({
          validator: classDefinition,
          classGroupId
        });
        return;
      }
      Object.entries(classDefinition).forEach(([key, classGroup2]) => {
        processClassesRecursively(classGroup2, getPart(classPartObject, key), classGroupId, theme);
      });
    });
  }
  function getPart(classPartObject, path) {
    let currentClassPartObject = classPartObject;
    path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
      if (!currentClassPartObject.nextPart.has(pathPart)) {
        currentClassPartObject.nextPart.set(pathPart, {
          nextPart: /* @__PURE__ */ new Map(),
          validators: []
        });
      }
      currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
    });
    return currentClassPartObject;
  }
  function isThemeGetter(func) {
    return func.isThemeGetter;
  }
  function getPrefixedClassGroupEntries(classGroupEntries, prefix) {
    if (!prefix) {
      return classGroupEntries;
    }
    return classGroupEntries.map(([classGroupId, classGroup]) => {
      const prefixedClassGroup = classGroup.map((classDefinition) => {
        if (typeof classDefinition === "string") {
          return prefix + classDefinition;
        }
        if (typeof classDefinition === "object") {
          return Object.fromEntries(Object.entries(classDefinition).map(([key, value]) => [prefix + key, value]));
        }
        return classDefinition;
      });
      return [classGroupId, prefixedClassGroup];
    });
  }
  function createLruCache(maxCacheSize) {
    if (maxCacheSize < 1) {
      return {
        get: () => void 0,
        set: () => {
        }
      };
    }
    let cacheSize = 0;
    let cache = /* @__PURE__ */ new Map();
    let previousCache = /* @__PURE__ */ new Map();
    function update2(key, value) {
      cache.set(key, value);
      cacheSize++;
      if (cacheSize > maxCacheSize) {
        cacheSize = 0;
        previousCache = cache;
        cache = /* @__PURE__ */ new Map();
      }
    }
    return {
      get(key) {
        let value = cache.get(key);
        if (value !== void 0) {
          return value;
        }
        if ((value = previousCache.get(key)) !== void 0) {
          update2(key, value);
          return value;
        }
      },
      set(key, value) {
        if (cache.has(key)) {
          cache.set(key, value);
        } else {
          update2(key, value);
        }
      }
    };
  }
  var IMPORTANT_MODIFIER = "!";
  function createSplitModifiers(config) {
    const separator = config.separator;
    const isSeparatorSingleCharacter = separator.length === 1;
    const firstSeparatorCharacter = separator[0];
    const separatorLength = separator.length;
    return function splitModifiers(className) {
      const modifiers = [];
      let bracketDepth = 0;
      let modifierStart = 0;
      let postfixModifierPosition;
      for (let index = 0; index < className.length; index++) {
        let currentCharacter = className[index];
        if (bracketDepth === 0) {
          if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
            modifiers.push(className.slice(modifierStart, index));
            modifierStart = index + separatorLength;
            continue;
          }
          if (currentCharacter === "/") {
            postfixModifierPosition = index;
            continue;
          }
        }
        if (currentCharacter === "[") {
          bracketDepth++;
        } else if (currentCharacter === "]") {
          bracketDepth--;
        }
      }
      const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
      const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
      const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
      const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
      return {
        modifiers,
        hasImportantModifier,
        baseClassName,
        maybePostfixModifierPosition
      };
    };
  }
  function sortModifiers(modifiers) {
    if (modifiers.length <= 1) {
      return modifiers;
    }
    const sortedModifiers = [];
    let unsortedModifiers = [];
    modifiers.forEach((modifier) => {
      const isArbitraryVariant = modifier[0] === "[";
      if (isArbitraryVariant) {
        sortedModifiers.push(...unsortedModifiers.sort(), modifier);
        unsortedModifiers = [];
      } else {
        unsortedModifiers.push(modifier);
      }
    });
    sortedModifiers.push(...unsortedModifiers.sort());
    return sortedModifiers;
  }
  function createConfigUtils(config) {
    return {
      cache: createLruCache(config.cacheSize),
      splitModifiers: createSplitModifiers(config),
      ...createClassUtils(config)
    };
  }
  var SPLIT_CLASSES_REGEX = /\s+/;
  function mergeClassList(classList, configUtils) {
    const {
      splitModifiers,
      getClassGroupId,
      getConflictingClassGroupIds
    } = configUtils;
    const classGroupsInConflict = /* @__PURE__ */ new Set();
    return classList.trim().split(SPLIT_CLASSES_REGEX).map((originalClassName) => {
      const {
        modifiers,
        hasImportantModifier,
        baseClassName,
        maybePostfixModifierPosition
      } = splitModifiers(originalClassName);
      let classGroupId = getClassGroupId(maybePostfixModifierPosition ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
      let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
      if (!classGroupId) {
        if (!maybePostfixModifierPosition) {
          return {
            isTailwindClass: false,
            originalClassName
          };
        }
        classGroupId = getClassGroupId(baseClassName);
        if (!classGroupId) {
          return {
            isTailwindClass: false,
            originalClassName
          };
        }
        hasPostfixModifier = false;
      }
      const variantModifier = sortModifiers(modifiers).join(":");
      const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
      return {
        isTailwindClass: true,
        modifierId,
        classGroupId,
        originalClassName,
        hasPostfixModifier
      };
    }).reverse().filter((parsed) => {
      if (!parsed.isTailwindClass) {
        return true;
      }
      const {
        modifierId,
        classGroupId,
        hasPostfixModifier
      } = parsed;
      const classId = modifierId + classGroupId;
      if (classGroupsInConflict.has(classId)) {
        return false;
      }
      classGroupsInConflict.add(classId);
      getConflictingClassGroupIds(classGroupId, hasPostfixModifier).forEach((group) => classGroupsInConflict.add(modifierId + group));
      return true;
    }).reverse().map((parsed) => parsed.originalClassName).join(" ");
  }
  function twJoin() {
    let index = 0;
    let argument;
    let resolvedValue;
    let string = "";
    while (index < arguments.length) {
      if (argument = arguments[index++]) {
        if (resolvedValue = toValue(argument)) {
          string && (string += " ");
          string += resolvedValue;
        }
      }
    }
    return string;
  }
  function toValue(mix) {
    if (typeof mix === "string") {
      return mix;
    }
    let resolvedValue;
    let string = "";
    for (let k = 0; k < mix.length; k++) {
      if (mix[k]) {
        if (resolvedValue = toValue(mix[k])) {
          string && (string += " ");
          string += resolvedValue;
        }
      }
    }
    return string;
  }
  function createTailwindMerge(createConfigFirst, ...createConfigRest) {
    let configUtils;
    let cacheGet;
    let cacheSet;
    let functionToCall = initTailwindMerge;
    function initTailwindMerge(classList) {
      const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
      configUtils = createConfigUtils(config);
      cacheGet = configUtils.cache.get;
      cacheSet = configUtils.cache.set;
      functionToCall = tailwindMerge;
      return tailwindMerge(classList);
    }
    function tailwindMerge(classList) {
      const cachedResult = cacheGet(classList);
      if (cachedResult) {
        return cachedResult;
      }
      const result = mergeClassList(classList, configUtils);
      cacheSet(classList, result);
      return result;
    }
    return function callTailwindMerge() {
      return functionToCall(twJoin.apply(null, arguments));
    };
  }
  function fromTheme(key) {
    const themeGetter = (theme) => theme[key] || [];
    themeGetter.isThemeGetter = true;
    return themeGetter;
  }
  var arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
  var fractionRegex = /^\d+\/\d+$/;
  var stringLengths = /* @__PURE__ */ new Set(["px", "full", "screen"]);
  var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
  var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
  var shadowRegex = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
  var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
  function isLength(value) {
    return isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
  }
  function isArbitraryLength(value) {
    return getIsArbitraryValue(value, "length", isLengthOnly);
  }
  function isNumber(value) {
    return Boolean(value) && !Number.isNaN(Number(value));
  }
  function isArbitraryNumber(value) {
    return getIsArbitraryValue(value, "number", isNumber);
  }
  function isInteger(value) {
    return Boolean(value) && Number.isInteger(Number(value));
  }
  function isPercent(value) {
    return value.endsWith("%") && isNumber(value.slice(0, -1));
  }
  function isArbitraryValue(value) {
    return arbitraryValueRegex.test(value);
  }
  function isTshirtSize(value) {
    return tshirtUnitRegex.test(value);
  }
  var sizeLabels = /* @__PURE__ */ new Set(["length", "size", "percentage"]);
  function isArbitrarySize(value) {
    return getIsArbitraryValue(value, sizeLabels, isNever);
  }
  function isArbitraryPosition(value) {
    return getIsArbitraryValue(value, "position", isNever);
  }
  var imageLabels = /* @__PURE__ */ new Set(["image", "url"]);
  function isArbitraryImage(value) {
    return getIsArbitraryValue(value, imageLabels, isImage);
  }
  function isArbitraryShadow(value) {
    return getIsArbitraryValue(value, "", isShadow);
  }
  function isAny() {
    return true;
  }
  function getIsArbitraryValue(value, label, testValue) {
    const result = arbitraryValueRegex.exec(value);
    if (result) {
      if (result[1]) {
        return typeof label === "string" ? result[1] === label : label.has(result[1]);
      }
      return testValue(result[2]);
    }
    return false;
  }
  function isLengthOnly(value) {
    return lengthUnitRegex.test(value);
  }
  function isNever() {
    return false;
  }
  function isShadow(value) {
    return shadowRegex.test(value);
  }
  function isImage(value) {
    return imageRegex.test(value);
  }
  function getDefaultConfig() {
    const colors = fromTheme("colors");
    const spacing = fromTheme("spacing");
    const blur2 = fromTheme("blur");
    const brightness = fromTheme("brightness");
    const borderColor = fromTheme("borderColor");
    const borderRadius = fromTheme("borderRadius");
    const borderSpacing = fromTheme("borderSpacing");
    const borderWidth = fromTheme("borderWidth");
    const contrast = fromTheme("contrast");
    const grayscale = fromTheme("grayscale");
    const hueRotate = fromTheme("hueRotate");
    const invert = fromTheme("invert");
    const gap = fromTheme("gap");
    const gradientColorStops = fromTheme("gradientColorStops");
    const gradientColorStopPositions = fromTheme("gradientColorStopPositions");
    const inset = fromTheme("inset");
    const margin = fromTheme("margin");
    const opacity = fromTheme("opacity");
    const padding = fromTheme("padding");
    const saturate = fromTheme("saturate");
    const scale = fromTheme("scale");
    const sepia = fromTheme("sepia");
    const skew = fromTheme("skew");
    const space2 = fromTheme("space");
    const translate = fromTheme("translate");
    const getOverscroll = () => ["auto", "contain", "none"];
    const getOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
    const getSpacingWithAutoAndArbitrary = () => ["auto", isArbitraryValue, spacing];
    const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
    const getLengthWithEmptyAndArbitrary = () => ["", isLength, isArbitraryLength];
    const getNumberWithAutoAndArbitrary = () => ["auto", isNumber, isArbitraryValue];
    const getPositions = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
    const getLineStyles = () => ["solid", "dashed", "dotted", "double", "none"];
    const getBlendModes = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "plus-lighter"];
    const getAlign = () => ["start", "end", "center", "between", "around", "evenly", "stretch"];
    const getZeroAndEmpty = () => ["", "0", isArbitraryValue];
    const getBreaks = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
    const getNumber = () => [isNumber, isArbitraryNumber];
    const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
    return {
      cacheSize: 500,
      separator: ":",
      theme: {
        colors: [isAny],
        spacing: [isLength, isArbitraryLength],
        blur: ["none", "", isTshirtSize, isArbitraryValue],
        brightness: getNumber(),
        borderColor: [colors],
        borderRadius: ["none", "", "full", isTshirtSize, isArbitraryValue],
        borderSpacing: getSpacingWithArbitrary(),
        borderWidth: getLengthWithEmptyAndArbitrary(),
        contrast: getNumber(),
        grayscale: getZeroAndEmpty(),
        hueRotate: getNumberAndArbitrary(),
        invert: getZeroAndEmpty(),
        gap: getSpacingWithArbitrary(),
        gradientColorStops: [colors],
        gradientColorStopPositions: [isPercent, isArbitraryLength],
        inset: getSpacingWithAutoAndArbitrary(),
        margin: getSpacingWithAutoAndArbitrary(),
        opacity: getNumber(),
        padding: getSpacingWithArbitrary(),
        saturate: getNumber(),
        scale: getNumber(),
        sepia: getZeroAndEmpty(),
        skew: getNumberAndArbitrary(),
        space: getSpacingWithArbitrary(),
        translate: getSpacingWithArbitrary()
      },
      classGroups: {
        // Layout
        /**
         * Aspect Ratio
         * @see https://tailwindcss.com/docs/aspect-ratio
         */
        aspect: [{
          aspect: ["auto", "square", "video", isArbitraryValue]
        }],
        /**
         * Container
         * @see https://tailwindcss.com/docs/container
         */
        container: ["container"],
        /**
         * Columns
         * @see https://tailwindcss.com/docs/columns
         */
        columns: [{
          columns: [isTshirtSize]
        }],
        /**
         * Break After
         * @see https://tailwindcss.com/docs/break-after
         */
        "break-after": [{
          "break-after": getBreaks()
        }],
        /**
         * Break Before
         * @see https://tailwindcss.com/docs/break-before
         */
        "break-before": [{
          "break-before": getBreaks()
        }],
        /**
         * Break Inside
         * @see https://tailwindcss.com/docs/break-inside
         */
        "break-inside": [{
          "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
        }],
        /**
         * Box Decoration Break
         * @see https://tailwindcss.com/docs/box-decoration-break
         */
        "box-decoration": [{
          "box-decoration": ["slice", "clone"]
        }],
        /**
         * Box Sizing
         * @see https://tailwindcss.com/docs/box-sizing
         */
        box: [{
          box: ["border", "content"]
        }],
        /**
         * Display
         * @see https://tailwindcss.com/docs/display
         */
        display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
        /**
         * Floats
         * @see https://tailwindcss.com/docs/float
         */
        float: [{
          float: ["right", "left", "none"]
        }],
        /**
         * Clear
         * @see https://tailwindcss.com/docs/clear
         */
        clear: [{
          clear: ["left", "right", "both", "none"]
        }],
        /**
         * Isolation
         * @see https://tailwindcss.com/docs/isolation
         */
        isolation: ["isolate", "isolation-auto"],
        /**
         * Object Fit
         * @see https://tailwindcss.com/docs/object-fit
         */
        "object-fit": [{
          object: ["contain", "cover", "fill", "none", "scale-down"]
        }],
        /**
         * Object Position
         * @see https://tailwindcss.com/docs/object-position
         */
        "object-position": [{
          object: [...getPositions(), isArbitraryValue]
        }],
        /**
         * Overflow
         * @see https://tailwindcss.com/docs/overflow
         */
        overflow: [{
          overflow: getOverflow()
        }],
        /**
         * Overflow X
         * @see https://tailwindcss.com/docs/overflow
         */
        "overflow-x": [{
          "overflow-x": getOverflow()
        }],
        /**
         * Overflow Y
         * @see https://tailwindcss.com/docs/overflow
         */
        "overflow-y": [{
          "overflow-y": getOverflow()
        }],
        /**
         * Overscroll Behavior
         * @see https://tailwindcss.com/docs/overscroll-behavior
         */
        overscroll: [{
          overscroll: getOverscroll()
        }],
        /**
         * Overscroll Behavior X
         * @see https://tailwindcss.com/docs/overscroll-behavior
         */
        "overscroll-x": [{
          "overscroll-x": getOverscroll()
        }],
        /**
         * Overscroll Behavior Y
         * @see https://tailwindcss.com/docs/overscroll-behavior
         */
        "overscroll-y": [{
          "overscroll-y": getOverscroll()
        }],
        /**
         * Position
         * @see https://tailwindcss.com/docs/position
         */
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        /**
         * Top / Right / Bottom / Left
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        inset: [{
          inset: [inset]
        }],
        /**
         * Right / Left
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        "inset-x": [{
          "inset-x": [inset]
        }],
        /**
         * Top / Bottom
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        "inset-y": [{
          "inset-y": [inset]
        }],
        /**
         * Start
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        start: [{
          start: [inset]
        }],
        /**
         * End
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        end: [{
          end: [inset]
        }],
        /**
         * Top
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        top: [{
          top: [inset]
        }],
        /**
         * Right
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        right: [{
          right: [inset]
        }],
        /**
         * Bottom
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        bottom: [{
          bottom: [inset]
        }],
        /**
         * Left
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        left: [{
          left: [inset]
        }],
        /**
         * Visibility
         * @see https://tailwindcss.com/docs/visibility
         */
        visibility: ["visible", "invisible", "collapse"],
        /**
         * Z-Index
         * @see https://tailwindcss.com/docs/z-index
         */
        z: [{
          z: ["auto", isInteger, isArbitraryValue]
        }],
        // Flexbox and Grid
        /**
         * Flex Basis
         * @see https://tailwindcss.com/docs/flex-basis
         */
        basis: [{
          basis: getSpacingWithAutoAndArbitrary()
        }],
        /**
         * Flex Direction
         * @see https://tailwindcss.com/docs/flex-direction
         */
        "flex-direction": [{
          flex: ["row", "row-reverse", "col", "col-reverse"]
        }],
        /**
         * Flex Wrap
         * @see https://tailwindcss.com/docs/flex-wrap
         */
        "flex-wrap": [{
          flex: ["wrap", "wrap-reverse", "nowrap"]
        }],
        /**
         * Flex
         * @see https://tailwindcss.com/docs/flex
         */
        flex: [{
          flex: ["1", "auto", "initial", "none", isArbitraryValue]
        }],
        /**
         * Flex Grow
         * @see https://tailwindcss.com/docs/flex-grow
         */
        grow: [{
          grow: getZeroAndEmpty()
        }],
        /**
         * Flex Shrink
         * @see https://tailwindcss.com/docs/flex-shrink
         */
        shrink: [{
          shrink: getZeroAndEmpty()
        }],
        /**
         * Order
         * @see https://tailwindcss.com/docs/order
         */
        order: [{
          order: ["first", "last", "none", isInteger, isArbitraryValue]
        }],
        /**
         * Grid Template Columns
         * @see https://tailwindcss.com/docs/grid-template-columns
         */
        "grid-cols": [{
          "grid-cols": [isAny]
        }],
        /**
         * Grid Column Start / End
         * @see https://tailwindcss.com/docs/grid-column
         */
        "col-start-end": [{
          col: ["auto", {
            span: ["full", isInteger, isArbitraryValue]
          }, isArbitraryValue]
        }],
        /**
         * Grid Column Start
         * @see https://tailwindcss.com/docs/grid-column
         */
        "col-start": [{
          "col-start": getNumberWithAutoAndArbitrary()
        }],
        /**
         * Grid Column End
         * @see https://tailwindcss.com/docs/grid-column
         */
        "col-end": [{
          "col-end": getNumberWithAutoAndArbitrary()
        }],
        /**
         * Grid Template Rows
         * @see https://tailwindcss.com/docs/grid-template-rows
         */
        "grid-rows": [{
          "grid-rows": [isAny]
        }],
        /**
         * Grid Row Start / End
         * @see https://tailwindcss.com/docs/grid-row
         */
        "row-start-end": [{
          row: ["auto", {
            span: [isInteger, isArbitraryValue]
          }, isArbitraryValue]
        }],
        /**
         * Grid Row Start
         * @see https://tailwindcss.com/docs/grid-row
         */
        "row-start": [{
          "row-start": getNumberWithAutoAndArbitrary()
        }],
        /**
         * Grid Row End
         * @see https://tailwindcss.com/docs/grid-row
         */
        "row-end": [{
          "row-end": getNumberWithAutoAndArbitrary()
        }],
        /**
         * Grid Auto Flow
         * @see https://tailwindcss.com/docs/grid-auto-flow
         */
        "grid-flow": [{
          "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
        }],
        /**
         * Grid Auto Columns
         * @see https://tailwindcss.com/docs/grid-auto-columns
         */
        "auto-cols": [{
          "auto-cols": ["auto", "min", "max", "fr", isArbitraryValue]
        }],
        /**
         * Grid Auto Rows
         * @see https://tailwindcss.com/docs/grid-auto-rows
         */
        "auto-rows": [{
          "auto-rows": ["auto", "min", "max", "fr", isArbitraryValue]
        }],
        /**
         * Gap
         * @see https://tailwindcss.com/docs/gap
         */
        gap: [{
          gap: [gap]
        }],
        /**
         * Gap X
         * @see https://tailwindcss.com/docs/gap
         */
        "gap-x": [{
          "gap-x": [gap]
        }],
        /**
         * Gap Y
         * @see https://tailwindcss.com/docs/gap
         */
        "gap-y": [{
          "gap-y": [gap]
        }],
        /**
         * Justify Content
         * @see https://tailwindcss.com/docs/justify-content
         */
        "justify-content": [{
          justify: ["normal", ...getAlign()]
        }],
        /**
         * Justify Items
         * @see https://tailwindcss.com/docs/justify-items
         */
        "justify-items": [{
          "justify-items": ["start", "end", "center", "stretch"]
        }],
        /**
         * Justify Self
         * @see https://tailwindcss.com/docs/justify-self
         */
        "justify-self": [{
          "justify-self": ["auto", "start", "end", "center", "stretch"]
        }],
        /**
         * Align Content
         * @see https://tailwindcss.com/docs/align-content
         */
        "align-content": [{
          content: ["normal", ...getAlign(), "baseline"]
        }],
        /**
         * Align Items
         * @see https://tailwindcss.com/docs/align-items
         */
        "align-items": [{
          items: ["start", "end", "center", "baseline", "stretch"]
        }],
        /**
         * Align Self
         * @see https://tailwindcss.com/docs/align-self
         */
        "align-self": [{
          self: ["auto", "start", "end", "center", "stretch", "baseline"]
        }],
        /**
         * Place Content
         * @see https://tailwindcss.com/docs/place-content
         */
        "place-content": [{
          "place-content": [...getAlign(), "baseline"]
        }],
        /**
         * Place Items
         * @see https://tailwindcss.com/docs/place-items
         */
        "place-items": [{
          "place-items": ["start", "end", "center", "baseline", "stretch"]
        }],
        /**
         * Place Self
         * @see https://tailwindcss.com/docs/place-self
         */
        "place-self": [{
          "place-self": ["auto", "start", "end", "center", "stretch"]
        }],
        // Spacing
        /**
         * Padding
         * @see https://tailwindcss.com/docs/padding
         */
        p: [{
          p: [padding]
        }],
        /**
         * Padding X
         * @see https://tailwindcss.com/docs/padding
         */
        px: [{
          px: [padding]
        }],
        /**
         * Padding Y
         * @see https://tailwindcss.com/docs/padding
         */
        py: [{
          py: [padding]
        }],
        /**
         * Padding Start
         * @see https://tailwindcss.com/docs/padding
         */
        ps: [{
          ps: [padding]
        }],
        /**
         * Padding End
         * @see https://tailwindcss.com/docs/padding
         */
        pe: [{
          pe: [padding]
        }],
        /**
         * Padding Top
         * @see https://tailwindcss.com/docs/padding
         */
        pt: [{
          pt: [padding]
        }],
        /**
         * Padding Right
         * @see https://tailwindcss.com/docs/padding
         */
        pr: [{
          pr: [padding]
        }],
        /**
         * Padding Bottom
         * @see https://tailwindcss.com/docs/padding
         */
        pb: [{
          pb: [padding]
        }],
        /**
         * Padding Left
         * @see https://tailwindcss.com/docs/padding
         */
        pl: [{
          pl: [padding]
        }],
        /**
         * Margin
         * @see https://tailwindcss.com/docs/margin
         */
        m: [{
          m: [margin]
        }],
        /**
         * Margin X
         * @see https://tailwindcss.com/docs/margin
         */
        mx: [{
          mx: [margin]
        }],
        /**
         * Margin Y
         * @see https://tailwindcss.com/docs/margin
         */
        my: [{
          my: [margin]
        }],
        /**
         * Margin Start
         * @see https://tailwindcss.com/docs/margin
         */
        ms: [{
          ms: [margin]
        }],
        /**
         * Margin End
         * @see https://tailwindcss.com/docs/margin
         */
        me: [{
          me: [margin]
        }],
        /**
         * Margin Top
         * @see https://tailwindcss.com/docs/margin
         */
        mt: [{
          mt: [margin]
        }],
        /**
         * Margin Right
         * @see https://tailwindcss.com/docs/margin
         */
        mr: [{
          mr: [margin]
        }],
        /**
         * Margin Bottom
         * @see https://tailwindcss.com/docs/margin
         */
        mb: [{
          mb: [margin]
        }],
        /**
         * Margin Left
         * @see https://tailwindcss.com/docs/margin
         */
        ml: [{
          ml: [margin]
        }],
        /**
         * Space Between X
         * @see https://tailwindcss.com/docs/space
         */
        "space-x": [{
          "space-x": [space2]
        }],
        /**
         * Space Between X Reverse
         * @see https://tailwindcss.com/docs/space
         */
        "space-x-reverse": ["space-x-reverse"],
        /**
         * Space Between Y
         * @see https://tailwindcss.com/docs/space
         */
        "space-y": [{
          "space-y": [space2]
        }],
        /**
         * Space Between Y Reverse
         * @see https://tailwindcss.com/docs/space
         */
        "space-y-reverse": ["space-y-reverse"],
        // Sizing
        /**
         * Width
         * @see https://tailwindcss.com/docs/width
         */
        w: [{
          w: ["auto", "min", "max", "fit", isArbitraryValue, spacing]
        }],
        /**
         * Min-Width
         * @see https://tailwindcss.com/docs/min-width
         */
        "min-w": [{
          "min-w": ["min", "max", "fit", isArbitraryValue, isLength]
        }],
        /**
         * Max-Width
         * @see https://tailwindcss.com/docs/max-width
         */
        "max-w": [{
          "max-w": ["0", "none", "full", "min", "max", "fit", "prose", {
            screen: [isTshirtSize]
          }, isTshirtSize, isArbitraryValue]
        }],
        /**
         * Height
         * @see https://tailwindcss.com/docs/height
         */
        h: [{
          h: [isArbitraryValue, spacing, "auto", "min", "max", "fit"]
        }],
        /**
         * Min-Height
         * @see https://tailwindcss.com/docs/min-height
         */
        "min-h": [{
          "min-h": ["min", "max", "fit", isLength, isArbitraryValue]
        }],
        /**
         * Max-Height
         * @see https://tailwindcss.com/docs/max-height
         */
        "max-h": [{
          "max-h": [isArbitraryValue, spacing, "min", "max", "fit"]
        }],
        // Typography
        /**
         * Font Size
         * @see https://tailwindcss.com/docs/font-size
         */
        "font-size": [{
          text: ["base", isTshirtSize, isArbitraryLength]
        }],
        /**
         * Font Smoothing
         * @see https://tailwindcss.com/docs/font-smoothing
         */
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        /**
         * Font Style
         * @see https://tailwindcss.com/docs/font-style
         */
        "font-style": ["italic", "not-italic"],
        /**
         * Font Weight
         * @see https://tailwindcss.com/docs/font-weight
         */
        "font-weight": [{
          font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", isArbitraryNumber]
        }],
        /**
         * Font Family
         * @see https://tailwindcss.com/docs/font-family
         */
        "font-family": [{
          font: [isAny]
        }],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-normal": ["normal-nums"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-ordinal": ["ordinal"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-slashed-zero": ["slashed-zero"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
        /**
         * Letter Spacing
         * @see https://tailwindcss.com/docs/letter-spacing
         */
        tracking: [{
          tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", isArbitraryValue]
        }],
        /**
         * Line Clamp
         * @see https://tailwindcss.com/docs/line-clamp
         */
        "line-clamp": [{
          "line-clamp": ["none", isNumber, isArbitraryNumber]
        }],
        /**
         * Line Height
         * @see https://tailwindcss.com/docs/line-height
         */
        leading: [{
          leading: ["none", "tight", "snug", "normal", "relaxed", "loose", isLength, isArbitraryValue]
        }],
        /**
         * List Style Image
         * @see https://tailwindcss.com/docs/list-style-image
         */
        "list-image": [{
          "list-image": ["none", isArbitraryValue]
        }],
        /**
         * List Style Type
         * @see https://tailwindcss.com/docs/list-style-type
         */
        "list-style-type": [{
          list: ["none", "disc", "decimal", isArbitraryValue]
        }],
        /**
         * List Style Position
         * @see https://tailwindcss.com/docs/list-style-position
         */
        "list-style-position": [{
          list: ["inside", "outside"]
        }],
        /**
         * Placeholder Color
         * @deprecated since Tailwind CSS v3.0.0
         * @see https://tailwindcss.com/docs/placeholder-color
         */
        "placeholder-color": [{
          placeholder: [colors]
        }],
        /**
         * Placeholder Opacity
         * @see https://tailwindcss.com/docs/placeholder-opacity
         */
        "placeholder-opacity": [{
          "placeholder-opacity": [opacity]
        }],
        /**
         * Text Alignment
         * @see https://tailwindcss.com/docs/text-align
         */
        "text-alignment": [{
          text: ["left", "center", "right", "justify", "start", "end"]
        }],
        /**
         * Text Color
         * @see https://tailwindcss.com/docs/text-color
         */
        "text-color": [{
          text: [colors]
        }],
        /**
         * Text Opacity
         * @see https://tailwindcss.com/docs/text-opacity
         */
        "text-opacity": [{
          "text-opacity": [opacity]
        }],
        /**
         * Text Decoration
         * @see https://tailwindcss.com/docs/text-decoration
         */
        "text-decoration": ["underline", "overline", "line-through", "no-underline"],
        /**
         * Text Decoration Style
         * @see https://tailwindcss.com/docs/text-decoration-style
         */
        "text-decoration-style": [{
          decoration: [...getLineStyles(), "wavy"]
        }],
        /**
         * Text Decoration Thickness
         * @see https://tailwindcss.com/docs/text-decoration-thickness
         */
        "text-decoration-thickness": [{
          decoration: ["auto", "from-font", isLength, isArbitraryLength]
        }],
        /**
         * Text Underline Offset
         * @see https://tailwindcss.com/docs/text-underline-offset
         */
        "underline-offset": [{
          "underline-offset": ["auto", isLength, isArbitraryValue]
        }],
        /**
         * Text Decoration Color
         * @see https://tailwindcss.com/docs/text-decoration-color
         */
        "text-decoration-color": [{
          decoration: [colors]
        }],
        /**
         * Text Transform
         * @see https://tailwindcss.com/docs/text-transform
         */
        "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
        /**
         * Text Overflow
         * @see https://tailwindcss.com/docs/text-overflow
         */
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        /**
         * Text Indent
         * @see https://tailwindcss.com/docs/text-indent
         */
        indent: [{
          indent: getSpacingWithArbitrary()
        }],
        /**
         * Vertical Alignment
         * @see https://tailwindcss.com/docs/vertical-align
         */
        "vertical-align": [{
          align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryValue]
        }],
        /**
         * Whitespace
         * @see https://tailwindcss.com/docs/whitespace
         */
        whitespace: [{
          whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
        }],
        /**
         * Word Break
         * @see https://tailwindcss.com/docs/word-break
         */
        break: [{
          break: ["normal", "words", "all", "keep"]
        }],
        /**
         * Hyphens
         * @see https://tailwindcss.com/docs/hyphens
         */
        hyphens: [{
          hyphens: ["none", "manual", "auto"]
        }],
        /**
         * Content
         * @see https://tailwindcss.com/docs/content
         */
        content: [{
          content: ["none", isArbitraryValue]
        }],
        // Backgrounds
        /**
         * Background Attachment
         * @see https://tailwindcss.com/docs/background-attachment
         */
        "bg-attachment": [{
          bg: ["fixed", "local", "scroll"]
        }],
        /**
         * Background Clip
         * @see https://tailwindcss.com/docs/background-clip
         */
        "bg-clip": [{
          "bg-clip": ["border", "padding", "content", "text"]
        }],
        /**
         * Background Opacity
         * @deprecated since Tailwind CSS v3.0.0
         * @see https://tailwindcss.com/docs/background-opacity
         */
        "bg-opacity": [{
          "bg-opacity": [opacity]
        }],
        /**
         * Background Origin
         * @see https://tailwindcss.com/docs/background-origin
         */
        "bg-origin": [{
          "bg-origin": ["border", "padding", "content"]
        }],
        /**
         * Background Position
         * @see https://tailwindcss.com/docs/background-position
         */
        "bg-position": [{
          bg: [...getPositions(), isArbitraryPosition]
        }],
        /**
         * Background Repeat
         * @see https://tailwindcss.com/docs/background-repeat
         */
        "bg-repeat": [{
          bg: ["no-repeat", {
            repeat: ["", "x", "y", "round", "space"]
          }]
        }],
        /**
         * Background Size
         * @see https://tailwindcss.com/docs/background-size
         */
        "bg-size": [{
          bg: ["auto", "cover", "contain", isArbitrarySize]
        }],
        /**
         * Background Image
         * @see https://tailwindcss.com/docs/background-image
         */
        "bg-image": [{
          bg: ["none", {
            "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, isArbitraryImage]
        }],
        /**
         * Background Color
         * @see https://tailwindcss.com/docs/background-color
         */
        "bg-color": [{
          bg: [colors]
        }],
        /**
         * Gradient Color Stops From Position
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-from-pos": [{
          from: [gradientColorStopPositions]
        }],
        /**
         * Gradient Color Stops Via Position
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-via-pos": [{
          via: [gradientColorStopPositions]
        }],
        /**
         * Gradient Color Stops To Position
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-to-pos": [{
          to: [gradientColorStopPositions]
        }],
        /**
         * Gradient Color Stops From
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-from": [{
          from: [gradientColorStops]
        }],
        /**
         * Gradient Color Stops Via
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-via": [{
          via: [gradientColorStops]
        }],
        /**
         * Gradient Color Stops To
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-to": [{
          to: [gradientColorStops]
        }],
        // Borders
        /**
         * Border Radius
         * @see https://tailwindcss.com/docs/border-radius
         */
        rounded: [{
          rounded: [borderRadius]
        }],
        /**
         * Border Radius Start
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-s": [{
          "rounded-s": [borderRadius]
        }],
        /**
         * Border Radius End
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-e": [{
          "rounded-e": [borderRadius]
        }],
        /**
         * Border Radius Top
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-t": [{
          "rounded-t": [borderRadius]
        }],
        /**
         * Border Radius Right
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-r": [{
          "rounded-r": [borderRadius]
        }],
        /**
         * Border Radius Bottom
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-b": [{
          "rounded-b": [borderRadius]
        }],
        /**
         * Border Radius Left
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-l": [{
          "rounded-l": [borderRadius]
        }],
        /**
         * Border Radius Start Start
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-ss": [{
          "rounded-ss": [borderRadius]
        }],
        /**
         * Border Radius Start End
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-se": [{
          "rounded-se": [borderRadius]
        }],
        /**
         * Border Radius End End
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-ee": [{
          "rounded-ee": [borderRadius]
        }],
        /**
         * Border Radius End Start
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-es": [{
          "rounded-es": [borderRadius]
        }],
        /**
         * Border Radius Top Left
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-tl": [{
          "rounded-tl": [borderRadius]
        }],
        /**
         * Border Radius Top Right
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-tr": [{
          "rounded-tr": [borderRadius]
        }],
        /**
         * Border Radius Bottom Right
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-br": [{
          "rounded-br": [borderRadius]
        }],
        /**
         * Border Radius Bottom Left
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-bl": [{
          "rounded-bl": [borderRadius]
        }],
        /**
         * Border Width
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w": [{
          border: [borderWidth]
        }],
        /**
         * Border Width X
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-x": [{
          "border-x": [borderWidth]
        }],
        /**
         * Border Width Y
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-y": [{
          "border-y": [borderWidth]
        }],
        /**
         * Border Width Start
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-s": [{
          "border-s": [borderWidth]
        }],
        /**
         * Border Width End
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-e": [{
          "border-e": [borderWidth]
        }],
        /**
         * Border Width Top
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-t": [{
          "border-t": [borderWidth]
        }],
        /**
         * Border Width Right
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-r": [{
          "border-r": [borderWidth]
        }],
        /**
         * Border Width Bottom
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-b": [{
          "border-b": [borderWidth]
        }],
        /**
         * Border Width Left
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-l": [{
          "border-l": [borderWidth]
        }],
        /**
         * Border Opacity
         * @see https://tailwindcss.com/docs/border-opacity
         */
        "border-opacity": [{
          "border-opacity": [opacity]
        }],
        /**
         * Border Style
         * @see https://tailwindcss.com/docs/border-style
         */
        "border-style": [{
          border: [...getLineStyles(), "hidden"]
        }],
        /**
         * Divide Width X
         * @see https://tailwindcss.com/docs/divide-width
         */
        "divide-x": [{
          "divide-x": [borderWidth]
        }],
        /**
         * Divide Width X Reverse
         * @see https://tailwindcss.com/docs/divide-width
         */
        "divide-x-reverse": ["divide-x-reverse"],
        /**
         * Divide Width Y
         * @see https://tailwindcss.com/docs/divide-width
         */
        "divide-y": [{
          "divide-y": [borderWidth]
        }],
        /**
         * Divide Width Y Reverse
         * @see https://tailwindcss.com/docs/divide-width
         */
        "divide-y-reverse": ["divide-y-reverse"],
        /**
         * Divide Opacity
         * @see https://tailwindcss.com/docs/divide-opacity
         */
        "divide-opacity": [{
          "divide-opacity": [opacity]
        }],
        /**
         * Divide Style
         * @see https://tailwindcss.com/docs/divide-style
         */
        "divide-style": [{
          divide: getLineStyles()
        }],
        /**
         * Border Color
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color": [{
          border: [borderColor]
        }],
        /**
         * Border Color X
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-x": [{
          "border-x": [borderColor]
        }],
        /**
         * Border Color Y
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-y": [{
          "border-y": [borderColor]
        }],
        /**
         * Border Color Top
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-t": [{
          "border-t": [borderColor]
        }],
        /**
         * Border Color Right
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-r": [{
          "border-r": [borderColor]
        }],
        /**
         * Border Color Bottom
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-b": [{
          "border-b": [borderColor]
        }],
        /**
         * Border Color Left
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-l": [{
          "border-l": [borderColor]
        }],
        /**
         * Divide Color
         * @see https://tailwindcss.com/docs/divide-color
         */
        "divide-color": [{
          divide: [borderColor]
        }],
        /**
         * Outline Style
         * @see https://tailwindcss.com/docs/outline-style
         */
        "outline-style": [{
          outline: ["", ...getLineStyles()]
        }],
        /**
         * Outline Offset
         * @see https://tailwindcss.com/docs/outline-offset
         */
        "outline-offset": [{
          "outline-offset": [isLength, isArbitraryValue]
        }],
        /**
         * Outline Width
         * @see https://tailwindcss.com/docs/outline-width
         */
        "outline-w": [{
          outline: [isLength, isArbitraryLength]
        }],
        /**
         * Outline Color
         * @see https://tailwindcss.com/docs/outline-color
         */
        "outline-color": [{
          outline: [colors]
        }],
        /**
         * Ring Width
         * @see https://tailwindcss.com/docs/ring-width
         */
        "ring-w": [{
          ring: getLengthWithEmptyAndArbitrary()
        }],
        /**
         * Ring Width Inset
         * @see https://tailwindcss.com/docs/ring-width
         */
        "ring-w-inset": ["ring-inset"],
        /**
         * Ring Color
         * @see https://tailwindcss.com/docs/ring-color
         */
        "ring-color": [{
          ring: [colors]
        }],
        /**
         * Ring Opacity
         * @see https://tailwindcss.com/docs/ring-opacity
         */
        "ring-opacity": [{
          "ring-opacity": [opacity]
        }],
        /**
         * Ring Offset Width
         * @see https://tailwindcss.com/docs/ring-offset-width
         */
        "ring-offset-w": [{
          "ring-offset": [isLength, isArbitraryLength]
        }],
        /**
         * Ring Offset Color
         * @see https://tailwindcss.com/docs/ring-offset-color
         */
        "ring-offset-color": [{
          "ring-offset": [colors]
        }],
        // Effects
        /**
         * Box Shadow
         * @see https://tailwindcss.com/docs/box-shadow
         */
        shadow: [{
          shadow: ["", "inner", "none", isTshirtSize, isArbitraryShadow]
        }],
        /**
         * Box Shadow Color
         * @see https://tailwindcss.com/docs/box-shadow-color
         */
        "shadow-color": [{
          shadow: [isAny]
        }],
        /**
         * Opacity
         * @see https://tailwindcss.com/docs/opacity
         */
        opacity: [{
          opacity: [opacity]
        }],
        /**
         * Mix Blend Mode
         * @see https://tailwindcss.com/docs/mix-blend-mode
         */
        "mix-blend": [{
          "mix-blend": getBlendModes()
        }],
        /**
         * Background Blend Mode
         * @see https://tailwindcss.com/docs/background-blend-mode
         */
        "bg-blend": [{
          "bg-blend": getBlendModes()
        }],
        // Filters
        /**
         * Filter
         * @deprecated since Tailwind CSS v3.0.0
         * @see https://tailwindcss.com/docs/filter
         */
        filter: [{
          filter: ["", "none"]
        }],
        /**
         * Blur
         * @see https://tailwindcss.com/docs/blur
         */
        blur: [{
          blur: [blur2]
        }],
        /**
         * Brightness
         * @see https://tailwindcss.com/docs/brightness
         */
        brightness: [{
          brightness: [brightness]
        }],
        /**
         * Contrast
         * @see https://tailwindcss.com/docs/contrast
         */
        contrast: [{
          contrast: [contrast]
        }],
        /**
         * Drop Shadow
         * @see https://tailwindcss.com/docs/drop-shadow
         */
        "drop-shadow": [{
          "drop-shadow": ["", "none", isTshirtSize, isArbitraryValue]
        }],
        /**
         * Grayscale
         * @see https://tailwindcss.com/docs/grayscale
         */
        grayscale: [{
          grayscale: [grayscale]
        }],
        /**
         * Hue Rotate
         * @see https://tailwindcss.com/docs/hue-rotate
         */
        "hue-rotate": [{
          "hue-rotate": [hueRotate]
        }],
        /**
         * Invert
         * @see https://tailwindcss.com/docs/invert
         */
        invert: [{
          invert: [invert]
        }],
        /**
         * Saturate
         * @see https://tailwindcss.com/docs/saturate
         */
        saturate: [{
          saturate: [saturate]
        }],
        /**
         * Sepia
         * @see https://tailwindcss.com/docs/sepia
         */
        sepia: [{
          sepia: [sepia]
        }],
        /**
         * Backdrop Filter
         * @deprecated since Tailwind CSS v3.0.0
         * @see https://tailwindcss.com/docs/backdrop-filter
         */
        "backdrop-filter": [{
          "backdrop-filter": ["", "none"]
        }],
        /**
         * Backdrop Blur
         * @see https://tailwindcss.com/docs/backdrop-blur
         */
        "backdrop-blur": [{
          "backdrop-blur": [blur2]
        }],
        /**
         * Backdrop Brightness
         * @see https://tailwindcss.com/docs/backdrop-brightness
         */
        "backdrop-brightness": [{
          "backdrop-brightness": [brightness]
        }],
        /**
         * Backdrop Contrast
         * @see https://tailwindcss.com/docs/backdrop-contrast
         */
        "backdrop-contrast": [{
          "backdrop-contrast": [contrast]
        }],
        /**
         * Backdrop Grayscale
         * @see https://tailwindcss.com/docs/backdrop-grayscale
         */
        "backdrop-grayscale": [{
          "backdrop-grayscale": [grayscale]
        }],
        /**
         * Backdrop Hue Rotate
         * @see https://tailwindcss.com/docs/backdrop-hue-rotate
         */
        "backdrop-hue-rotate": [{
          "backdrop-hue-rotate": [hueRotate]
        }],
        /**
         * Backdrop Invert
         * @see https://tailwindcss.com/docs/backdrop-invert
         */
        "backdrop-invert": [{
          "backdrop-invert": [invert]
        }],
        /**
         * Backdrop Opacity
         * @see https://tailwindcss.com/docs/backdrop-opacity
         */
        "backdrop-opacity": [{
          "backdrop-opacity": [opacity]
        }],
        /**
         * Backdrop Saturate
         * @see https://tailwindcss.com/docs/backdrop-saturate
         */
        "backdrop-saturate": [{
          "backdrop-saturate": [saturate]
        }],
        /**
         * Backdrop Sepia
         * @see https://tailwindcss.com/docs/backdrop-sepia
         */
        "backdrop-sepia": [{
          "backdrop-sepia": [sepia]
        }],
        // Tables
        /**
         * Border Collapse
         * @see https://tailwindcss.com/docs/border-collapse
         */
        "border-collapse": [{
          border: ["collapse", "separate"]
        }],
        /**
         * Border Spacing
         * @see https://tailwindcss.com/docs/border-spacing
         */
        "border-spacing": [{
          "border-spacing": [borderSpacing]
        }],
        /**
         * Border Spacing X
         * @see https://tailwindcss.com/docs/border-spacing
         */
        "border-spacing-x": [{
          "border-spacing-x": [borderSpacing]
        }],
        /**
         * Border Spacing Y
         * @see https://tailwindcss.com/docs/border-spacing
         */
        "border-spacing-y": [{
          "border-spacing-y": [borderSpacing]
        }],
        /**
         * Table Layout
         * @see https://tailwindcss.com/docs/table-layout
         */
        "table-layout": [{
          table: ["auto", "fixed"]
        }],
        /**
         * Caption Side
         * @see https://tailwindcss.com/docs/caption-side
         */
        caption: [{
          caption: ["top", "bottom"]
        }],
        // Transitions and Animation
        /**
         * Tranisition Property
         * @see https://tailwindcss.com/docs/transition-property
         */
        transition: [{
          transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", isArbitraryValue]
        }],
        /**
         * Transition Duration
         * @see https://tailwindcss.com/docs/transition-duration
         */
        duration: [{
          duration: getNumberAndArbitrary()
        }],
        /**
         * Transition Timing Function
         * @see https://tailwindcss.com/docs/transition-timing-function
         */
        ease: [{
          ease: ["linear", "in", "out", "in-out", isArbitraryValue]
        }],
        /**
         * Transition Delay
         * @see https://tailwindcss.com/docs/transition-delay
         */
        delay: [{
          delay: getNumberAndArbitrary()
        }],
        /**
         * Animation
         * @see https://tailwindcss.com/docs/animation
         */
        animate: [{
          animate: ["none", "spin", "ping", "pulse", "bounce", isArbitraryValue]
        }],
        // Transforms
        /**
         * Transform
         * @see https://tailwindcss.com/docs/transform
         */
        transform: [{
          transform: ["", "gpu", "none"]
        }],
        /**
         * Scale
         * @see https://tailwindcss.com/docs/scale
         */
        scale: [{
          scale: [scale]
        }],
        /**
         * Scale X
         * @see https://tailwindcss.com/docs/scale
         */
        "scale-x": [{
          "scale-x": [scale]
        }],
        /**
         * Scale Y
         * @see https://tailwindcss.com/docs/scale
         */
        "scale-y": [{
          "scale-y": [scale]
        }],
        /**
         * Rotate
         * @see https://tailwindcss.com/docs/rotate
         */
        rotate: [{
          rotate: [isInteger, isArbitraryValue]
        }],
        /**
         * Translate X
         * @see https://tailwindcss.com/docs/translate
         */
        "translate-x": [{
          "translate-x": [translate]
        }],
        /**
         * Translate Y
         * @see https://tailwindcss.com/docs/translate
         */
        "translate-y": [{
          "translate-y": [translate]
        }],
        /**
         * Skew X
         * @see https://tailwindcss.com/docs/skew
         */
        "skew-x": [{
          "skew-x": [skew]
        }],
        /**
         * Skew Y
         * @see https://tailwindcss.com/docs/skew
         */
        "skew-y": [{
          "skew-y": [skew]
        }],
        /**
         * Transform Origin
         * @see https://tailwindcss.com/docs/transform-origin
         */
        "transform-origin": [{
          origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryValue]
        }],
        // Interactivity
        /**
         * Accent Color
         * @see https://tailwindcss.com/docs/accent-color
         */
        accent: [{
          accent: ["auto", colors]
        }],
        /**
         * Appearance
         * @see https://tailwindcss.com/docs/appearance
         */
        appearance: ["appearance-none"],
        /**
         * Cursor
         * @see https://tailwindcss.com/docs/cursor
         */
        cursor: [{
          cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryValue]
        }],
        /**
         * Caret Color
         * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
         */
        "caret-color": [{
          caret: [colors]
        }],
        /**
         * Pointer Events
         * @see https://tailwindcss.com/docs/pointer-events
         */
        "pointer-events": [{
          "pointer-events": ["none", "auto"]
        }],
        /**
         * Resize
         * @see https://tailwindcss.com/docs/resize
         */
        resize: [{
          resize: ["none", "y", "x", ""]
        }],
        /**
         * Scroll Behavior
         * @see https://tailwindcss.com/docs/scroll-behavior
         */
        "scroll-behavior": [{
          scroll: ["auto", "smooth"]
        }],
        /**
         * Scroll Margin
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-m": [{
          "scroll-m": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Margin X
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-mx": [{
          "scroll-mx": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Margin Y
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-my": [{
          "scroll-my": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Margin Start
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-ms": [{
          "scroll-ms": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Margin End
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-me": [{
          "scroll-me": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Margin Top
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-mt": [{
          "scroll-mt": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Margin Right
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-mr": [{
          "scroll-mr": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Margin Bottom
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-mb": [{
          "scroll-mb": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Margin Left
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-ml": [{
          "scroll-ml": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Padding
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-p": [{
          "scroll-p": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Padding X
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-px": [{
          "scroll-px": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Padding Y
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-py": [{
          "scroll-py": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Padding Start
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-ps": [{
          "scroll-ps": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Padding End
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pe": [{
          "scroll-pe": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Padding Top
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pt": [{
          "scroll-pt": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Padding Right
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pr": [{
          "scroll-pr": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Padding Bottom
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pb": [{
          "scroll-pb": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Padding Left
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pl": [{
          "scroll-pl": getSpacingWithArbitrary()
        }],
        /**
         * Scroll Snap Align
         * @see https://tailwindcss.com/docs/scroll-snap-align
         */
        "snap-align": [{
          snap: ["start", "end", "center", "align-none"]
        }],
        /**
         * Scroll Snap Stop
         * @see https://tailwindcss.com/docs/scroll-snap-stop
         */
        "snap-stop": [{
          snap: ["normal", "always"]
        }],
        /**
         * Scroll Snap Type
         * @see https://tailwindcss.com/docs/scroll-snap-type
         */
        "snap-type": [{
          snap: ["none", "x", "y", "both"]
        }],
        /**
         * Scroll Snap Type Strictness
         * @see https://tailwindcss.com/docs/scroll-snap-type
         */
        "snap-strictness": [{
          snap: ["mandatory", "proximity"]
        }],
        /**
         * Touch Action
         * @see https://tailwindcss.com/docs/touch-action
         */
        touch: [{
          touch: ["auto", "none", "manipulation"]
        }],
        /**
         * Touch Action X
         * @see https://tailwindcss.com/docs/touch-action
         */
        "touch-x": [{
          "touch-pan": ["x", "left", "right"]
        }],
        /**
         * Touch Action Y
         * @see https://tailwindcss.com/docs/touch-action
         */
        "touch-y": [{
          "touch-pan": ["y", "up", "down"]
        }],
        /**
         * Touch Action Pinch Zoom
         * @see https://tailwindcss.com/docs/touch-action
         */
        "touch-pz": ["touch-pinch-zoom"],
        /**
         * User Select
         * @see https://tailwindcss.com/docs/user-select
         */
        select: [{
          select: ["none", "text", "all", "auto"]
        }],
        /**
         * Will Change
         * @see https://tailwindcss.com/docs/will-change
         */
        "will-change": [{
          "will-change": ["auto", "scroll", "contents", "transform", isArbitraryValue]
        }],
        // SVG
        /**
         * Fill
         * @see https://tailwindcss.com/docs/fill
         */
        fill: [{
          fill: [colors, "none"]
        }],
        /**
         * Stroke Width
         * @see https://tailwindcss.com/docs/stroke-width
         */
        "stroke-w": [{
          stroke: [isLength, isArbitraryLength, isArbitraryNumber]
        }],
        /**
         * Stroke
         * @see https://tailwindcss.com/docs/stroke
         */
        stroke: [{
          stroke: [colors, "none"]
        }],
        // Accessibility
        /**
         * Screen Readers
         * @see https://tailwindcss.com/docs/screen-readers
         */
        sr: ["sr-only", "not-sr-only"]
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        "font-size": ["leading"],
        "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"]
      },
      conflictingClassGroupModifiers: {
        "font-size": ["leading"]
      }
    };
  }
  var twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);

  // node_modules/flowbite-svelte/dist/buttons/Button.svelte
  function create_else_block(ctx) {
    let previous_tag = (
      /*tag*/
      ctx[2]
    );
    let svelte_element_anchor;
    let current;
    let svelte_element = (
      /*tag*/
      ctx[2] && create_dynamic_element(ctx)
    );
    return {
      c() {
        if (svelte_element)
          svelte_element.c();
        svelte_element_anchor = empty();
      },
      m(target, anchor) {
        if (svelte_element)
          svelte_element.m(target, anchor);
        insert(target, svelte_element_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (
          /*tag*/
          ctx2[2]
        ) {
          if (!previous_tag) {
            svelte_element = create_dynamic_element(ctx2);
            previous_tag = /*tag*/
            ctx2[2];
            svelte_element.c();
            svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
          } else if (safe_not_equal(
            previous_tag,
            /*tag*/
            ctx2[2]
          )) {
            svelte_element.d(1);
            svelte_element = create_dynamic_element(ctx2);
            previous_tag = /*tag*/
            ctx2[2];
            svelte_element.c();
            svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
          } else {
            svelte_element.p(ctx2, dirty);
          }
        } else if (previous_tag) {
          svelte_element.d(1);
          svelte_element = null;
          previous_tag = /*tag*/
          ctx2[2];
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(svelte_element, local);
        current = true;
      },
      o(local) {
        transition_out(svelte_element, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(svelte_element_anchor);
        }
        if (svelte_element)
          svelte_element.d(detaching);
      }
    };
  }
  function create_if_block_1(ctx) {
    let button;
    let current;
    let mounted;
    let dispose;
    const default_slot_template = (
      /*#slots*/
      ctx[12].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[11],
      null
    );
    let button_levels = [
      { type: (
        /*type*/
        ctx[1]
      ) },
      /*$$restProps*/
      ctx[4],
      { class: (
        /*buttonClass*/
        ctx[3]
      ) }
    ];
    let button_data = {};
    for (let i = 0; i < button_levels.length; i += 1) {
      button_data = assign(button_data, button_levels[i]);
    }
    return {
      c() {
        button = element("button");
        if (default_slot)
          default_slot.c();
        set_attributes(button, button_data);
      },
      m(target, anchor) {
        insert(target, button, anchor);
        if (default_slot) {
          default_slot.m(button, null);
        }
        if (button.autofocus)
          button.focus();
        current = true;
        if (!mounted) {
          dispose = [
            listen(
              button,
              "click",
              /*click_handler_1*/
              ctx[22]
            ),
            listen(
              button,
              "change",
              /*change_handler_1*/
              ctx[23]
            ),
            listen(
              button,
              "keydown",
              /*keydown_handler_1*/
              ctx[24]
            ),
            listen(
              button,
              "keyup",
              /*keyup_handler_1*/
              ctx[25]
            ),
            listen(
              button,
              "touchstart",
              /*touchstart_handler_1*/
              ctx[26],
              { passive: true }
            ),
            listen(
              button,
              "touchend",
              /*touchend_handler_1*/
              ctx[27]
            ),
            listen(
              button,
              "touchcancel",
              /*touchcancel_handler_1*/
              ctx[28]
            ),
            listen(
              button,
              "mouseenter",
              /*mouseenter_handler_1*/
              ctx[29]
            ),
            listen(
              button,
              "mouseleave",
              /*mouseleave_handler_1*/
              ctx[30]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty[0] & /*$$scope*/
          2048)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[11],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[11]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[11],
                dirty,
                null
              ),
              null
            );
          }
        }
        set_attributes(button, button_data = get_spread_update(button_levels, [
          (!current || dirty[0] & /*type*/
          2) && { type: (
            /*type*/
            ctx2[1]
          ) },
          dirty[0] & /*$$restProps*/
          16 && /*$$restProps*/
          ctx2[4],
          (!current || dirty[0] & /*buttonClass*/
          8) && { class: (
            /*buttonClass*/
            ctx2[3]
          ) }
        ]));
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(button);
        }
        if (default_slot)
          default_slot.d(detaching);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block(ctx) {
    let a;
    let current;
    let mounted;
    let dispose;
    const default_slot_template = (
      /*#slots*/
      ctx[12].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[11],
      null
    );
    let a_levels = [
      { href: (
        /*href*/
        ctx[0]
      ) },
      /*$$restProps*/
      ctx[4],
      { class: (
        /*buttonClass*/
        ctx[3]
      ) },
      { role: "button" }
    ];
    let a_data = {};
    for (let i = 0; i < a_levels.length; i += 1) {
      a_data = assign(a_data, a_levels[i]);
    }
    return {
      c() {
        a = element("a");
        if (default_slot)
          default_slot.c();
        set_attributes(a, a_data);
      },
      m(target, anchor) {
        insert(target, a, anchor);
        if (default_slot) {
          default_slot.m(a, null);
        }
        current = true;
        if (!mounted) {
          dispose = [
            listen(
              a,
              "click",
              /*click_handler*/
              ctx[13]
            ),
            listen(
              a,
              "change",
              /*change_handler*/
              ctx[14]
            ),
            listen(
              a,
              "keydown",
              /*keydown_handler*/
              ctx[15]
            ),
            listen(
              a,
              "keyup",
              /*keyup_handler*/
              ctx[16]
            ),
            listen(
              a,
              "touchstart",
              /*touchstart_handler*/
              ctx[17],
              { passive: true }
            ),
            listen(
              a,
              "touchend",
              /*touchend_handler*/
              ctx[18]
            ),
            listen(
              a,
              "touchcancel",
              /*touchcancel_handler*/
              ctx[19]
            ),
            listen(
              a,
              "mouseenter",
              /*mouseenter_handler*/
              ctx[20]
            ),
            listen(
              a,
              "mouseleave",
              /*mouseleave_handler*/
              ctx[21]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty[0] & /*$$scope*/
          2048)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[11],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[11]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[11],
                dirty,
                null
              ),
              null
            );
          }
        }
        set_attributes(a, a_data = get_spread_update(a_levels, [
          (!current || dirty[0] & /*href*/
          1) && { href: (
            /*href*/
            ctx2[0]
          ) },
          dirty[0] & /*$$restProps*/
          16 && /*$$restProps*/
          ctx2[4],
          (!current || dirty[0] & /*buttonClass*/
          8) && { class: (
            /*buttonClass*/
            ctx2[3]
          ) },
          { role: "button" }
        ]));
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(a);
        }
        if (default_slot)
          default_slot.d(detaching);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_dynamic_element(ctx) {
    let svelte_element;
    let current;
    const default_slot_template = (
      /*#slots*/
      ctx[12].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[11],
      null
    );
    let svelte_element_levels = [
      /*$$restProps*/
      ctx[4],
      { class: (
        /*buttonClass*/
        ctx[3]
      ) }
    ];
    let svelte_element_data = {};
    for (let i = 0; i < svelte_element_levels.length; i += 1) {
      svelte_element_data = assign(svelte_element_data, svelte_element_levels[i]);
    }
    return {
      c() {
        svelte_element = element(
          /*tag*/
          ctx[2]
        );
        if (default_slot)
          default_slot.c();
        set_dynamic_element_data(
          /*tag*/
          ctx[2]
        )(svelte_element, svelte_element_data);
      },
      m(target, anchor) {
        insert(target, svelte_element, anchor);
        if (default_slot) {
          default_slot.m(svelte_element, null);
        }
        current = true;
      },
      p(ctx2, dirty) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty[0] & /*$$scope*/
          2048)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[11],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[11]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[11],
                dirty,
                null
              ),
              null
            );
          }
        }
        set_dynamic_element_data(
          /*tag*/
          ctx2[2]
        )(svelte_element, svelte_element_data = get_spread_update(svelte_element_levels, [
          dirty[0] & /*$$restProps*/
          16 && /*$$restProps*/
          ctx2[4],
          (!current || dirty[0] & /*buttonClass*/
          8) && { class: (
            /*buttonClass*/
            ctx2[3]
          ) }
        ]));
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(svelte_element);
        }
        if (default_slot)
          default_slot.d(detaching);
      }
    };
  }
  function create_fragment(ctx) {
    let current_block_type_index;
    let if_block;
    let if_block_anchor;
    let current;
    const if_block_creators = [create_if_block, create_if_block_1, create_else_block];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
      if (
        /*href*/
        ctx2[0]
      )
        return 0;
      if (
        /*tag*/
        ctx2[2] === "button"
      )
        return 1;
      return 2;
    }
    current_block_type_index = select_block_type(ctx, [-1, -1]);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    return {
      c() {
        if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if_blocks[current_block_type_index].m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2, dirty);
        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        } else {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if_blocks[current_block_type_index].d(detaching);
      }
    };
  }
  function instance($$self, $$props, $$invalidate) {
    const omit_props_names = ["pill", "outline", "size", "href", "type", "color", "shadow", "tag", "checked"];
    let $$restProps = compute_rest_props($$props, omit_props_names);
    let { $$slots: slots = {}, $$scope } = $$props;
    const group = getContext("group");
    let { pill = false } = $$props;
    let { outline = false } = $$props;
    let { size = group ? "sm" : "md" } = $$props;
    let { href = void 0 } = $$props;
    let { type = "button" } = $$props;
    let { color = group ? outline ? "dark" : "alternative" : "primary" } = $$props;
    let { shadow = false } = $$props;
    let { tag = "button" } = $$props;
    let { checked = void 0 } = $$props;
    const colorClasses = {
      alternative: "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 hover:text-primary-700 focus-within:text-primary-700 dark:focus-within:text-white dark:hover:text-white",
      blue: "text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700",
      dark: "text-white bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700",
      green: "text-white bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700",
      light: "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600",
      primary: "text-white bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700",
      purple: "text-white bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700",
      red: "text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700",
      yellow: "text-white bg-yellow-400 hover:bg-yellow-500 ",
      none: ""
    };
    const colorCheckedClasses = {
      alternative: "text-primary-700 border dark:text-primary-500 bg-gray-100 dark:bg-gray-700 border-gray-300 shadow-gray-300 dark:shadow-gray-800 shadow-inner",
      blue: "text-blue-900 bg-blue-400 dark:bg-blue-500 shadow-blue-700 dark:shadow-blue-800 shadow-inner",
      dark: "text-white bg-gray-500 dark:bg-gray-600 shadow-gray-800 dark:shadow-gray-900 shadow-inner",
      green: "text-green-900 bg-green-400 dark:bg-green-500 shadow-green-700 dark:shadow-green-800 shadow-inner",
      light: "text-gray-900 bg-gray-100 border border-gray-300 dark:bg-gray-500 dark:text-gray-900 dark:border-gray-700 shadow-gray-300 dark:shadow-gray-700 shadow-inner",
      primary: "text-primary-900 bg-primary-400 dark:bg-primary-500 shadow-primary-700 dark:shadow-primary-800 shadow-inner",
      purple: "text-purple-900 bg-purple-400 dark:bg-purple-500 shadow-purple-700 dark:shadow-purple-800 shadow-inner",
      red: "text-red-900 bg-red-400 dark:bg-red-500 shadow-red-700 dark:shadow-red-800 shadow-inner",
      yellow: "text-yellow-900 bg-yellow-300 dark:bg-yellow-400 shadow-yellow-500 dark:shadow-yellow-700 shadow-inner",
      none: ""
    };
    const coloredFocusClasses = {
      alternative: "focus-within:ring-gray-200 dark:focus-within:ring-gray-700",
      blue: "focus-within:ring-blue-300 dark:focus-within:ring-blue-800",
      dark: "focus-within:ring-gray-300 dark:focus-within:ring-gray-700",
      green: "focus-within:ring-green-300 dark:focus-within:ring-green-800",
      light: "focus-within:ring-gray-200 dark:focus-within:ring-gray-700",
      primary: "focus-within:ring-primary-300 dark:focus-within:ring-primary-800",
      purple: "focus-within:ring-purple-300 dark:focus-within:ring-purple-900",
      red: "focus-within:ring-red-300 dark:focus-within:ring-red-900",
      yellow: "focus-within:ring-yellow-300 dark:focus-within:ring-yellow-900",
      none: ""
    };
    const coloredShadowClasses = {
      alternative: "shadow-gray-500/50 dark:shadow-gray-800/80",
      blue: "shadow-blue-500/50 dark:shadow-blue-800/80",
      dark: "shadow-gray-500/50 dark:shadow-gray-800/80",
      green: "shadow-green-500/50 dark:shadow-green-800/80",
      light: "shadow-gray-500/50 dark:shadow-gray-800/80",
      primary: "shadow-primary-500/50 dark:shadow-primary-800/80",
      purple: "shadow-purple-500/50 dark:shadow-purple-800/80",
      red: "shadow-red-500/50 dark:shadow-red-800/80 ",
      yellow: "shadow-yellow-500/50 dark:shadow-yellow-800/80 ",
      none: ""
    };
    const outlineClasses = {
      alternative: "text-gray-900 dark:text-gray-400 hover:text-white border border-gray-800 hover:bg-gray-900 focus-within:bg-gray-900 focus-within:text-white focus-within:ring-gray-300 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600 dark:focus-within:ring-gray-800",
      blue: "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600",
      dark: "text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus-within:bg-gray-900 focus-within:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600",
      green: "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600",
      light: "text-gray-500 hover:text-gray-900 bg-white border border-gray-200 dark:border-gray-600 dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600",
      primary: "text-primary-700 hover:text-white border border-primary-700 hover:bg-primary-700 dark:border-primary-500 dark:text-primary-500 dark:hover:text-white dark:hover:bg-primary-600",
      purple: "text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500",
      red: "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600",
      yellow: "text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400",
      none: ""
    };
    const sizeClasses = {
      xs: "px-3 py-2 text-xs",
      sm: "px-4 py-2 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-5 py-3 text-base",
      xl: "px-6 py-3.5 text-base"
    };
    const hasBorder = () => outline || color === "alternative" || color === "light";
    let buttonClass;
    function click_handler(event) {
      bubble.call(this, $$self, event);
    }
    function change_handler(event) {
      bubble.call(this, $$self, event);
    }
    function keydown_handler(event) {
      bubble.call(this, $$self, event);
    }
    function keyup_handler(event) {
      bubble.call(this, $$self, event);
    }
    function touchstart_handler(event) {
      bubble.call(this, $$self, event);
    }
    function touchend_handler(event) {
      bubble.call(this, $$self, event);
    }
    function touchcancel_handler(event) {
      bubble.call(this, $$self, event);
    }
    function mouseenter_handler(event) {
      bubble.call(this, $$self, event);
    }
    function mouseleave_handler(event) {
      bubble.call(this, $$self, event);
    }
    function click_handler_1(event) {
      bubble.call(this, $$self, event);
    }
    function change_handler_1(event) {
      bubble.call(this, $$self, event);
    }
    function keydown_handler_1(event) {
      bubble.call(this, $$self, event);
    }
    function keyup_handler_1(event) {
      bubble.call(this, $$self, event);
    }
    function touchstart_handler_1(event) {
      bubble.call(this, $$self, event);
    }
    function touchend_handler_1(event) {
      bubble.call(this, $$self, event);
    }
    function touchcancel_handler_1(event) {
      bubble.call(this, $$self, event);
    }
    function mouseenter_handler_1(event) {
      bubble.call(this, $$self, event);
    }
    function mouseleave_handler_1(event) {
      bubble.call(this, $$self, event);
    }
    $$self.$$set = ($$new_props) => {
      $$invalidate(39, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
      $$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
      if ("pill" in $$new_props)
        $$invalidate(5, pill = $$new_props.pill);
      if ("outline" in $$new_props)
        $$invalidate(6, outline = $$new_props.outline);
      if ("size" in $$new_props)
        $$invalidate(7, size = $$new_props.size);
      if ("href" in $$new_props)
        $$invalidate(0, href = $$new_props.href);
      if ("type" in $$new_props)
        $$invalidate(1, type = $$new_props.type);
      if ("color" in $$new_props)
        $$invalidate(8, color = $$new_props.color);
      if ("shadow" in $$new_props)
        $$invalidate(9, shadow = $$new_props.shadow);
      if ("tag" in $$new_props)
        $$invalidate(2, tag = $$new_props.tag);
      if ("checked" in $$new_props)
        $$invalidate(10, checked = $$new_props.checked);
      if ("$$scope" in $$new_props)
        $$invalidate(11, $$scope = $$new_props.$$scope);
    };
    $$self.$$.update = () => {
      $:
        $$invalidate(3, buttonClass = twMerge(
          "text-center font-medium",
          group ? "focus-within:ring-2" : "focus-within:ring-4",
          group && "focus-within:z-10",
          group || "focus-within:outline-none",
          "inline-flex items-center justify-center " + sizeClasses[size],
          outline && checked && "border dark:border-gray-900",
          outline && checked && colorCheckedClasses[color],
          outline && !checked && outlineClasses[color],
          !outline && checked && colorCheckedClasses[color],
          !outline && !checked && colorClasses[color],
          color === "alternative" && (group && !checked ? "dark:bg-gray-700 dark:text-white dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-600" : "dark:bg-transparent dark:border-gray-600 dark:hover:border-gray-700"),
          outline && color === "dark" && (group ? checked ? "bg-gray-900 border-gray-800 dark:border-white dark:bg-gray-600" : "dark:text-white border-gray-800 dark:border-white" : "dark:text-gray-400 dark:border-gray-700"),
          coloredFocusClasses[color],
          hasBorder() && group && "border-l-0 first:border-l",
          group ? pill && "first:rounded-l-full last:rounded-r-full" || "first:rounded-l-lg last:rounded-r-lg" : pill && "rounded-full" || "rounded-lg",
          shadow && "shadow-lg",
          shadow && coloredShadowClasses[color],
          $$props.disabled && "cursor-not-allowed opacity-50",
          $$props.class
        ));
    };
    $$props = exclude_internal_props($$props);
    return [
      href,
      type,
      tag,
      buttonClass,
      $$restProps,
      pill,
      outline,
      size,
      color,
      shadow,
      checked,
      $$scope,
      slots,
      click_handler,
      change_handler,
      keydown_handler,
      keyup_handler,
      touchstart_handler,
      touchend_handler,
      touchcancel_handler,
      mouseenter_handler,
      mouseleave_handler,
      click_handler_1,
      change_handler_1,
      keydown_handler_1,
      keyup_handler_1,
      touchstart_handler_1,
      touchend_handler_1,
      touchcancel_handler_1,
      mouseenter_handler_1,
      mouseleave_handler_1
    ];
  }
  var Button = class extends SvelteComponent {
    constructor(options) {
      super();
      init(
        this,
        options,
        instance,
        create_fragment,
        safe_not_equal,
        {
          pill: 5,
          outline: 6,
          size: 7,
          href: 0,
          type: 1,
          color: 8,
          shadow: 9,
          tag: 2,
          checked: 10
        },
        null,
        [-1, -1]
      );
    }
  };
  var Button_default = Button;

  // node_modules/flowbite-svelte/dist/button-group/ButtonGroup.svelte
  function create_fragment2(ctx) {
    let div;
    let div_class_value;
    let current;
    const default_slot_template = (
      /*#slots*/
      ctx[5].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[4],
      null
    );
    let div_levels = [
      /*$$restProps*/
      ctx[1],
      {
        class: div_class_value = twMerge(
          /*divClass*/
          ctx[0],
          /*$$props*/
          ctx[2].class
        )
      },
      { role: "group" }
    ];
    let div_data = {};
    for (let i = 0; i < div_levels.length; i += 1) {
      div_data = assign(div_data, div_levels[i]);
    }
    return {
      c() {
        div = element("div");
        if (default_slot)
          default_slot.c();
        set_attributes(div, div_data);
      },
      m(target, anchor) {
        insert(target, div, anchor);
        if (default_slot) {
          default_slot.m(div, null);
        }
        current = true;
      },
      p(ctx2, [dirty]) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/
          16)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[4],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[4]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[4],
                dirty,
                null
              ),
              null
            );
          }
        }
        set_attributes(div, div_data = get_spread_update(div_levels, [
          dirty & /*$$restProps*/
          2 && /*$$restProps*/
          ctx2[1],
          (!current || dirty & /*divClass, $$props*/
          5 && div_class_value !== (div_class_value = twMerge(
            /*divClass*/
            ctx2[0],
            /*$$props*/
            ctx2[2].class
          ))) && { class: div_class_value },
          { role: "group" }
        ]));
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        if (default_slot)
          default_slot.d(detaching);
      }
    };
  }
  function instance2($$self, $$props, $$invalidate) {
    const omit_props_names = ["size", "divClass"];
    let $$restProps = compute_rest_props($$props, omit_props_names);
    let { $$slots: slots = {}, $$scope } = $$props;
    let { size = "md" } = $$props;
    let { divClass = "inline-flex rounded-lg shadow-sm" } = $$props;
    setContext("group", { size });
    $$self.$$set = ($$new_props) => {
      $$invalidate(2, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
      $$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
      if ("size" in $$new_props)
        $$invalidate(3, size = $$new_props.size);
      if ("divClass" in $$new_props)
        $$invalidate(0, divClass = $$new_props.divClass);
      if ("$$scope" in $$new_props)
        $$invalidate(4, $$scope = $$new_props.$$scope);
    };
    $$props = exclude_internal_props($$props);
    return [divClass, $$restProps, $$props, size, $$scope, slots];
  }
  var ButtonGroup = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance2, create_fragment2, safe_not_equal, { size: 3, divClass: 0 });
    }
  };
  var ButtonGroup_default = ButtonGroup;

  // node_modules/flowbite-svelte/dist/utils/generateId.js
  var n = Date.now();

  // node_modules/flowbite-svelte/dist/forms/RadioButton.svelte
  function create_default_slot(ctx) {
    let input;
    let t;
    let current;
    let binding_group;
    let mounted;
    let dispose;
    let input_levels = [
      { type: "radio" },
      { __value: (
        /*value*/
        ctx[1]
      ) },
      /*$$restProps*/
      ctx[8],
      { class: "sr-only" }
    ];
    let input_data = {};
    for (let i = 0; i < input_levels.length; i += 1) {
      input_data = assign(input_data, input_levels[i]);
    }
    const default_slot_template = (
      /*#slots*/
      ctx[10].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[24],
      null
    );
    binding_group = init_binding_group(
      /*$$binding_groups*/
      ctx[23][0]
    );
    return {
      c() {
        input = element("input");
        t = space();
        if (default_slot)
          default_slot.c();
        set_attributes(input, input_data);
        binding_group.p(input);
      },
      m(target, anchor) {
        insert(target, input, anchor);
        if (input.autofocus)
          input.focus();
        input.checked = input.__value === /*group*/
        ctx[0];
        insert(target, t, anchor);
        if (default_slot) {
          default_slot.m(target, anchor);
        }
        current = true;
        if (!mounted) {
          dispose = [
            listen(
              input,
              "change",
              /*input_change_handler*/
              ctx[22]
            ),
            listen(
              input,
              "keyup",
              /*keyup_handler*/
              ctx[11]
            ),
            listen(
              input,
              "keydown",
              /*keydown_handler*/
              ctx[12]
            ),
            listen(
              input,
              "keypress",
              /*keypress_handler*/
              ctx[13]
            ),
            listen(
              input,
              "focus",
              /*focus_handler*/
              ctx[14]
            ),
            listen(
              input,
              "blur",
              /*blur_handler*/
              ctx[15]
            ),
            listen(
              input,
              "click",
              /*click_handler*/
              ctx[16]
            ),
            listen(
              input,
              "mouseover",
              /*mouseover_handler*/
              ctx[17]
            ),
            listen(
              input,
              "mouseenter",
              /*mouseenter_handler*/
              ctx[18]
            ),
            listen(
              input,
              "mouseleave",
              /*mouseleave_handler*/
              ctx[19]
            ),
            listen(
              input,
              "paste",
              /*paste_handler*/
              ctx[20]
            ),
            listen(
              input,
              "change",
              /*change_handler*/
              ctx[21]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        set_attributes(input, input_data = get_spread_update(input_levels, [
          { type: "radio" },
          (!current || dirty & /*value*/
          2) && { __value: (
            /*value*/
            ctx2[1]
          ) },
          dirty & /*$$restProps*/
          256 && /*$$restProps*/
          ctx2[8],
          { class: "sr-only" }
        ]));
        if (dirty & /*group*/
        1) {
          input.checked = input.__value === /*group*/
          ctx2[0];
        }
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/
          16777216)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[24],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[24]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[24],
                dirty,
                null
              ),
              null
            );
          }
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(input);
          detach(t);
        }
        if (default_slot)
          default_slot.d(detaching);
        binding_group.r();
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_fragment3(ctx) {
    let button;
    let current;
    button = new Button_default({
      props: {
        tag: "label",
        checked: (
          /*value*/
          ctx[1] === /*group*/
          ctx[0]
        ),
        pill: (
          /*pill*/
          ctx[2]
        ),
        outline: (
          /*outline*/
          ctx[3]
        ),
        size: (
          /*size*/
          ctx[4]
        ),
        color: (
          /*color*/
          ctx[5]
        ),
        shadow: (
          /*shadow*/
          ctx[6]
        ),
        class: (
          /*buttonClass*/
          ctx[7]
        ),
        $$slots: { default: [create_default_slot] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(button.$$.fragment);
      },
      m(target, anchor) {
        mount_component(button, target, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        const button_changes = {};
        if (dirty & /*value, group*/
        3)
          button_changes.checked = /*value*/
          ctx2[1] === /*group*/
          ctx2[0];
        if (dirty & /*pill*/
        4)
          button_changes.pill = /*pill*/
          ctx2[2];
        if (dirty & /*outline*/
        8)
          button_changes.outline = /*outline*/
          ctx2[3];
        if (dirty & /*size*/
        16)
          button_changes.size = /*size*/
          ctx2[4];
        if (dirty & /*color*/
        32)
          button_changes.color = /*color*/
          ctx2[5];
        if (dirty & /*shadow*/
        64)
          button_changes.shadow = /*shadow*/
          ctx2[6];
        if (dirty & /*buttonClass*/
        128)
          button_changes.class = /*buttonClass*/
          ctx2[7];
        if (dirty & /*$$scope, value, $$restProps, group*/
        16777475) {
          button_changes.$$scope = { dirty, ctx: ctx2 };
        }
        button.$set(button_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(button.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(button.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(button, detaching);
      }
    };
  }
  function instance3($$self, $$props, $$invalidate) {
    const omit_props_names = ["group", "value", "inline", "pill", "outline", "size", "color", "shadow"];
    let $$restProps = compute_rest_props($$props, omit_props_names);
    let { $$slots: slots = {}, $$scope } = $$props;
    let { group = "" } = $$props;
    let { value = "" } = $$props;
    let { inline = true } = $$props;
    let { pill = false } = $$props;
    let { outline = false } = $$props;
    let { size = void 0 } = $$props;
    let { color = void 0 } = $$props;
    let { shadow = false } = $$props;
    let buttonClass;
    const $$binding_groups = [[]];
    function keyup_handler(event) {
      bubble.call(this, $$self, event);
    }
    function keydown_handler(event) {
      bubble.call(this, $$self, event);
    }
    function keypress_handler(event) {
      bubble.call(this, $$self, event);
    }
    function focus_handler(event) {
      bubble.call(this, $$self, event);
    }
    function blur_handler(event) {
      bubble.call(this, $$self, event);
    }
    function click_handler(event) {
      bubble.call(this, $$self, event);
    }
    function mouseover_handler(event) {
      bubble.call(this, $$self, event);
    }
    function mouseenter_handler(event) {
      bubble.call(this, $$self, event);
    }
    function mouseleave_handler(event) {
      bubble.call(this, $$self, event);
    }
    function paste_handler(event) {
      bubble.call(this, $$self, event);
    }
    function change_handler(event) {
      bubble.call(this, $$self, event);
    }
    function input_change_handler() {
      group = this.__value;
      $$invalidate(0, group);
    }
    $$self.$$set = ($$new_props) => {
      $$invalidate(25, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
      $$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
      if ("group" in $$new_props)
        $$invalidate(0, group = $$new_props.group);
      if ("value" in $$new_props)
        $$invalidate(1, value = $$new_props.value);
      if ("inline" in $$new_props)
        $$invalidate(9, inline = $$new_props.inline);
      if ("pill" in $$new_props)
        $$invalidate(2, pill = $$new_props.pill);
      if ("outline" in $$new_props)
        $$invalidate(3, outline = $$new_props.outline);
      if ("size" in $$new_props)
        $$invalidate(4, size = $$new_props.size);
      if ("color" in $$new_props)
        $$invalidate(5, color = $$new_props.color);
      if ("shadow" in $$new_props)
        $$invalidate(6, shadow = $$new_props.shadow);
      if ("$$scope" in $$new_props)
        $$invalidate(24, $$scope = $$new_props.$$scope);
    };
    $$self.$$.update = () => {
      $:
        $$invalidate(7, buttonClass = twMerge(inline ? "inline-flex" : "flex", $$props.class));
    };
    $$props = exclude_internal_props($$props);
    return [
      group,
      value,
      pill,
      outline,
      size,
      color,
      shadow,
      buttonClass,
      $$restProps,
      inline,
      slots,
      keyup_handler,
      keydown_handler,
      keypress_handler,
      focus_handler,
      blur_handler,
      click_handler,
      mouseover_handler,
      mouseenter_handler,
      mouseleave_handler,
      paste_handler,
      change_handler,
      input_change_handler,
      $$binding_groups,
      $$scope
    ];
  }
  var RadioButton = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance3, create_fragment3, safe_not_equal, {
        group: 0,
        value: 1,
        inline: 9,
        pill: 2,
        outline: 3,
        size: 4,
        color: 5,
        shadow: 6
      });
    }
  };
  var RadioButton_default = RadioButton;

  // node_modules/flowbite-svelte/dist/table/Table.svelte
  function create_fragment4(ctx) {
    let div;
    let table;
    let table_class_value;
    let div_class_value;
    let current;
    const default_slot_template = (
      /*#slots*/
      ctx[11].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[10],
      null
    );
    let table_levels = [
      /*$$restProps*/
      ctx[4],
      {
        class: table_class_value = twMerge(
          "w-full text-left text-sm",
          /*colors*/
          ctx[3][
            /*color*/
            ctx[2]
          ],
          /*$$props*/
          ctx[5].class
        )
      }
    ];
    let table_data = {};
    for (let i = 0; i < table_levels.length; i += 1) {
      table_data = assign(table_data, table_levels[i]);
    }
    return {
      c() {
        div = element("div");
        table = element("table");
        if (default_slot)
          default_slot.c();
        set_attributes(table, table_data);
        attr(div, "class", div_class_value = twJoin(
          /*divClass*/
          ctx[0],
          /*shadow*/
          ctx[1] && "shadow-md sm:rounded-lg"
        ));
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, table);
        if (default_slot) {
          default_slot.m(table, null);
        }
        current = true;
      },
      p(ctx2, [dirty]) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/
          1024)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[10],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[10]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[10],
                dirty,
                null
              ),
              null
            );
          }
        }
        set_attributes(table, table_data = get_spread_update(table_levels, [
          dirty & /*$$restProps*/
          16 && /*$$restProps*/
          ctx2[4],
          (!current || dirty & /*color, $$props*/
          36 && table_class_value !== (table_class_value = twMerge(
            "w-full text-left text-sm",
            /*colors*/
            ctx2[3][
              /*color*/
              ctx2[2]
            ],
            /*$$props*/
            ctx2[5].class
          ))) && { class: table_class_value }
        ]));
        if (!current || dirty & /*divClass, shadow*/
        3 && div_class_value !== (div_class_value = twJoin(
          /*divClass*/
          ctx2[0],
          /*shadow*/
          ctx2[1] && "shadow-md sm:rounded-lg"
        ))) {
          attr(div, "class", div_class_value);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        if (default_slot)
          default_slot.d(detaching);
      }
    };
  }
  function instance4($$self, $$props, $$invalidate) {
    const omit_props_names = ["divClass", "striped", "hoverable", "noborder", "shadow", "color", "customeColor"];
    let $$restProps = compute_rest_props($$props, omit_props_names);
    let { $$slots: slots = {}, $$scope } = $$props;
    let { divClass = "relative overflow-x-auto" } = $$props;
    let { striped = false } = $$props;
    let { hoverable = false } = $$props;
    let { noborder = false } = $$props;
    let { shadow = false } = $$props;
    let { color = "default" } = $$props;
    let { customeColor = "" } = $$props;
    const colors = {
      default: "text-gray-500 dark:text-gray-400",
      blue: "text-blue-100 dark:text-blue-100",
      green: "text-green-100 dark:text-green-100",
      red: "text-red-100 dark:text-red-100",
      yellow: "text-yellow-100 dark:text-yellow-100",
      purple: "text-purple-100 dark:text-purple-100",
      indigo: "text-indigo-100 dark:text-indigo-100",
      pink: "text-pink-100 dark:text-pink-100",
      custom: customeColor
    };
    $$self.$$set = ($$new_props) => {
      $$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
      $$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
      if ("divClass" in $$new_props)
        $$invalidate(0, divClass = $$new_props.divClass);
      if ("striped" in $$new_props)
        $$invalidate(6, striped = $$new_props.striped);
      if ("hoverable" in $$new_props)
        $$invalidate(7, hoverable = $$new_props.hoverable);
      if ("noborder" in $$new_props)
        $$invalidate(8, noborder = $$new_props.noborder);
      if ("shadow" in $$new_props)
        $$invalidate(1, shadow = $$new_props.shadow);
      if ("color" in $$new_props)
        $$invalidate(2, color = $$new_props.color);
      if ("customeColor" in $$new_props)
        $$invalidate(9, customeColor = $$new_props.customeColor);
      if ("$$scope" in $$new_props)
        $$invalidate(10, $$scope = $$new_props.$$scope);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*striped*/
      64) {
        $:
          setContext("striped", striped);
      }
      if ($$self.$$.dirty & /*hoverable*/
      128) {
        $:
          setContext("hoverable", hoverable);
      }
      if ($$self.$$.dirty & /*noborder*/
      256) {
        $:
          setContext("noborder", noborder);
      }
      if ($$self.$$.dirty & /*color*/
      4) {
        $:
          setContext("color", color);
      }
    };
    $$props = exclude_internal_props($$props);
    return [
      divClass,
      shadow,
      color,
      colors,
      $$restProps,
      $$props,
      striped,
      hoverable,
      noborder,
      customeColor,
      $$scope,
      slots
    ];
  }
  var Table = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance4, create_fragment4, safe_not_equal, {
        divClass: 0,
        striped: 6,
        hoverable: 7,
        noborder: 8,
        shadow: 1,
        color: 2,
        customeColor: 9
      });
    }
  };
  var Table_default = Table;

  // node_modules/flowbite-svelte/dist/table/TableBody.svelte
  function create_fragment5(ctx) {
    let tbody;
    let current;
    const default_slot_template = (
      /*#slots*/
      ctx[2].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[1],
      null
    );
    return {
      c() {
        tbody = element("tbody");
        if (default_slot)
          default_slot.c();
        attr(
          tbody,
          "class",
          /*tableBodyClass*/
          ctx[0]
        );
      },
      m(target, anchor) {
        insert(target, tbody, anchor);
        if (default_slot) {
          default_slot.m(tbody, null);
        }
        current = true;
      },
      p(ctx2, [dirty]) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/
          2)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[1],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[1]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[1],
                dirty,
                null
              ),
              null
            );
          }
        }
        if (!current || dirty & /*tableBodyClass*/
        1) {
          attr(
            tbody,
            "class",
            /*tableBodyClass*/
            ctx2[0]
          );
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tbody);
        }
        if (default_slot)
          default_slot.d(detaching);
      }
    };
  }
  function instance5($$self, $$props, $$invalidate) {
    let { $$slots: slots = {}, $$scope } = $$props;
    let { tableBodyClass = void 0 } = $$props;
    $$self.$$set = ($$props2) => {
      if ("tableBodyClass" in $$props2)
        $$invalidate(0, tableBodyClass = $$props2.tableBodyClass);
      if ("$$scope" in $$props2)
        $$invalidate(1, $$scope = $$props2.$$scope);
    };
    return [tableBodyClass, $$scope, slots];
  }
  var TableBody = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance5, create_fragment5, safe_not_equal, { tableBodyClass: 0 });
    }
  };
  var TableBody_default = TableBody;

  // node_modules/flowbite-svelte/dist/table/TableBodyCell.svelte
  function create_dynamic_element2(ctx) {
    let svelte_element;
    let svelte_element_role_value;
    let current;
    let mounted;
    let dispose;
    const default_slot_template = (
      /*#slots*/
      ctx[6].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[5],
      null
    );
    let svelte_element_levels = [
      /*$$restProps*/
      ctx[2],
      { class: (
        /*tdClassfinal*/
        ctx[0]
      ) },
      {
        role: svelte_element_role_value = /*$$props*/
        ctx[1].onclick ? "button" : void 0
      }
    ];
    let svelte_element_data = {};
    for (let i = 0; i < svelte_element_levels.length; i += 1) {
      svelte_element_data = assign(svelte_element_data, svelte_element_levels[i]);
    }
    return {
      c() {
        svelte_element = element(
          /*$$props*/
          ctx[1].onclick ? "button" : "td"
        );
        if (default_slot)
          default_slot.c();
        set_dynamic_element_data(
          /*$$props*/
          ctx[1].onclick ? "button" : "td"
        )(svelte_element, svelte_element_data);
      },
      m(target, anchor) {
        insert(target, svelte_element, anchor);
        if (default_slot) {
          default_slot.m(svelte_element, null);
        }
        current = true;
        if (!mounted) {
          dispose = listen(
            svelte_element,
            "click",
            /*click_handler*/
            ctx[7]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/
          32)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[5],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[5]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[5],
                dirty,
                null
              ),
              null
            );
          }
        }
        set_dynamic_element_data(
          /*$$props*/
          ctx2[1].onclick ? "button" : "td"
        )(svelte_element, svelte_element_data = get_spread_update(svelte_element_levels, [
          dirty & /*$$restProps*/
          4 && /*$$restProps*/
          ctx2[2],
          (!current || dirty & /*tdClassfinal*/
          1) && { class: (
            /*tdClassfinal*/
            ctx2[0]
          ) },
          (!current || dirty & /*$$props*/
          2 && svelte_element_role_value !== (svelte_element_role_value = /*$$props*/
          ctx2[1].onclick ? "button" : void 0)) && { role: svelte_element_role_value }
        ]));
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(svelte_element);
        }
        if (default_slot)
          default_slot.d(detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function create_fragment6(ctx) {
    let previous_tag = (
      /*$$props*/
      ctx[1].onclick ? "button" : "td"
    );
    let svelte_element_anchor;
    let current;
    let svelte_element = (
      /*$$props*/
      (ctx[1].onclick ? "button" : "td") && create_dynamic_element2(ctx)
    );
    return {
      c() {
        if (svelte_element)
          svelte_element.c();
        svelte_element_anchor = empty();
      },
      m(target, anchor) {
        if (svelte_element)
          svelte_element.m(target, anchor);
        insert(target, svelte_element_anchor, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        if (
          /*$$props*/
          ctx2[1].onclick ? "button" : "td"
        ) {
          if (!previous_tag) {
            svelte_element = create_dynamic_element2(ctx2);
            previous_tag = /*$$props*/
            ctx2[1].onclick ? "button" : "td";
            svelte_element.c();
            svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
          } else if (safe_not_equal(
            previous_tag,
            /*$$props*/
            ctx2[1].onclick ? "button" : "td"
          )) {
            svelte_element.d(1);
            svelte_element = create_dynamic_element2(ctx2);
            previous_tag = /*$$props*/
            ctx2[1].onclick ? "button" : "td";
            svelte_element.c();
            svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
          } else {
            svelte_element.p(ctx2, dirty);
          }
        } else if (previous_tag) {
          svelte_element.d(1);
          svelte_element = null;
          previous_tag = /*$$props*/
          ctx2[1].onclick ? "button" : "td";
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(svelte_element, local);
        current = true;
      },
      o(local) {
        transition_out(svelte_element, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(svelte_element_anchor);
        }
        if (svelte_element)
          svelte_element.d(detaching);
      }
    };
  }
  function instance6($$self, $$props, $$invalidate) {
    const omit_props_names = ["tdClass"];
    let $$restProps = compute_rest_props($$props, omit_props_names);
    let { $$slots: slots = {}, $$scope } = $$props;
    let { tdClass = "px-6 py-4 whitespace-nowrap font-medium " } = $$props;
    let color = "default";
    color = getContext("color");
    let tdClassfinal;
    function click_handler(event) {
      bubble.call(this, $$self, event);
    }
    $$self.$$set = ($$new_props) => {
      $$invalidate(1, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
      $$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
      if ("tdClass" in $$new_props)
        $$invalidate(3, tdClass = $$new_props.tdClass);
      if ("$$scope" in $$new_props)
        $$invalidate(5, $$scope = $$new_props.$$scope);
    };
    $$self.$$.update = () => {
      $:
        $$invalidate(0, tdClassfinal = twMerge(
          tdClass,
          color === "default" ? "text-gray-900 dark:text-white" : "text-blue-50 whitespace-nowrap dark:text-blue-100",
          $$props.class
        ));
    };
    $$props = exclude_internal_props($$props);
    return [
      tdClassfinal,
      $$props,
      $$restProps,
      tdClass,
      color,
      $$scope,
      slots,
      click_handler
    ];
  }
  var TableBodyCell = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance6, create_fragment6, safe_not_equal, { tdClass: 3 });
    }
  };
  var TableBodyCell_default = TableBodyCell;

  // node_modules/flowbite-svelte/dist/table/TableBodyRow.svelte
  function create_fragment7(ctx) {
    let tr;
    let current;
    let mounted;
    let dispose;
    const default_slot_template = (
      /*#slots*/
      ctx[4].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[3],
      null
    );
    let tr_levels = [
      /*$$restProps*/
      ctx[1],
      { class: (
        /*trClass*/
        ctx[0]
      ) }
    ];
    let tr_data = {};
    for (let i = 0; i < tr_levels.length; i += 1) {
      tr_data = assign(tr_data, tr_levels[i]);
    }
    return {
      c() {
        tr = element("tr");
        if (default_slot)
          default_slot.c();
        set_attributes(tr, tr_data);
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        if (default_slot) {
          default_slot.m(tr, null);
        }
        current = true;
        if (!mounted) {
          dispose = [
            listen(
              tr,
              "click",
              /*click_handler*/
              ctx[5]
            ),
            listen(
              tr,
              "contextmenu",
              /*contextmenu_handler*/
              ctx[6]
            ),
            listen(
              tr,
              "dblclick",
              /*dblclick_handler*/
              ctx[7]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/
          8)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[3],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[3]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[3],
                dirty,
                null
              ),
              null
            );
          }
        }
        set_attributes(tr, tr_data = get_spread_update(tr_levels, [
          dirty & /*$$restProps*/
          2 && /*$$restProps*/
          ctx2[1],
          (!current || dirty & /*trClass*/
          1) && { class: (
            /*trClass*/
            ctx2[0]
          ) }
        ]));
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        if (default_slot)
          default_slot.d(detaching);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function instance7($$self, $$props, $$invalidate) {
    const omit_props_names = ["color"];
    let $$restProps = compute_rest_props($$props, omit_props_names);
    let { $$slots: slots = {}, $$scope } = $$props;
    let { color = getContext("color") } = $$props;
    const colors = {
      default: "bg-white dark:bg-gray-800 dark:border-gray-700",
      blue: "bg-blue-500 border-blue-400",
      green: "bg-green-500 border-green-400",
      red: "bg-red-500 border-red-400",
      yellow: "bg-yellow-500 border-yellow-400",
      purple: "bg-purple-500 border-purple-400",
      custom: ""
    };
    const hoverColors = {
      default: "hover:bg-gray-50 dark:hover:bg-gray-600",
      blue: "hover:bg-blue-400",
      green: "hover:bg-green-400",
      red: "hover:bg-red-400",
      yellow: "hover:bg-yellow-400",
      purple: "hover:bg-purple-400",
      custom: ""
    };
    const stripColors = {
      default: "odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700",
      blue: "odd:bg-blue-800 even:bg-blue-700 odd:dark:bg-blue-800 even:dark:bg-blue-700",
      green: "odd:bg-green-800 even:bg-green-700 odd:dark:bg-green-800 even:dark:bg-green-700",
      red: "odd:bg-red-800 even:bg-red-700 odd:dark:bg-red-800 even:dark:bg-red-700",
      yellow: "odd:bg-yellow-800 even:bg-yellow-700 odd:dark:bg-yellow-800 even:dark:bg-yellow-700",
      purple: "odd:bg-purple-800 even:bg-purple-700 odd:dark:bg-purple-800 even:dark:bg-purple-700",
      custom: ""
    };
    let trClass;
    function click_handler(event) {
      bubble.call(this, $$self, event);
    }
    function contextmenu_handler(event) {
      bubble.call(this, $$self, event);
    }
    function dblclick_handler(event) {
      bubble.call(this, $$self, event);
    }
    $$self.$$set = ($$new_props) => {
      $$invalidate(11, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
      $$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
      if ("color" in $$new_props)
        $$invalidate(2, color = $$new_props.color);
      if ("$$scope" in $$new_props)
        $$invalidate(3, $$scope = $$new_props.$$scope);
    };
    $$self.$$.update = () => {
      $:
        $$invalidate(0, trClass = twMerge([
          !getContext("noborder") && "border-b last:border-b-0",
          colors[color],
          getContext("hoverable") && hoverColors[color],
          getContext("striped") && stripColors[color],
          $$props.class
        ]));
    };
    $$props = exclude_internal_props($$props);
    return [
      trClass,
      $$restProps,
      color,
      $$scope,
      slots,
      click_handler,
      contextmenu_handler,
      dblclick_handler
    ];
  }
  var TableBodyRow = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance7, create_fragment7, safe_not_equal, { color: 2 });
    }
  };
  var TableBodyRow_default = TableBodyRow;

  // node_modules/flowbite-svelte/dist/table/TableHead.svelte
  function create_else_block2(ctx) {
    let current;
    const default_slot_template = (
      /*#slots*/
      ctx[6].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[5],
      null
    );
    return {
      c() {
        if (default_slot)
          default_slot.c();
      },
      m(target, anchor) {
        if (default_slot) {
          default_slot.m(target, anchor);
        }
        current = true;
      },
      p(ctx2, dirty) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/
          32)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[5],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[5]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[5],
                dirty,
                null
              ),
              null
            );
          }
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (default_slot)
          default_slot.d(detaching);
      }
    };
  }
  function create_if_block2(ctx) {
    let tr;
    let current;
    const default_slot_template = (
      /*#slots*/
      ctx[6].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[5],
      null
    );
    return {
      c() {
        tr = element("tr");
        if (default_slot)
          default_slot.c();
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        if (default_slot) {
          default_slot.m(tr, null);
        }
        current = true;
      },
      p(ctx2, dirty) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/
          32)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[5],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[5]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[5],
                dirty,
                null
              ),
              null
            );
          }
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        if (default_slot)
          default_slot.d(detaching);
      }
    };
  }
  function create_fragment8(ctx) {
    let thead;
    let current_block_type_index;
    let if_block;
    let current;
    const if_block_creators = [create_if_block2, create_else_block2];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
      if (
        /*defaultRow*/
        ctx2[0]
      )
        return 0;
      return 1;
    }
    current_block_type_index = select_block_type(ctx, -1);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    let thead_levels = [
      /*$$restProps*/
      ctx[2],
      { class: (
        /*theadClassfinal*/
        ctx[1]
      ) }
    ];
    let thead_data = {};
    for (let i = 0; i < thead_levels.length; i += 1) {
      thead_data = assign(thead_data, thead_levels[i]);
    }
    return {
      c() {
        thead = element("thead");
        if_block.c();
        set_attributes(thead, thead_data);
      },
      m(target, anchor) {
        insert(target, thead, anchor);
        if_blocks[current_block_type_index].m(thead, null);
        current = true;
      },
      p(ctx2, [dirty]) {
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2, dirty);
        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        } else {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(thead, null);
        }
        set_attributes(thead, thead_data = get_spread_update(thead_levels, [
          dirty & /*$$restProps*/
          4 && /*$$restProps*/
          ctx2[2],
          (!current || dirty & /*theadClassfinal*/
          2) && { class: (
            /*theadClassfinal*/
            ctx2[1]
          ) }
        ]));
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(thead);
        }
        if_blocks[current_block_type_index].d();
      }
    };
  }
  function instance8($$self, $$props, $$invalidate) {
    let theadClassfinal;
    const omit_props_names = ["theadClass", "defaultRow"];
    let $$restProps = compute_rest_props($$props, omit_props_names);
    let { $$slots: slots = {}, $$scope } = $$props;
    let { theadClass = "text-xs uppercase" } = $$props;
    let { defaultRow = true } = $$props;
    let color;
    color = getContext("color");
    let noborder = getContext("noborder");
    let striped = getContext("striped");
    let defaultBgColor = noborder || striped ? "" : "bg-gray-50 dark:bg-gray-700";
    const bgColors = {
      default: defaultBgColor,
      blue: "bg-blue-600",
      green: "bg-green-600",
      red: "bg-red-600",
      yellow: "bg-yellow-600",
      purple: "bg-purple-600",
      custom: ""
    };
    let textColor = color === "default" ? "text-gray-700 dark:text-gray-400" : color === "custom" ? "" : "text-white  dark:text-white";
    let borderColors = striped ? "" : color === "default" ? "border-gray-700" : color === "custom" ? "" : `border-${color}-400`;
    $$self.$$set = ($$new_props) => {
      $$invalidate(13, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
      $$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
      if ("theadClass" in $$new_props)
        $$invalidate(3, theadClass = $$new_props.theadClass);
      if ("defaultRow" in $$new_props)
        $$invalidate(0, defaultRow = $$new_props.defaultRow);
      if ("$$scope" in $$new_props)
        $$invalidate(5, $$scope = $$new_props.$$scope);
    };
    $$self.$$.update = () => {
      $:
        $$invalidate(1, theadClassfinal = twMerge(theadClass, textColor, striped && borderColors, bgColors[color], $$props.class));
    };
    $$props = exclude_internal_props($$props);
    return [defaultRow, theadClassfinal, $$restProps, theadClass, color, $$scope, slots];
  }
  var TableHead = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance8, create_fragment8, safe_not_equal, { theadClass: 3, defaultRow: 0 });
    }
  };
  var TableHead_default = TableHead;

  // node_modules/flowbite-svelte/dist/table/TableHeadCell.svelte
  function create_fragment9(ctx) {
    let th;
    let th_class_value;
    let current;
    let mounted;
    let dispose;
    const default_slot_template = (
      /*#slots*/
      ctx[4].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[3],
      null
    );
    let th_levels = [
      /*$$restProps*/
      ctx[1],
      {
        class: th_class_value = twMerge(
          /*padding*/
          ctx[0],
          /*$$props*/
          ctx[2].class
        )
      }
    ];
    let th_data = {};
    for (let i = 0; i < th_levels.length; i += 1) {
      th_data = assign(th_data, th_levels[i]);
    }
    return {
      c() {
        th = element("th");
        if (default_slot)
          default_slot.c();
        set_attributes(th, th_data);
      },
      m(target, anchor) {
        insert(target, th, anchor);
        if (default_slot) {
          default_slot.m(th, null);
        }
        current = true;
        if (!mounted) {
          dispose = [
            listen(
              th,
              "click",
              /*click_handler*/
              ctx[5]
            ),
            listen(
              th,
              "focus",
              /*focus_handler*/
              ctx[6]
            ),
            listen(
              th,
              "keydown",
              /*keydown_handler*/
              ctx[7]
            ),
            listen(
              th,
              "keypress",
              /*keypress_handler*/
              ctx[8]
            ),
            listen(
              th,
              "keyup",
              /*keyup_handler*/
              ctx[9]
            ),
            listen(
              th,
              "mouseenter",
              /*mouseenter_handler*/
              ctx[10]
            ),
            listen(
              th,
              "mouseleave",
              /*mouseleave_handler*/
              ctx[11]
            ),
            listen(
              th,
              "mouseover",
              /*mouseover_handler*/
              ctx[12]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/
          8)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[3],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[3]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[3],
                dirty,
                null
              ),
              null
            );
          }
        }
        set_attributes(th, th_data = get_spread_update(th_levels, [
          dirty & /*$$restProps*/
          2 && /*$$restProps*/
          ctx2[1],
          (!current || dirty & /*padding, $$props*/
          5 && th_class_value !== (th_class_value = twMerge(
            /*padding*/
            ctx2[0],
            /*$$props*/
            ctx2[2].class
          ))) && { class: th_class_value }
        ]));
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(th);
        }
        if (default_slot)
          default_slot.d(detaching);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function instance9($$self, $$props, $$invalidate) {
    const omit_props_names = ["padding"];
    let $$restProps = compute_rest_props($$props, omit_props_names);
    let { $$slots: slots = {}, $$scope } = $$props;
    let { padding = "px-6 py-3" } = $$props;
    function click_handler(event) {
      bubble.call(this, $$self, event);
    }
    function focus_handler(event) {
      bubble.call(this, $$self, event);
    }
    function keydown_handler(event) {
      bubble.call(this, $$self, event);
    }
    function keypress_handler(event) {
      bubble.call(this, $$self, event);
    }
    function keyup_handler(event) {
      bubble.call(this, $$self, event);
    }
    function mouseenter_handler(event) {
      bubble.call(this, $$self, event);
    }
    function mouseleave_handler(event) {
      bubble.call(this, $$self, event);
    }
    function mouseover_handler(event) {
      bubble.call(this, $$self, event);
    }
    $$self.$$set = ($$new_props) => {
      $$invalidate(2, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
      $$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
      if ("padding" in $$new_props)
        $$invalidate(0, padding = $$new_props.padding);
      if ("$$scope" in $$new_props)
        $$invalidate(3, $$scope = $$new_props.$$scope);
    };
    $$props = exclude_internal_props($$props);
    return [
      padding,
      $$restProps,
      $$props,
      $$scope,
      slots,
      click_handler,
      focus_handler,
      keydown_handler,
      keypress_handler,
      keyup_handler,
      mouseenter_handler,
      mouseleave_handler,
      mouseover_handler
    ];
  }
  var TableHeadCell = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance9, create_fragment9, safe_not_equal, { padding: 0 });
    }
  };
  var TableHeadCell_default = TableHeadCell;

  // IrisTable.svelte
  function create_default_slot_25(ctx) {
    let t;
    return {
      c() {
        t = text("Sepal Length");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_24(ctx) {
    let t;
    return {
      c() {
        t = text("Sepal Width");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_23(ctx) {
    let t;
    return {
      c() {
        t = text("Petal Length");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_22(ctx) {
    let t;
    return {
      c() {
        t = text("Petal Width");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_21(ctx) {
    let t;
    return {
      c() {
        t = text("Species");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_20(ctx) {
    let tableheadcell0;
    let t0;
    let tableheadcell1;
    let t1;
    let tableheadcell2;
    let t2;
    let tableheadcell3;
    let t3;
    let tableheadcell4;
    let current;
    tableheadcell0 = new TableHeadCell_default({
      props: {
        $$slots: { default: [create_default_slot_25] },
        $$scope: { ctx }
      }
    });
    tableheadcell1 = new TableHeadCell_default({
      props: {
        $$slots: { default: [create_default_slot_24] },
        $$scope: { ctx }
      }
    });
    tableheadcell2 = new TableHeadCell_default({
      props: {
        $$slots: { default: [create_default_slot_23] },
        $$scope: { ctx }
      }
    });
    tableheadcell3 = new TableHeadCell_default({
      props: {
        $$slots: { default: [create_default_slot_22] },
        $$scope: { ctx }
      }
    });
    tableheadcell4 = new TableHeadCell_default({
      props: {
        $$slots: { default: [create_default_slot_21] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(tableheadcell0.$$.fragment);
        t0 = space();
        create_component(tableheadcell1.$$.fragment);
        t1 = space();
        create_component(tableheadcell2.$$.fragment);
        t2 = space();
        create_component(tableheadcell3.$$.fragment);
        t3 = space();
        create_component(tableheadcell4.$$.fragment);
      },
      m(target, anchor) {
        mount_component(tableheadcell0, target, anchor);
        insert(target, t0, anchor);
        mount_component(tableheadcell1, target, anchor);
        insert(target, t1, anchor);
        mount_component(tableheadcell2, target, anchor);
        insert(target, t2, anchor);
        mount_component(tableheadcell3, target, anchor);
        insert(target, t3, anchor);
        mount_component(tableheadcell4, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const tableheadcell0_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tableheadcell0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tableheadcell0.$set(tableheadcell0_changes);
        const tableheadcell1_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tableheadcell1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tableheadcell1.$set(tableheadcell1_changes);
        const tableheadcell2_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tableheadcell2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tableheadcell2.$set(tableheadcell2_changes);
        const tableheadcell3_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tableheadcell3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tableheadcell3.$set(tableheadcell3_changes);
        const tableheadcell4_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tableheadcell4_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tableheadcell4.$set(tableheadcell4_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(tableheadcell0.$$.fragment, local);
        transition_in(tableheadcell1.$$.fragment, local);
        transition_in(tableheadcell2.$$.fragment, local);
        transition_in(tableheadcell3.$$.fragment, local);
        transition_in(tableheadcell4.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(tableheadcell0.$$.fragment, local);
        transition_out(tableheadcell1.$$.fragment, local);
        transition_out(tableheadcell2.$$.fragment, local);
        transition_out(tableheadcell3.$$.fragment, local);
        transition_out(tableheadcell4.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
          detach(t2);
          detach(t3);
        }
        destroy_component(tableheadcell0, detaching);
        destroy_component(tableheadcell1, detaching);
        destroy_component(tableheadcell2, detaching);
        destroy_component(tableheadcell3, detaching);
        destroy_component(tableheadcell4, detaching);
      }
    };
  }
  function create_default_slot_19(ctx) {
    let t;
    return {
      c() {
        t = text("5.1");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_18(ctx) {
    let t;
    return {
      c() {
        t = text("3.5");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_17(ctx) {
    let t;
    return {
      c() {
        t = text("1.4");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_16(ctx) {
    let t;
    return {
      c() {
        t = text("0.2");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_15(ctx) {
    let t;
    return {
      c() {
        t = text("setosa");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_14(ctx) {
    let tablebodycell0;
    let t0;
    let tablebodycell1;
    let t1;
    let tablebodycell2;
    let t2;
    let tablebodycell3;
    let t3;
    let tablebodycell4;
    let current;
    tablebodycell0 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_19] },
        $$scope: { ctx }
      }
    });
    tablebodycell1 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_18] },
        $$scope: { ctx }
      }
    });
    tablebodycell2 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_17] },
        $$scope: { ctx }
      }
    });
    tablebodycell3 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_16] },
        $$scope: { ctx }
      }
    });
    tablebodycell4 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_15] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(tablebodycell0.$$.fragment);
        t0 = space();
        create_component(tablebodycell1.$$.fragment);
        t1 = space();
        create_component(tablebodycell2.$$.fragment);
        t2 = space();
        create_component(tablebodycell3.$$.fragment);
        t3 = space();
        create_component(tablebodycell4.$$.fragment);
      },
      m(target, anchor) {
        mount_component(tablebodycell0, target, anchor);
        insert(target, t0, anchor);
        mount_component(tablebodycell1, target, anchor);
        insert(target, t1, anchor);
        mount_component(tablebodycell2, target, anchor);
        insert(target, t2, anchor);
        mount_component(tablebodycell3, target, anchor);
        insert(target, t3, anchor);
        mount_component(tablebodycell4, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const tablebodycell0_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell0.$set(tablebodycell0_changes);
        const tablebodycell1_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell1.$set(tablebodycell1_changes);
        const tablebodycell2_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell2.$set(tablebodycell2_changes);
        const tablebodycell3_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell3.$set(tablebodycell3_changes);
        const tablebodycell4_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell4_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell4.$set(tablebodycell4_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(tablebodycell0.$$.fragment, local);
        transition_in(tablebodycell1.$$.fragment, local);
        transition_in(tablebodycell2.$$.fragment, local);
        transition_in(tablebodycell3.$$.fragment, local);
        transition_in(tablebodycell4.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(tablebodycell0.$$.fragment, local);
        transition_out(tablebodycell1.$$.fragment, local);
        transition_out(tablebodycell2.$$.fragment, local);
        transition_out(tablebodycell3.$$.fragment, local);
        transition_out(tablebodycell4.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
          detach(t2);
          detach(t3);
        }
        destroy_component(tablebodycell0, detaching);
        destroy_component(tablebodycell1, detaching);
        destroy_component(tablebodycell2, detaching);
        destroy_component(tablebodycell3, detaching);
        destroy_component(tablebodycell4, detaching);
      }
    };
  }
  function create_default_slot_13(ctx) {
    let t;
    return {
      c() {
        t = text("7.0");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_12(ctx) {
    let t;
    return {
      c() {
        t = text("3.2");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_11(ctx) {
    let t;
    return {
      c() {
        t = text("4.7");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_10(ctx) {
    let t;
    return {
      c() {
        t = text("1.4");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_9(ctx) {
    let t;
    return {
      c() {
        t = text("versicolor");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_8(ctx) {
    let tablebodycell0;
    let t0;
    let tablebodycell1;
    let t1;
    let tablebodycell2;
    let t2;
    let tablebodycell3;
    let t3;
    let tablebodycell4;
    let current;
    tablebodycell0 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_13] },
        $$scope: { ctx }
      }
    });
    tablebodycell1 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_12] },
        $$scope: { ctx }
      }
    });
    tablebodycell2 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_11] },
        $$scope: { ctx }
      }
    });
    tablebodycell3 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_10] },
        $$scope: { ctx }
      }
    });
    tablebodycell4 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_9] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(tablebodycell0.$$.fragment);
        t0 = space();
        create_component(tablebodycell1.$$.fragment);
        t1 = space();
        create_component(tablebodycell2.$$.fragment);
        t2 = space();
        create_component(tablebodycell3.$$.fragment);
        t3 = space();
        create_component(tablebodycell4.$$.fragment);
      },
      m(target, anchor) {
        mount_component(tablebodycell0, target, anchor);
        insert(target, t0, anchor);
        mount_component(tablebodycell1, target, anchor);
        insert(target, t1, anchor);
        mount_component(tablebodycell2, target, anchor);
        insert(target, t2, anchor);
        mount_component(tablebodycell3, target, anchor);
        insert(target, t3, anchor);
        mount_component(tablebodycell4, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const tablebodycell0_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell0.$set(tablebodycell0_changes);
        const tablebodycell1_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell1.$set(tablebodycell1_changes);
        const tablebodycell2_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell2.$set(tablebodycell2_changes);
        const tablebodycell3_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell3.$set(tablebodycell3_changes);
        const tablebodycell4_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell4_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell4.$set(tablebodycell4_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(tablebodycell0.$$.fragment, local);
        transition_in(tablebodycell1.$$.fragment, local);
        transition_in(tablebodycell2.$$.fragment, local);
        transition_in(tablebodycell3.$$.fragment, local);
        transition_in(tablebodycell4.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(tablebodycell0.$$.fragment, local);
        transition_out(tablebodycell1.$$.fragment, local);
        transition_out(tablebodycell2.$$.fragment, local);
        transition_out(tablebodycell3.$$.fragment, local);
        transition_out(tablebodycell4.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
          detach(t2);
          detach(t3);
        }
        destroy_component(tablebodycell0, detaching);
        destroy_component(tablebodycell1, detaching);
        destroy_component(tablebodycell2, detaching);
        destroy_component(tablebodycell3, detaching);
        destroy_component(tablebodycell4, detaching);
      }
    };
  }
  function create_default_slot_7(ctx) {
    let t;
    return {
      c() {
        t = text("6.3");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_6(ctx) {
    let t;
    return {
      c() {
        t = text("3.3");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_5(ctx) {
    let t;
    return {
      c() {
        t = text("6.0");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_4(ctx) {
    let t;
    return {
      c() {
        t = text("2.5");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_3(ctx) {
    let t;
    return {
      c() {
        t = text("Species");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_2(ctx) {
    let tablebodycell0;
    let t0;
    let tablebodycell1;
    let t1;
    let tablebodycell2;
    let t2;
    let tablebodycell3;
    let t3;
    let tablebodycell4;
    let current;
    tablebodycell0 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_7] },
        $$scope: { ctx }
      }
    });
    tablebodycell1 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_6] },
        $$scope: { ctx }
      }
    });
    tablebodycell2 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_5] },
        $$scope: { ctx }
      }
    });
    tablebodycell3 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_4] },
        $$scope: { ctx }
      }
    });
    tablebodycell4 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_3] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(tablebodycell0.$$.fragment);
        t0 = space();
        create_component(tablebodycell1.$$.fragment);
        t1 = space();
        create_component(tablebodycell2.$$.fragment);
        t2 = space();
        create_component(tablebodycell3.$$.fragment);
        t3 = space();
        create_component(tablebodycell4.$$.fragment);
      },
      m(target, anchor) {
        mount_component(tablebodycell0, target, anchor);
        insert(target, t0, anchor);
        mount_component(tablebodycell1, target, anchor);
        insert(target, t1, anchor);
        mount_component(tablebodycell2, target, anchor);
        insert(target, t2, anchor);
        mount_component(tablebodycell3, target, anchor);
        insert(target, t3, anchor);
        mount_component(tablebodycell4, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const tablebodycell0_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell0.$set(tablebodycell0_changes);
        const tablebodycell1_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell1.$set(tablebodycell1_changes);
        const tablebodycell2_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell2.$set(tablebodycell2_changes);
        const tablebodycell3_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell3.$set(tablebodycell3_changes);
        const tablebodycell4_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell4_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell4.$set(tablebodycell4_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(tablebodycell0.$$.fragment, local);
        transition_in(tablebodycell1.$$.fragment, local);
        transition_in(tablebodycell2.$$.fragment, local);
        transition_in(tablebodycell3.$$.fragment, local);
        transition_in(tablebodycell4.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(tablebodycell0.$$.fragment, local);
        transition_out(tablebodycell1.$$.fragment, local);
        transition_out(tablebodycell2.$$.fragment, local);
        transition_out(tablebodycell3.$$.fragment, local);
        transition_out(tablebodycell4.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
          detach(t2);
          detach(t3);
        }
        destroy_component(tablebodycell0, detaching);
        destroy_component(tablebodycell1, detaching);
        destroy_component(tablebodycell2, detaching);
        destroy_component(tablebodycell3, detaching);
        destroy_component(tablebodycell4, detaching);
      }
    };
  }
  function create_default_slot_1(ctx) {
    let tablebodyrow0;
    let t0;
    let tablebodyrow1;
    let t1;
    let tablebodyrow2;
    let current;
    tablebodyrow0 = new TableBodyRow_default({
      props: {
        $$slots: { default: [create_default_slot_14] },
        $$scope: { ctx }
      }
    });
    tablebodyrow1 = new TableBodyRow_default({
      props: {
        $$slots: { default: [create_default_slot_8] },
        $$scope: { ctx }
      }
    });
    tablebodyrow2 = new TableBodyRow_default({
      props: {
        $$slots: { default: [create_default_slot_2] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(tablebodyrow0.$$.fragment);
        t0 = space();
        create_component(tablebodyrow1.$$.fragment);
        t1 = space();
        create_component(tablebodyrow2.$$.fragment);
      },
      m(target, anchor) {
        mount_component(tablebodyrow0, target, anchor);
        insert(target, t0, anchor);
        mount_component(tablebodyrow1, target, anchor);
        insert(target, t1, anchor);
        mount_component(tablebodyrow2, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const tablebodyrow0_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodyrow0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodyrow0.$set(tablebodyrow0_changes);
        const tablebodyrow1_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodyrow1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodyrow1.$set(tablebodyrow1_changes);
        const tablebodyrow2_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodyrow2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodyrow2.$set(tablebodyrow2_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(tablebodyrow0.$$.fragment, local);
        transition_in(tablebodyrow1.$$.fragment, local);
        transition_in(tablebodyrow2.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(tablebodyrow0.$$.fragment, local);
        transition_out(tablebodyrow1.$$.fragment, local);
        transition_out(tablebodyrow2.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
        }
        destroy_component(tablebodyrow0, detaching);
        destroy_component(tablebodyrow1, detaching);
        destroy_component(tablebodyrow2, detaching);
      }
    };
  }
  function create_default_slot2(ctx) {
    let tablehead;
    let t;
    let tablebody;
    let current;
    tablehead = new TableHead_default({
      props: {
        $$slots: { default: [create_default_slot_20] },
        $$scope: { ctx }
      }
    });
    tablebody = new TableBody_default({
      props: {
        class: "divide-y",
        $$slots: { default: [create_default_slot_1] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(tablehead.$$.fragment);
        t = space();
        create_component(tablebody.$$.fragment);
      },
      m(target, anchor) {
        mount_component(tablehead, target, anchor);
        insert(target, t, anchor);
        mount_component(tablebody, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const tablehead_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablehead_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablehead.$set(tablehead_changes);
        const tablebody_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebody_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebody.$set(tablebody_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(tablehead.$$.fragment, local);
        transition_in(tablebody.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(tablehead.$$.fragment, local);
        transition_out(tablebody.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
        destroy_component(tablehead, detaching);
        destroy_component(tablebody, detaching);
      }
    };
  }
  function create_fragment10(ctx) {
    let table;
    let current;
    table = new Table_default({
      props: {
        $$slots: { default: [create_default_slot2] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(table.$$.fragment);
      },
      m(target, anchor) {
        mount_component(table, target, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        const table_changes = {};
        if (dirty & /*$$scope*/
        1) {
          table_changes.$$scope = { dirty, ctx: ctx2 };
        }
        table.$set(table_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(table.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(table.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(table, detaching);
      }
    };
  }
  var IrisTable = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, create_fragment10, safe_not_equal, {});
    }
  };
  var IrisTable_default = IrisTable;

  // MtcarsTable.svelte
  function create_default_slot_252(ctx) {
    let t;
    return {
      c() {
        t = text("Model");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_242(ctx) {
    let t;
    return {
      c() {
        t = text("Miles Per Gallon");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_232(ctx) {
    let t;
    return {
      c() {
        t = text("Cylinders");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_222(ctx) {
    let t;
    return {
      c() {
        t = text("Displacement");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_212(ctx) {
    let t;
    return {
      c() {
        t = text("HorsePower");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_202(ctx) {
    let tableheadcell0;
    let t0;
    let tableheadcell1;
    let t1;
    let tableheadcell2;
    let t2;
    let tableheadcell3;
    let t3;
    let tableheadcell4;
    let current;
    tableheadcell0 = new TableHeadCell_default({
      props: {
        $$slots: { default: [create_default_slot_252] },
        $$scope: { ctx }
      }
    });
    tableheadcell1 = new TableHeadCell_default({
      props: {
        $$slots: { default: [create_default_slot_242] },
        $$scope: { ctx }
      }
    });
    tableheadcell2 = new TableHeadCell_default({
      props: {
        $$slots: { default: [create_default_slot_232] },
        $$scope: { ctx }
      }
    });
    tableheadcell3 = new TableHeadCell_default({
      props: {
        $$slots: { default: [create_default_slot_222] },
        $$scope: { ctx }
      }
    });
    tableheadcell4 = new TableHeadCell_default({
      props: {
        $$slots: { default: [create_default_slot_212] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(tableheadcell0.$$.fragment);
        t0 = space();
        create_component(tableheadcell1.$$.fragment);
        t1 = space();
        create_component(tableheadcell2.$$.fragment);
        t2 = space();
        create_component(tableheadcell3.$$.fragment);
        t3 = space();
        create_component(tableheadcell4.$$.fragment);
      },
      m(target, anchor) {
        mount_component(tableheadcell0, target, anchor);
        insert(target, t0, anchor);
        mount_component(tableheadcell1, target, anchor);
        insert(target, t1, anchor);
        mount_component(tableheadcell2, target, anchor);
        insert(target, t2, anchor);
        mount_component(tableheadcell3, target, anchor);
        insert(target, t3, anchor);
        mount_component(tableheadcell4, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const tableheadcell0_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tableheadcell0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tableheadcell0.$set(tableheadcell0_changes);
        const tableheadcell1_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tableheadcell1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tableheadcell1.$set(tableheadcell1_changes);
        const tableheadcell2_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tableheadcell2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tableheadcell2.$set(tableheadcell2_changes);
        const tableheadcell3_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tableheadcell3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tableheadcell3.$set(tableheadcell3_changes);
        const tableheadcell4_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tableheadcell4_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tableheadcell4.$set(tableheadcell4_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(tableheadcell0.$$.fragment, local);
        transition_in(tableheadcell1.$$.fragment, local);
        transition_in(tableheadcell2.$$.fragment, local);
        transition_in(tableheadcell3.$$.fragment, local);
        transition_in(tableheadcell4.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(tableheadcell0.$$.fragment, local);
        transition_out(tableheadcell1.$$.fragment, local);
        transition_out(tableheadcell2.$$.fragment, local);
        transition_out(tableheadcell3.$$.fragment, local);
        transition_out(tableheadcell4.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
          detach(t2);
          detach(t3);
        }
        destroy_component(tableheadcell0, detaching);
        destroy_component(tableheadcell1, detaching);
        destroy_component(tableheadcell2, detaching);
        destroy_component(tableheadcell3, detaching);
        destroy_component(tableheadcell4, detaching);
      }
    };
  }
  function create_default_slot_192(ctx) {
    let t;
    return {
      c() {
        t = text("Mazda RX4");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_182(ctx) {
    let t;
    return {
      c() {
        t = text("21");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_172(ctx) {
    let t;
    return {
      c() {
        t = text("6");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_162(ctx) {
    let t;
    return {
      c() {
        t = text("160");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_152(ctx) {
    let t;
    return {
      c() {
        t = text("110");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_142(ctx) {
    let tablebodycell0;
    let t0;
    let tablebodycell1;
    let t1;
    let tablebodycell2;
    let t2;
    let tablebodycell3;
    let t3;
    let tablebodycell4;
    let current;
    tablebodycell0 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_192] },
        $$scope: { ctx }
      }
    });
    tablebodycell1 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_182] },
        $$scope: { ctx }
      }
    });
    tablebodycell2 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_172] },
        $$scope: { ctx }
      }
    });
    tablebodycell3 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_162] },
        $$scope: { ctx }
      }
    });
    tablebodycell4 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_152] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(tablebodycell0.$$.fragment);
        t0 = space();
        create_component(tablebodycell1.$$.fragment);
        t1 = space();
        create_component(tablebodycell2.$$.fragment);
        t2 = space();
        create_component(tablebodycell3.$$.fragment);
        t3 = space();
        create_component(tablebodycell4.$$.fragment);
      },
      m(target, anchor) {
        mount_component(tablebodycell0, target, anchor);
        insert(target, t0, anchor);
        mount_component(tablebodycell1, target, anchor);
        insert(target, t1, anchor);
        mount_component(tablebodycell2, target, anchor);
        insert(target, t2, anchor);
        mount_component(tablebodycell3, target, anchor);
        insert(target, t3, anchor);
        mount_component(tablebodycell4, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const tablebodycell0_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell0.$set(tablebodycell0_changes);
        const tablebodycell1_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell1.$set(tablebodycell1_changes);
        const tablebodycell2_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell2.$set(tablebodycell2_changes);
        const tablebodycell3_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell3.$set(tablebodycell3_changes);
        const tablebodycell4_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell4_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell4.$set(tablebodycell4_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(tablebodycell0.$$.fragment, local);
        transition_in(tablebodycell1.$$.fragment, local);
        transition_in(tablebodycell2.$$.fragment, local);
        transition_in(tablebodycell3.$$.fragment, local);
        transition_in(tablebodycell4.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(tablebodycell0.$$.fragment, local);
        transition_out(tablebodycell1.$$.fragment, local);
        transition_out(tablebodycell2.$$.fragment, local);
        transition_out(tablebodycell3.$$.fragment, local);
        transition_out(tablebodycell4.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
          detach(t2);
          detach(t3);
        }
        destroy_component(tablebodycell0, detaching);
        destroy_component(tablebodycell1, detaching);
        destroy_component(tablebodycell2, detaching);
        destroy_component(tablebodycell3, detaching);
        destroy_component(tablebodycell4, detaching);
      }
    };
  }
  function create_default_slot_132(ctx) {
    let t;
    return {
      c() {
        t = text("Datsun 710");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_122(ctx) {
    let t;
    return {
      c() {
        t = text("23");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_112(ctx) {
    let t;
    return {
      c() {
        t = text("4");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_102(ctx) {
    let t;
    return {
      c() {
        t = text("108");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_92(ctx) {
    let t;
    return {
      c() {
        t = text("93");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_82(ctx) {
    let tablebodycell0;
    let t0;
    let tablebodycell1;
    let t1;
    let tablebodycell2;
    let t2;
    let tablebodycell3;
    let t3;
    let tablebodycell4;
    let current;
    tablebodycell0 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_132] },
        $$scope: { ctx }
      }
    });
    tablebodycell1 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_122] },
        $$scope: { ctx }
      }
    });
    tablebodycell2 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_112] },
        $$scope: { ctx }
      }
    });
    tablebodycell3 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_102] },
        $$scope: { ctx }
      }
    });
    tablebodycell4 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_92] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(tablebodycell0.$$.fragment);
        t0 = space();
        create_component(tablebodycell1.$$.fragment);
        t1 = space();
        create_component(tablebodycell2.$$.fragment);
        t2 = space();
        create_component(tablebodycell3.$$.fragment);
        t3 = space();
        create_component(tablebodycell4.$$.fragment);
      },
      m(target, anchor) {
        mount_component(tablebodycell0, target, anchor);
        insert(target, t0, anchor);
        mount_component(tablebodycell1, target, anchor);
        insert(target, t1, anchor);
        mount_component(tablebodycell2, target, anchor);
        insert(target, t2, anchor);
        mount_component(tablebodycell3, target, anchor);
        insert(target, t3, anchor);
        mount_component(tablebodycell4, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const tablebodycell0_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell0.$set(tablebodycell0_changes);
        const tablebodycell1_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell1.$set(tablebodycell1_changes);
        const tablebodycell2_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell2.$set(tablebodycell2_changes);
        const tablebodycell3_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell3.$set(tablebodycell3_changes);
        const tablebodycell4_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell4_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell4.$set(tablebodycell4_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(tablebodycell0.$$.fragment, local);
        transition_in(tablebodycell1.$$.fragment, local);
        transition_in(tablebodycell2.$$.fragment, local);
        transition_in(tablebodycell3.$$.fragment, local);
        transition_in(tablebodycell4.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(tablebodycell0.$$.fragment, local);
        transition_out(tablebodycell1.$$.fragment, local);
        transition_out(tablebodycell2.$$.fragment, local);
        transition_out(tablebodycell3.$$.fragment, local);
        transition_out(tablebodycell4.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
          detach(t2);
          detach(t3);
        }
        destroy_component(tablebodycell0, detaching);
        destroy_component(tablebodycell1, detaching);
        destroy_component(tablebodycell2, detaching);
        destroy_component(tablebodycell3, detaching);
        destroy_component(tablebodycell4, detaching);
      }
    };
  }
  function create_default_slot_72(ctx) {
    let t;
    return {
      c() {
        t = text("AMC Javelin");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_62(ctx) {
    let t;
    return {
      c() {
        t = text("15");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_52(ctx) {
    let t;
    return {
      c() {
        t = text("8");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_42(ctx) {
    let t;
    return {
      c() {
        t = text("304");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_32(ctx) {
    let t;
    return {
      c() {
        t = text("150");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_26(ctx) {
    let tablebodycell0;
    let t0;
    let tablebodycell1;
    let t1;
    let tablebodycell2;
    let t2;
    let tablebodycell3;
    let t3;
    let tablebodycell4;
    let current;
    tablebodycell0 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_72] },
        $$scope: { ctx }
      }
    });
    tablebodycell1 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_62] },
        $$scope: { ctx }
      }
    });
    tablebodycell2 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_52] },
        $$scope: { ctx }
      }
    });
    tablebodycell3 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_42] },
        $$scope: { ctx }
      }
    });
    tablebodycell4 = new TableBodyCell_default({
      props: {
        $$slots: { default: [create_default_slot_32] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(tablebodycell0.$$.fragment);
        t0 = space();
        create_component(tablebodycell1.$$.fragment);
        t1 = space();
        create_component(tablebodycell2.$$.fragment);
        t2 = space();
        create_component(tablebodycell3.$$.fragment);
        t3 = space();
        create_component(tablebodycell4.$$.fragment);
      },
      m(target, anchor) {
        mount_component(tablebodycell0, target, anchor);
        insert(target, t0, anchor);
        mount_component(tablebodycell1, target, anchor);
        insert(target, t1, anchor);
        mount_component(tablebodycell2, target, anchor);
        insert(target, t2, anchor);
        mount_component(tablebodycell3, target, anchor);
        insert(target, t3, anchor);
        mount_component(tablebodycell4, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const tablebodycell0_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell0.$set(tablebodycell0_changes);
        const tablebodycell1_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell1.$set(tablebodycell1_changes);
        const tablebodycell2_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell2.$set(tablebodycell2_changes);
        const tablebodycell3_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell3.$set(tablebodycell3_changes);
        const tablebodycell4_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodycell4_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodycell4.$set(tablebodycell4_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(tablebodycell0.$$.fragment, local);
        transition_in(tablebodycell1.$$.fragment, local);
        transition_in(tablebodycell2.$$.fragment, local);
        transition_in(tablebodycell3.$$.fragment, local);
        transition_in(tablebodycell4.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(tablebodycell0.$$.fragment, local);
        transition_out(tablebodycell1.$$.fragment, local);
        transition_out(tablebodycell2.$$.fragment, local);
        transition_out(tablebodycell3.$$.fragment, local);
        transition_out(tablebodycell4.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
          detach(t2);
          detach(t3);
        }
        destroy_component(tablebodycell0, detaching);
        destroy_component(tablebodycell1, detaching);
        destroy_component(tablebodycell2, detaching);
        destroy_component(tablebodycell3, detaching);
        destroy_component(tablebodycell4, detaching);
      }
    };
  }
  function create_default_slot_110(ctx) {
    let tablebodyrow0;
    let t0;
    let tablebodyrow1;
    let t1;
    let tablebodyrow2;
    let current;
    tablebodyrow0 = new TableBodyRow_default({
      props: {
        $$slots: { default: [create_default_slot_142] },
        $$scope: { ctx }
      }
    });
    tablebodyrow1 = new TableBodyRow_default({
      props: {
        $$slots: { default: [create_default_slot_82] },
        $$scope: { ctx }
      }
    });
    tablebodyrow2 = new TableBodyRow_default({
      props: {
        $$slots: { default: [create_default_slot_26] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(tablebodyrow0.$$.fragment);
        t0 = space();
        create_component(tablebodyrow1.$$.fragment);
        t1 = space();
        create_component(tablebodyrow2.$$.fragment);
      },
      m(target, anchor) {
        mount_component(tablebodyrow0, target, anchor);
        insert(target, t0, anchor);
        mount_component(tablebodyrow1, target, anchor);
        insert(target, t1, anchor);
        mount_component(tablebodyrow2, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const tablebodyrow0_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodyrow0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodyrow0.$set(tablebodyrow0_changes);
        const tablebodyrow1_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodyrow1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodyrow1.$set(tablebodyrow1_changes);
        const tablebodyrow2_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebodyrow2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebodyrow2.$set(tablebodyrow2_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(tablebodyrow0.$$.fragment, local);
        transition_in(tablebodyrow1.$$.fragment, local);
        transition_in(tablebodyrow2.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(tablebodyrow0.$$.fragment, local);
        transition_out(tablebodyrow1.$$.fragment, local);
        transition_out(tablebodyrow2.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
        }
        destroy_component(tablebodyrow0, detaching);
        destroy_component(tablebodyrow1, detaching);
        destroy_component(tablebodyrow2, detaching);
      }
    };
  }
  function create_default_slot3(ctx) {
    let tablehead;
    let t;
    let tablebody;
    let current;
    tablehead = new TableHead_default({
      props: {
        $$slots: { default: [create_default_slot_202] },
        $$scope: { ctx }
      }
    });
    tablebody = new TableBody_default({
      props: {
        class: "divide-y",
        $$slots: { default: [create_default_slot_110] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(tablehead.$$.fragment);
        t = space();
        create_component(tablebody.$$.fragment);
      },
      m(target, anchor) {
        mount_component(tablehead, target, anchor);
        insert(target, t, anchor);
        mount_component(tablebody, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const tablehead_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablehead_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablehead.$set(tablehead_changes);
        const tablebody_changes = {};
        if (dirty & /*$$scope*/
        1) {
          tablebody_changes.$$scope = { dirty, ctx: ctx2 };
        }
        tablebody.$set(tablebody_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(tablehead.$$.fragment, local);
        transition_in(tablebody.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(tablehead.$$.fragment, local);
        transition_out(tablebody.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
        destroy_component(tablehead, detaching);
        destroy_component(tablebody, detaching);
      }
    };
  }
  function create_fragment11(ctx) {
    let table;
    let current;
    table = new Table_default({
      props: {
        $$slots: { default: [create_default_slot3] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(table.$$.fragment);
      },
      m(target, anchor) {
        mount_component(table, target, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        const table_changes = {};
        if (dirty & /*$$scope*/
        1) {
          table_changes.$$scope = { dirty, ctx: ctx2 };
        }
        table.$set(table_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(table.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(table.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(table, detaching);
      }
    };
  }
  var MtcarsTable = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, create_fragment11, safe_not_equal, {});
    }
  };
  var MtcarsTable_default = MtcarsTable;

  // App.svelte
  function create_default_slot_27(ctx) {
    let t;
    return {
      c() {
        t = text("iris");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_111(ctx) {
    let t;
    return {
      c() {
        t = text("mtcars");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot4(ctx) {
    let radiobutton0;
    let updating_group;
    let t;
    let radiobutton1;
    let updating_group_1;
    let current;
    function radiobutton0_group_binding(value) {
      ctx[1](value);
    }
    let radiobutton0_props = {
      value: "iris",
      $$slots: { default: [create_default_slot_27] },
      $$scope: { ctx }
    };
    if (
      /*radioGroup*/
      ctx[0] !== void 0
    ) {
      radiobutton0_props.group = /*radioGroup*/
      ctx[0];
    }
    radiobutton0 = new RadioButton_default({ props: radiobutton0_props });
    binding_callbacks.push(() => bind(radiobutton0, "group", radiobutton0_group_binding));
    function radiobutton1_group_binding(value) {
      ctx[2](value);
    }
    let radiobutton1_props = {
      value: "mtcars",
      $$slots: { default: [create_default_slot_111] },
      $$scope: { ctx }
    };
    if (
      /*radioGroup*/
      ctx[0] !== void 0
    ) {
      radiobutton1_props.group = /*radioGroup*/
      ctx[0];
    }
    radiobutton1 = new RadioButton_default({ props: radiobutton1_props });
    binding_callbacks.push(() => bind(radiobutton1, "group", radiobutton1_group_binding));
    return {
      c() {
        create_component(radiobutton0.$$.fragment);
        t = space();
        create_component(radiobutton1.$$.fragment);
      },
      m(target, anchor) {
        mount_component(radiobutton0, target, anchor);
        insert(target, t, anchor);
        mount_component(radiobutton1, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const radiobutton0_changes = {};
        if (dirty & /*$$scope*/
        8) {
          radiobutton0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        if (!updating_group && dirty & /*radioGroup*/
        1) {
          updating_group = true;
          radiobutton0_changes.group = /*radioGroup*/
          ctx2[0];
          add_flush_callback(() => updating_group = false);
        }
        radiobutton0.$set(radiobutton0_changes);
        const radiobutton1_changes = {};
        if (dirty & /*$$scope*/
        8) {
          radiobutton1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        if (!updating_group_1 && dirty & /*radioGroup*/
        1) {
          updating_group_1 = true;
          radiobutton1_changes.group = /*radioGroup*/
          ctx2[0];
          add_flush_callback(() => updating_group_1 = false);
        }
        radiobutton1.$set(radiobutton1_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(radiobutton0.$$.fragment, local);
        transition_in(radiobutton1.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(radiobutton0.$$.fragment, local);
        transition_out(radiobutton1.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
        destroy_component(radiobutton0, detaching);
        destroy_component(radiobutton1, detaching);
      }
    };
  }
  function create_else_block3(ctx) {
    let mtcarstable;
    let current;
    mtcarstable = new MtcarsTable_default({});
    return {
      c() {
        create_component(mtcarstable.$$.fragment);
      },
      m(target, anchor) {
        mount_component(mtcarstable, target, anchor);
        current = true;
      },
      i(local) {
        if (current)
          return;
        transition_in(mtcarstable.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(mtcarstable.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(mtcarstable, detaching);
      }
    };
  }
  function create_if_block3(ctx) {
    let iristable;
    let current;
    iristable = new IrisTable_default({});
    return {
      c() {
        create_component(iristable.$$.fragment);
      },
      m(target, anchor) {
        mount_component(iristable, target, anchor);
        current = true;
      },
      i(local) {
        if (current)
          return;
        transition_in(iristable.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(iristable.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(iristable, detaching);
      }
    };
  }
  function create_fragment12(ctx) {
    let div;
    let buttongroup;
    let t;
    let current_block_type_index;
    let if_block;
    let current;
    buttongroup = new ButtonGroup_default({
      props: {
        $$slots: { default: [create_default_slot4] },
        $$scope: { ctx }
      }
    });
    const if_block_creators = [create_if_block3, create_else_block3];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
      if (
        /*radioGroup*/
        ctx2[0] == "iris"
      )
        return 0;
      return 1;
    }
    current_block_type_index = select_block_type(ctx, -1);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    return {
      c() {
        div = element("div");
        create_component(buttongroup.$$.fragment);
        t = space();
        if_block.c();
      },
      m(target, anchor) {
        insert(target, div, anchor);
        mount_component(buttongroup, div, null);
        append(div, t);
        if_blocks[current_block_type_index].m(div, null);
        current = true;
      },
      p(ctx2, [dirty]) {
        const buttongroup_changes = {};
        if (dirty & /*$$scope, radioGroup*/
        9) {
          buttongroup_changes.$$scope = { dirty, ctx: ctx2 };
        }
        buttongroup.$set(buttongroup_changes);
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2, dirty);
        if (current_block_type_index !== previous_block_index) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
          }
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(buttongroup.$$.fragment, local);
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(buttongroup.$$.fragment, local);
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        destroy_component(buttongroup);
        if_blocks[current_block_type_index].d();
      }
    };
  }
  function instance10($$self, $$props, $$invalidate) {
    let radioGroup = "iris";
    function radiobutton0_group_binding(value) {
      radioGroup = value;
      $$invalidate(0, radioGroup);
    }
    function radiobutton1_group_binding(value) {
      radioGroup = value;
      $$invalidate(0, radioGroup);
    }
    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*radioGroup*/
      1) {
        $:
          Shiny.setInputValue("dataset", radioGroup);
      }
    };
    return [radioGroup, radiobutton0_group_binding, radiobutton1_group_binding];
  }
  var App = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance10, create_fragment12, safe_not_equal, {});
    }
  };
  var App_default = App;

  // index.js
  globalThis.fbApp = App_default;
})();
