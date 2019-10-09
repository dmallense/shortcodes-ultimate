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
