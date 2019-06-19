import Dep from './dep'
import { arrayMethods } from './array'
import {
  def,    // 其实就是 Object.defineProperty
  isArray,
  isPlainObject,
  hasProto,
  hasOwn
} from '../util/index'

const arrayKeys = Object.getOwnPropertyNames(arrayMethods)



