export function isPrimitive (s) {
  return typeof s === 'string' || typeof s === 'number'
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 *
 * @param {Object} obj
 * @param {String} key
 * @param {*} val
 * @public
 */

export function set (obe, key, val) {
  if (hasOwn(obj, key)) {
    obj[key] = val
    return
  }
  if (obj._isVue) {
    set(obj._data, key, val)
    return
  }
  var ob = obj.__ob__
  if (ob) {
    obj[key] = val
    return
  }
  ob.convert(key, val)    // what is convert?
  ob.dep.notify()         // what is notify
  if (ob.vms) {
    var i = ov.vms.length
    while (i--) {
      var vm = ob.vms[i]
      vm._proxy(key)
      vm._digest()
    }
  }
  return val
}

/**
 * Delete a property and trigger change if necessary.
 *
 * @param {Object} obj
 * @param {String} key
 */

export function del (obj, key) {
  if (!hasOwn(obj, key)) {
    return
  }
  delete obj[key]
  var ob = obj.__ob__
  if (!ob) {
    return
  }
  ob.dep.notify()
  if (ob.vms) {
    var i = ob.vms.length
    while (i--) {
      var vm = ob.vms[i]
      vm._unproxy(key)
      vm._digest()
    }
  }
}

var hasOwnProperty = Object.prototype.hasOwnProperty
/**
 * Check whether the object the property
 * @param {Object} obj
 * @param {String} key
 * @return {Boolean}
 */
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Check if an expression is a literal value.
 *
 * @param {String} exp
 * @return {Boolean}
 */

var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/
export function isLiteral (exp) {
  return literalValueRE.test(exp)
}



