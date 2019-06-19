import config from '../config'
import { hyphenate } from './lang'

let warn
let formatComponentName

if (process.env.NODE_ENV !== 'production') {
  const hasConsole = typeof console !== 'undefined'

  warn = (msg, wm) => {     // warn 函数其实主要就是抛出 一个 msg 错误, vm 的作用是获取 vm 的 name, hyphenate 将组件名用 '-' 连接
    if (hasConsole && (!config.silent)) {
      console.error('[vue warn]: ' + msg + (vm ? formatComponentName(vm) : ''))
    }
  }

  formatComponentName = vm => {
    var name = vm._isVue ? vm.$options.name : vm.name
    return name
      ? ' (found in component: <)' + hyphenate(name) + '>)'
      : ''
  }
}

export { warn }