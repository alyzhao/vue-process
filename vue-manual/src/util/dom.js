import config from '../config'
import { isIE9 } from './env'
import { warn } from './debug'
import { camelize } from './lang'

/**
 * Query an element selector if it's not an element already.
 *
 * @param {String|Element} el
 * @return {Element}
 */

export function query (el) {
  if (typeof el === 'string') {
    var selector = el
    el = document.querySelector(el)
    if (!el) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + selector
      )
    }
  }
  return el
}

/**
 * Check if a node is in the document.
 * Note: document.documentElement.contains should work here
 * but always returns false for comment nodes in phantomjs,
 * making unit tests difficult. This is fixed by doing the
 * contains() check on the node's parentNode instead of
 * the node itself.
 *
 * @param {Node} node
 * @return {Boolean}
 */

export function inDoc (node) {
  var doc = document.documentElement
  var parent = node && node.parentNode
  return doc === node || 
    doc === parent ||
    !!(parent && parent.nodeType === 1 && (doc.contains(parent)))
}

/**
 * Get and remove an attribute from a node.
 *
 * @param {Node} node
 * @param {String} _attr
 */

export function getAttr (node, _attr) {
  var val = node.getAttribute(_attr)
  if (val !== null) {
    node.removeAttribute(_attr)
  }
  return val
}

/**
 * Get an attribute with colon or v-bind: prefix.
 *
 * @param {Node} node
 * @param {String} name
 * @return {String|null}
 */

export function getBindAttr (node, name) {
  var val = getAttr(node, ':' + name)
  if (val === null) {
    val = getAttr(node, 'v-bind:' + name)
  }
  return val
}

/**
 * Check the presence of a bind attribute.
 *
 * @param {Node} node
 * @param {String} name
 * @return {Boolean}
 */

export function hasBindAttr (node, name) {
  return node.hasAttribute(name) ||       // Element.prototype.hasAttribute 是原生方法
    node.hasAttribute(':' + name) ||
    node.hasAttribute('v-bind:' + name)
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

export function before (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Insert el after target
 *
 * @param {Element} el
 * @param {Element} target
 */

export function after (el, target) {
  if (target.nextSibling) {
    before(el, target.nextSibling)
  } else {
    target.parentNode.appendChild(el)
  }
}

/**
 * Remove el from DOM
 *
 * @param {Element} el
 */

export function remove (el) {
  el.parentNode.removeChild(el)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

export function prepend (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

/**
 * Replace target with el
 *
 * @param {Element} target
 * @param {Element} el
 */

export function replace (target, el) {
  var parent = target.parentNode
  if (parent) {
    parent.replaceChild(el, target)
  }
}

/**
 * Add event listener shorthand.
 *
 * @param {Element} el
 * @param {String} event
 * @param {Function} cb
 * @param {Boolean} [useCapture]
 */

export function on (el, event, cb, useCapture) {
  el.addEventListener(event, cb, useCapture)
}

/**
 * Remove event listener shorthand.
 *
 * @param {Element} el
 * @param {String} event
 * @param {Function} cb
 */

export function off (el, event, cb) {
  el.removeEventListener(event, cb)
}

/**
 * For IE9 compat: when both class and :class are present
 * getAttribute('class') returns wrong value...
 *
 * @param {Element} el
 * @return {String}
 */

function getClass (el) {
  var classname = el.className
  if (typeof classname === 'object') {
    classname = classname.baseVal || ''
  }
  return classname
}

/**
 * In IE9, setAttribute('class') will result in empty class
 * if the element also has the :class attribute; However in
 * PhantomJS, setting `className` does not work on SVG elements...
 * So we have to do a conditional check here.
 *
 * @param {Element} el
 * @param {String} cls
 */

export function setClass (el, cls) {
  /* istanbul ignore if */
  if (isIE9 && !/svg$/.test(el.namespaceURI)) {
    el.className = cls
  } else {
    el.setAttribute('class', cls)
  }
}

/**
 * Add class with compatibility for IE & SVG
 *
 * @param {Element} el
 * @param {String} cls
 */

export function addClass (el, cls) {
  if (el.classList) {
    el.classList.add(cls)
  } else {
    var cur = ' ' + getClass(el) + ' '
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      setClass(el, (cur + cls).trim())
    }
  }
}

/**
 * Remove class with compatibility for IE & SVG
 *
 * @param {Element} el
 * @param {String} cls
 */

export function removeClass (el, cls) {
  if (el.classList) {
    el.classList.remove(cls)
  } else {
    var cur = ' ' + getClass(el) + ' '
    var tar = ' ' + cls + ' '
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ')
    }
    setClass(el, cur.trim())
  }
  if (!el.classname) {
    el.removeAttribute('class')
  }
}

/**
 * Extract raw content inside an element into a temporary
 * container div
 *
 * @param {Element} el
 * @param {Boolean} asFragment
 * @return {Element|DocumentFragment}
 */

export function extractContent (el, asFragment) {
  var child
  var rawContent
  /* istanbul ignore if */
  if (isTemplate(el) && isFragment(el.content)) {
    
  }
}

/**
 * Check if an element is a template tag.
 * Note if the template appears inside an SVG its tagName
 * will be in lowercase.
 *
 * @param {Element} el
 */

export function isTemplate (el) {
  return el.tagName && 
    el.tagName.toLowerCase() === 'template'
}

