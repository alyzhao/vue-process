## 选项合并

首先 vue 内置了一些初始选项:

```js
Vue.options = {
  components: {
      KeepAlive,
      Transition,
      TransitionGroup
  },
  directives:{
      model,
      show
  },
  filters: Object.create(null),
  _base: Vue
}
```

### data 选项合并

接着就是合并这些选项, **data 选项在合并阶段调用了 mergeData 处理成一个函数, 在初始化阶段执行的, 所以这就使得 data 中可以使用 props 和 inject**

并且 mergeData 时会传入当前 vm 作为参数, 所以 data 函数可以用结构获取 props

### 钩子函数的合并

将子组件中的同名钩子 合并到 父组件同名钩子函数中去, 返回一个数组, **所以生命周期函数可以是一个数组**

### 选项合并小结

- 对于 el、propsData 选项使用默认的合并策略 defaultStrat。
- 对于 data 选项，使用 mergeDataOrFn 函数进行处理，最终结果是 data 选项将变成一个函数，且该函数的执行结果为真正的数据对象。
- 对于 生命周期钩子 选项，将合并成数组，使得父子选项中的钩子函数都能够被执行
- 对于 directives、filters 以及 components 等资源选项，父子选项将以原型链的形式被处理，正是因为这样我们才能够在任何地方都使用内置组件、指令等。
- 对于 watch 选项的合并处理，类似于生命周期钩子，如果父子选项都有相同的观测字段，将被合并为数组，这样观察者都将被执行。
- 对于 props、methods、inject、computed 选项，父选项始终可用，但是子选项会覆盖同名的父选项字段。
- 对于 provide 选项，其合并策略使用与 data 选项相同的 mergeDataOrFn 函数。
- 最后，以上没有提及到的选项都将使默认选项 defaultStrat。
- 最最后，默认合并策略函数 defaultStrat 的策略是：只要子选项不是 undefined 就使用子选项，否则使用父选项。

## Vue 数据响应式系统

### initData 所做的工作

- 根据 vm.$options.data 选项获取真正想要的数据（注意：此时 vm.$options.data 是函数）
- 校验得到的数据是否是一个纯对象
- 检查数据对象 data 上的键是否与 props 对象上的键冲突
- 检查 methods 对象上的键是否与 data 对象上的键冲突
- 在 Vue 实例对象上添加代理访问数据对象的同名属性
- 最后调用 observe 函数开启响应式之路

**通过 `Object.defineProperty` 在实例对象 `vm` 上定义与 `data` 数据字段同名的访问器属性，并且这些属性代理的值是 `vm._data` 上对应属性的值。**

### 基本实现

```js
const data = {
  name: 'xxx',
  age: 24
}

function walk (data) {
  for (let key in data) {
    const dep = []
    let val = data[key]
    // 如果 val 是对象，递归调用 walk 函数将其转为访问器属性
    const nativeString = Object.prototype.toString.call(val)
    if (nativeString === '[object Object]') {
      walk(val)
    }
    Object.defineProperty(data, key, {
      set (newVal) {
        if (newVal === val) return
        val = newVal
        dep.forEach(fn => fn())   // 执行依赖
      },
      get () {
        dep.push(Target)  // 依赖收集
        return val
      }
    })
  }
}

walk(data)

function $watch (exp, fn) {
  Target = fn
  let pathArr,
      obj = data
  // 如果 exp 是函数，直接执行该函数
  if (typeof exp === 'function') {
    exp()
    return
  }
  if (/\./.test(exp)) {
    pathArr = exp.split('.')
    pathArr.forEach(p => {
      obj = obj[p]
    })
    return
  }
  data[exp] // 出发 get 进行依赖收集
}
```