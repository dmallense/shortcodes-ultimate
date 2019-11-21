/* global XMLHttpRequest */

export function inArray (needle, haystack) {
  var length = haystack.length
  for (var i = 0; i < length; i++) {
    if (haystack[i] === needle) {
      return true
    }
  }
  return false
}

export function ajax (method, url, params, callback) {
  const request = new XMLHttpRequest()

  request.open(method, url, true)

  request.setRequestHeader(
    'Content-type',
    'application/x-www-form-urlencoded'
  )

  request.onload = function () {
    if (this.status !== 200) {
      return
    }

    callback(this.responseText)
  }

  request.send(serializeObj(params))
}

export function serializeObj (obj) {
  return Object.keys(obj)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
    .join('&')
}

export function on (eventTypes, parentElement, elementSelector, callback) {
  forEach(eventTypes.split(' '), eventType => {
    parentElement.addEventListener(eventType, event => {
      if (!elementSelector) {
        callback(event)
        return
      }

      const closestEl = closest(event.target, elementSelector)

      if (closestEl) {
        callback(event, closestEl)
      }
    })
  })
}

export function matches (element, selector) {
  const elements = (element.document || element.ownerDocument).querySelectorAll(selector)
  let index = 0

  while (elements[index] && elements[index] !== element) {
    ++index
  }

  return Boolean(elements[index])
}

export function closest (element, selector) {
  while (element && element.nodeType === 1) {
    if (matches(element, selector)) {
      return element
    }

    element = element.parentNode
  }

  return null
}

export function remove (element) {
  element.parentNode.removeChild(element)
}

export function hide (element) {
  element.classList.add('su-coder-hidden')
}

export function show (element) {
  element.classList.remove('su-coder-hidden')
}

export function forEach (items, callback) {
  return Array.prototype.forEach.call(items, callback)
}

export function getIcon (value) {
  if (typeof value !== 'string') {
    return ''
  }

  if (value.indexOf('/') > -1) {
    return `<img src="${value}" aria-hidden="true">`
  }

  return `<i class="sui sui-${value}" aria-hidden="true"></i>`
}
