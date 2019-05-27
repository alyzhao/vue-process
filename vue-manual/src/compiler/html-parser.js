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

var singleAttrIdentifier = /([^\s"'<>\/=])/,
    singleAttrAssign = /=/,
    singleAttrAssigns = [singleAttrAssign],
    singleAttrValues = [
      // attr value double quotes
      /"([^"]*)"+/.source,  // source 是正则的一个属性, 返回正则的纯文本
      // attr value, single quotes
      /'([^'']*)'+/.source,
      // attr value, no quotes
      /([^\s"'=<>`])/.source
    ],
    qnameCapture = (function() {
      var ncname = '[a-zA-Z_][\\w\\-\\.]*'    // 在字符串中 '\都需要转义'
      return '((?:' + cname + '\\:)?' + ncname + ')'
    })(),
    startTagOpen = new RegExp('^<' + qnameCapture),
    startTagClose = /^\s*(\/?)>/,
    endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>'),
    doctype = /^<!DOCTYPE [^>]+>/i

function attrForHandler(handler) {
  var pattern = singleAttrIdentifier.source + 
                '(?:\\s*(' + joinSingleAttrAssigns(handler) + ')' +
                '\\s*(?:' + singleAttrValues.join('|') + '))?'
  return new RegExp('^\\s*' + pattern)
}

function joinSingleAttrAssigns(handler) {
  return singleAttrAssigns.map(function(assign) {
    return '(?:' + assign.source + ')'
  }).join('|')
}

function makeMap(values) {
  values = values.split(/,/)
  var map = {}
  values.forEach(function(value) {
    map[value] = 1
  })
  return function(value) {
    return map[value.toLowerCase()] === 1
  }
}

// Inline Elements
var inline = makeMap('a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,noscript,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,svg,textarea,tt,u,var')

// Special Elements (can contain anything)
var special = makeMap('script,style')

export default function HTMLParser(html, handler) {
  var stack = [], lastTag
  var attribute = attrForHandler(handler)
  var last, prevTag, nextTag
  while (html) {
    last = html
    if (!lastTag || !special(lastTag)) {
      var textEnd = html.indexOf('<')
      if (textEnd === 0) {
        // Comment: 
        if (/^<!--/.test(html)) {
          var commentEnd = html.indexOf('-->')
          if (commentEnd >= 0) {
            if (handler.comment) {
              handler.comment(html.substring(4, commentEnd))
            }
            html = html.substring(commentEnd + 3)
            prevTag = ''
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (/^<!\[/.test(html)) {
          var conditionalEnd = html.indexOf(']>')

          if (conditionalEnd >= 0) {
            if (handler.comment) {
              handler.comment(html.substring(2, conditionalEnd + 1), true /* non-standard */)
              html = html.substring(conditionalEnd + 2)
              prevTag = ''
              continue
            }
          }
        }

        // Doctype: 
        var doctypeMatch = html.match(doctype)
        if (doctypeMatch) {
          if (handler.doctype) {
            handler.doctype(doctypeMatch[0])
          }
          html = html.substring(doctypeMatch[0].length)
          prevTag = ''
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag)
        if (endTagMatch) {
          html = html.substring(endTagMatch[0].length)
          endTagMatch[0].replace(endTag, parseEndTag)
          prevTag = '/' + endTagMatch[1].toLowerCase()
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag(html)
        if (startTagMatch) {
          html = startTagMatch.rest
          handleStartTag(startTagMatch)
          prevTag = startTagMatch.tagName.toLowerCase()
          continue
        }

        function parseStartTag(input) {
          var start = input.match(startTagOpen)
          if (start) {
            var match = {
              tagName: start[1],
              attrs: []
            }
            input = input.slice(start[0].length)
            var end, attr
            while (!(end = input.match(startTagClose)) && (attr = input.match(attribute))) {
              input = input.slice(attr[0].length)
              match.attrs.push(attr)
            }
            if (end) {
              match.unarySlash = end[1]
              match.rest = input.slice(end[0].length)
              return match
            }
          }
        }

        function handleStartTag(match) {
          var tagName = match.tagName
          var unarySlash = match.unarySlash

          if (handler.html5 && lastTag === 'p' && nonPhrasing(tagName)) {
            parseEndTag('', lastTag)
          }

          if (!handler.html5) {
            while (lastTag && inline(lastTag)) {
              parseEndTag('', lastTag)
            }
          }


        }

        function parseEndTag(tag, tagName) {
          var pos

          // Find the closest opened tag of the same type
          if (tagName) {
            var needle = tagName.toLowerCase()
            for (pos = stack.length - 1; pos >= 0; pos--) {
              if (stack[pos].tag.toLowerCase() === needle) {
                break
              }
            }
          }
          // If no tag name is provided, clean shop
          else {
            pos = 0
          }

          if (pos >= 0) {
            // Close all the open elements, up the stack
            for (var i = stack.length - 1; i >= pos; i--) {
              if (handler.end) {
                handler.end(stack[i].tag, stack[i].attr, i > pos || !tag)
              }
            }

            // Remove the open elements from the stack
            stack.length = pos
            lastTag = pos && stack[pos - 1].tag
          }
          else if (tagName.toLowerCase() === 'br') {
            if (handler.start) {
              handler.start(tagName, [], true, '')
            }
          }
          else if (tagName.toLowerCase() === 'p') {
            if (handler.start) {
              handler.start(tagName, [], false, '', true)
            }
            if (handler.end) {
              handler.end(tagName, [])
            }
          }
        }
      }
    }
  }
}