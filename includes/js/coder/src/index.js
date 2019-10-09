/* global jQuery, SUCoderL10n, SUCoderSettings */

import { inArray, ajax, live } from './utils'

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
  },
  MFPInstance: null
}

const init = function () {
  store.el.app = document.querySelector('.su-coder-app')

  if (!store.el.app) {
    return
  }

  bindEvents()
}

const bindEvents = function () {
  live('click', store.el.app, '.su-coder-close-btn', closePopup)
  live('click', store.el.app, '.su-coder-shortcodes-group-shortcodes button', shortcodeClick)
}

const shortcodeClick = function (event, element) {
  const id = element.getAttribute('data-id')
  const shortcode = getShortcode(id)

  alert(shortcode.name + "\n" + shortcode.desc)
}

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

  ajax(
    'POST',
    SUCoderSettings.ajaxUrl,
    { action: 'su_coder_get_shortcodes' },
    function (data) {
      store.data.shortcodes = JSON.parse(data)
      buildShortcodes()
    }
  )

  ajax(
    'POST',
    SUCoderSettings.ajaxUrl,
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
    if (shortcode.deprecated && SUCoderSettings.hideDeprecated) {
      return
    }

    let group = shortcode.group.split(' ')[0]

    if (!inArray(group, groupIds)) {
      group = 'other'
    }

    const groupContentEl = document.querySelector(
      '.su-coder-app [data-group="' + group + '"] .su-coder-shortcodes-group-shortcodes'
    )

    if (!groupContentEl) {
      return
    }

    groupContentEl.insertAdjacentHTML(
      'beforeend',
      // `<button data-id="${shortcode.id}" title="${shortcode.desc}">${shortcode.name}</button>`
      `<button data-id="${shortcode.id}" title="${shortcode.desc}"><span><strong>${shortcode.id}</strong><em>${shortcode.name}</em></span></button>`
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

  store.MFPInstance = jQuery.magnificPopup.instance
}

const closePopup = function () {
  store.MFPInstance.close()
}

const getShortcode = function (id) {
  return store.data.shortcodes.filter(shortcode => shortcode.id === id)[0]
}

const insertClassic = function (target = '', shortcode = '') {
  openPopup()
}

// Expose API
window.SUCoder = { init, insertClassic }

// Initialize Coder
document.addEventListener('DOMContentLoaded', window.SUCoder.init)
