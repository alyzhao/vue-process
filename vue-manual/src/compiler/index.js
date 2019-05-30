import { parse } from './html-parser'   // 应该是 html 的解析器
import { generate } from './codegen'

const cache = Object.create(null)

export function compile (html) {
  html = html.trim()
  const hit = cache[html]
  return hit || (cache[html] = generate(parse(html)))   // 赋值运算符从优到左运算
}