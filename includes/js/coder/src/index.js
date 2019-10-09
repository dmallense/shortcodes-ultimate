/* global jQuery, SUCoderL10n, SUCoderAjaxURL */

import { inArray, fetchJSON } from './utils'

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
    SUCoderAjaxURL,
    { action: 'su_coder_get_shortcodes' },
    function (data) {
      store.data.shortcodes = JSON.parse(data)
      buildShortcodes()
    }
  )

  fetchJSON(
    'POST',
    SUCoderAjaxURL,
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

  Array.prototype.forEach.call(store.data.groups, (group) => {
    store.el.shortcodes.insertAdjacentHTML(
      'beforeend',
      `<div class="su-coder-shortcodes-group" data-group="${group.id}">
        <div class="su-coder-shortcodes-group-title">${group.title}</div>
        <div class="su-coder-shortcodes-group-shortcodes"></div>
      </div>`
    )
  })

  const groupIds = store.data.groups.map(group => group.id)

  Array.prototype.forEach.call(store.data.shortcodes, (shortcode) => {
    let group = shortcode.group.split(' ')[0]

    if (!inArray(group, groupIds)) {
      group = 'other'
    }

    const groupShortcodes = document.querySelector('.su-coder-shortcodes-group[data-group="' + group + '"] .su-coder-shortcodes-group-shortcodes')

    if (!groupShortcodes) {
      return
    }

    groupShortcodes.insertAdjacentHTML(
      'beforeend',
      `<button>${shortcode.name}</button>`
    )
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

const insertClassic = function (target = '', shortcode = '') {
  openPopup()
}

// Expose API
window.SUCoder = { init, insertClassic }

// Initialize Coder
document.addEventListener('DOMContentLoaded', window.SUCoder.init)
