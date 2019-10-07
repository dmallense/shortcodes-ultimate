/* global jQuery, XMLHttpRequest, SUCoderL10n, SUCoderAjaxURL */

const store = {
  el: {
    app: null,
    search: null,
    closeBtn: null,
    shortcodes: null,
    breadcrumbs: null,
    settings: null,
    preview: null
  },
  data: {
    shortcodes: null,
    groups: null
  }
}

const init = function () {
  store.el.app = document.querySelector('.su-coder-app')

  if (!store.el.app) {
    return
  }

  appendHeader()
  appendShortcodes()
}

const appendHeader = function () {
  var html = `
      <div class="su-coder-header wp-ui-highlight">
        <input type="text" value="" placeholder="${SUCoderL10n.searchShortcodes}" />
        <button class="su-coder-close-btn" aria-label="${SUCoderL10n.closeDialog}" title="${SUCoderL10n.closeDialog}">
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" aria-hidden="true"><path d="M2 30 L30 2 M30 30 L2 2" /></svg>
        </button>
      </div>
    `

  store.el.app.insertAdjacentHTML('afterbegin', html)
}

const appendShortcodes = function () {
  var html = '<div class="su-coder-shortcodes"></div>'

  store.el.app.insertAdjacentHTML('beforeend', html)
}

const openPopup = function () {
  const MFPOptions = {
    type: 'inline',
    alignTop: true,
    closeOnBgClick: false,
    mainClass: 'su-coder-mfp',
    items: {
      src: '.su-coder-app'
    },
    callbacks: {}
  }

  jQuery.magnificPopup.open(MFPOptions)
}

const fetchJSON = function (method, url, params, callback) {
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

  request.send(serializeObj(params))
}

const fetchShortcodes = function () {
  fetchJSON(
    'GET',
    SUCoderAjaxURL,
    { action: 'su_coder_get_shortcodes' },
    data => {
      store.data.shortcodes = JSON.parse(data)
      console.log(store.data.shortcodes)
    }
  )
}

const serializeObj = function (obj) {
  return Object.keys(obj)
    .map(
      key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
    )
    .join('&')
}

const insertClassic = function (target = '', shortcode = '') {
  openPopup()
}

// Expose API
window.SUCoder = { init, insertClassic }

// Initialize Coder
document.addEventListener('DOMContentLoaded', window.SUCoder.init)
