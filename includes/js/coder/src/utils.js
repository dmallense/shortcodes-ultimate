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

export function live (eventType, parentElement, elementSelector, callback) {
  parentElement.addEventListener(eventType, event => {
    const closestEl = closest(event.target, elementSelector)

    if (closestEl) {
      callback(event, closestEl)
    }
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
