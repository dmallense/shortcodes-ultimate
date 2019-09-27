/* global jQuery, XMLHttpRequest, SUCoderL10n, SUCoderAjaxURL */

window.SUCoder = window.SUCoder || {}

window.SUCoder.App = (() => {
  var self = {}

  self.el = {
    app: null,
    search: null,
    closeBtn: null,
    shortcodes: null,
    breadcrumbs: null,
    settings: null,
    preview: null
  }

  self.MFPOptions = null

  self.shortcodes = null

  self.state = {
    shortcodesAdded: false
  }

  self.init = function () {
    self.el.app = document.querySelectorAll('.su-coder-app')[0]

    if (!self.el.app) {
      return
    }

    self.addHeader()
    self.addShortcodes()
  }

  self.addHeader = function () {
    var html = `
      <div class="su-coder-header wp-ui-highlight">
        <input type="text" value="" placeholder="${SUCoderL10n.searchShortcodes}" />
        <button class="su-coder-close-btn" aria-label="${SUCoderL10n.closeDialog}" title="${SUCoderL10n.closeDialog}">
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" aria-hidden="true"><path d="M2 30 L30 2 M30 30 L2 2" /></svg>
        </button>
      </div>
    `

    self.el.app.insertAdjacentHTML('afterbegin', html)
  }

  self.addShortcodes = function () {
    var html = '<div class="su-coder-shortcodes"></div>'

    self.el.app.insertAdjacentHTML('beforeend', html)
  }

  self.loadShortcodes = function () {
    if (!self.shortcodes) {
    }

    return self.shortcodes
  }

  self.openPopup = function () {
    if (!self.shortcodes) {
      self.fetchShortcodes()
    }

    self.MFPOptions = {
      type: 'inline',
      alignTop: true,
      closeOnBgClick: false,
      mainClass: 'su-coder-mfp',
      items: {
        src: '.su-coder-app'
      },
      callbacks: {}
    }

    jQuery.magnificPopup.open(self.MFPOptions)
  }

  self.insertClassic = function (target = '', shortcode = '') {
    self.openPopup()
  }

  self.fetch = function (method, url, params, callback) {
    var request = new XMLHttpRequest()

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

    request.send(self.serialize(params))
  }

  self.fetchShortcodes = function () {
    self.fetch(
      'POST',
      SUCoderAjaxURL,
      { action: 'su_coder_get_shortcodes' },
      data => {
        self.shortcodes = JSON.parse(data)
        console.log(self.shortcodes)
      }
    )
  }

  self.serialize = function (obj) {
    return Object.keys(obj)
      .map(
        key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
      )
      .join('&')
  }

  return {
    init: self.init,
    insertClassic: self.insertClassic
  }
})()

document.addEventListener('DOMContentLoaded', window.SUCoder.App.init)
