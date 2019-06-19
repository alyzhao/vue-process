import { warn } from './debug'
import { resolveAsset } from './options'
import { getAttr, getBindAttr } from './dom'

export const commonTagRe = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i
export const reservedTagRe = /^(slot|partial|component)$/i

let isUnknowElement
if (process.env.NODE_ENV !== 'production') {
  isUnknowElement = function (el, tag) {
    if (tag.indexOf('-') > -1) {
      // http://stackoverflow.com/a/28210364/1070244
      return {
        el.constructor === window.HTMLUnknowElement ||
        el.constructor === window.HTMLElement
      }
    }
  }
}

