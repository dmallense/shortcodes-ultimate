/* global jQuery, XMLHttpRequest, SUCoderL10n, SUCoderAjaxURL */

const store = {
  el: {
    app: null,
    shortcodes: null
  },
  state: {
    popupReady: false
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

  bindEvents()
}

const bindEvents = function () {}

const buildPopup = function () {
  if (store.state.popupReady) {
    return
  }

  const html = `
      <div class="su-coder-header wp-ui-highlight">
        <input type="text" value="" placeholder="${SUCoderL10n.searchShortcodes}" />
        <button class="su-coder-close-btn" aria-label="${SUCoderL10n.closeDialog}" title="${SUCoderL10n.closeDialog}">
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" aria-hidden="true"><path d="M2 30 L30 2 M30 30 L2 2" /></svg>
        </button>
      </div>
      <div class="su-coder-shortcodes"></div>
    `

  store.el.app.insertAdjacentHTML('beforeend', html)

  fetchJSON(
    'POST',
    { action: 'su_coder_get_shortcodes' },
    function (data) {
      store.data.shortcodes = JSON.parse(data)
      buildShortcodes()
    }
  )

  fetchJSON(
    'POST',
    { action: 'su_coder_get_groups' },
    data => {
      store.data.groups = JSON.parse(data)
      buildShortcodes()
    }
  )

  store.state.popupReady = true
}

const buildShortcodes = function () {
  if (!store.data.shortcodes || !store.data.groups) {
    return
  }

  store.el.shortcodes = document.querySelector('.su-coder-shortcodes')

  const groups = store.data.groups.map(group => group.id)

  Array.prototype.forEach.call(store.data.shortcodes, (shortcode, index) => {
    const group = shortcode.group.split(' ')[0]

    if (!groups[group]) {
      return
    }

    console.log(group)

    // store.el.shortcodes.insertAdjacentHTML(
    //   'beforeend',
    //   `<button>${shortcode.name}</button>`
    // )
  })

  Array.prototype.forEach.call(store.data.groups, (group, groupIndex) => {
    // store.el.shortcodes.insertAdjacentHTML(
    //   'beforeend',
    //   `<div class="su-coder-shortcodes-group">${group.title}</div>`
    // )
  })
}

const openPopup = function () {
  buildPopup()

  jQuery.magnificPopup.open({
    type: 'inline',
    alignTop: true,
    closeOnBgClick: false,
    mainClass: 'su-coder-mfp',
    items: {
      src: '.su-coder-app'
    },
    callbacks: {}
  })
}

const fetchJSON = function (method, params, callback) {
  const request = new XMLHttpRequest()

  request.open(method, SUCoderAjaxURL, true)

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

const serializeObj = function (obj) {
  return Object.keys(obj)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
    .join('&')
}

const insertClassic = function (target = '', shortcode = '') {
  openPopup()
}

// Expose API
window.SUCoder = { init, insertClassic }

// Initialize Coder
document.addEventListener('DOMContentLoaded', window.SUCoder.init)
