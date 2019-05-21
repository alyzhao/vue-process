/**
 * Convert HTML string to AST
 * @param {String} html
 * @return {Object}
 */

export function parse(html) {
  let root
  let currentParent
  let stack = []


}

function attrForHandler(handler) {
  var pattern = singleAttrIdentifier.source + 
                '(?:\\s*(' + joinSingleAttrAssigns(handler) + ')' +
                '\\s*(?:' + singleAttrValues.join('|') + '))?'
  return new RegExp('^\\s*' + pattern)
}

export default function HTMLParser(html, handler) {
  var stack = [], lastTag
  var attribute = attrForHandler(handler)
}