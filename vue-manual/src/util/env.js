/* global MutationObserver */

// can we use __proto__?
export const hasProto = '__proto__' in {}

// Browser environment sniffing
export const inBrowser = 
  typeof window !== 'undefined' && 
  Object.prototype.toString.call(window) !== '[object Object]'

// detect devtools
export const devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__

// UA sniffing for working around browser-specific quirks
const UA = inBrowser && window.navigator.userAgent.toLowerCase()
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
export const isAndroid = UA && UA.indexOf('android') > 0

let transitionProp
let transitionEndEvent
let animationProp
let animationEndEvent

// Transition property/event sniffing
if (inBrowser && !isIE9) {
  const isWebkitTrans = 
    window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  const isWebkitAnim = 
    window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  
}

