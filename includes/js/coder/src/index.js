/* global jQuery, SUCoderL10n, SUCoderSettings */

import { hide, show, remove, inArray, ajax, live } from './utils'
import * as templates from './templates'

const store = {
  el: {
    app: null,
    shortcodes: null,
    settings: []
  },
  data: {
    shortcodes: null,
    groups: null
  },
  timers: {
    dataLoading: null
  },
  MFPInstance: null
}

function init () {
  appendApp()
  bindEvents()
}

function appendApp () {
  document.body.insertAdjacentHTML('beforeend', templates.app(SUCoderL10n))

  store.el.app = document.querySelector('.su-coder-app')
}

function bindEvents () {
  live('click', store.el.app, '.su-coder-close-btn', closeBtnClick)

  live(
    'click',
    store.el.app,
    '.su-coder-shortcodes-group-shortcodes button',
    shortcodeClick
  )
}

function shortcodeClick (event, element) {
  openSettings(element.getAttribute('data-id'))
}

function closeBtnClick () {
  closePopup()
}

function isDataLoaded () {
  return !!store.data.shortcodes && !!store.data.groups
}

function appendDataLoading () {
  store.el.app.insertAdjacentHTML(
    'beforeend',
    templates.dataLoading(SUCoderL10n)
  )
}

function removeDataLoading () {
  clearTimeout(store.timers.dataLoading)

  const el = store.el.app.querySelector('.su-coder-data-loading')

  if (el) {
    el.parentNode.removeChild(el)
  }
}

function loadShortcodes () {
  if (isDataLoaded()) {
    return
  }

  store.timers.dataLoading = setTimeout(appendDataLoading, 2000)

  ajax(
    'POST',
    SUCoderSettings.ajaxUrl,
    { action: 'su_coder_get_shortcodes' },
    function (data) {
      store.data.shortcodes = JSON.parse(data)

      if (isDataLoaded()) {
        removeDataLoading()
        appendShortcodes()
      }
    }
  )

  ajax(
    'POST',
    SUCoderSettings.ajaxUrl,
    { action: 'su_coder_get_groups' },
    data => {
      store.data.groups = JSON.parse(data)

      if (isDataLoaded()) {
        removeDataLoading()
        appendShortcodes()
      }
    }
  )
}

function appendShortcodes () {
  store.el.shortcodes = document.querySelector('.su-coder-shortcodes')

  Array.prototype.forEach.call(store.data.groups, (group) => {
    store.el.shortcodes.insertAdjacentHTML('beforeend', templates.group(group))
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
      '.su-coder-app [data-group="' + group + '"]' +
      ' > .su-coder-shortcodes-group-shortcodes'
    )

    if (!groupContentEl) {
      return
    }

    groupContentEl.insertAdjacentHTML(
      'beforeend',
      templates.shortcode(shortcode)
    )
  })
}

function openPopup () {
  loadShortcodes()

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

function closePopup () {
  store.MFPInstance.close()
}

function openSettings (id) {
  const shortcode = getShortcode(id)

  hide(store.el.shortcodes)
}

function getShortcode (id) {
  return store.data.shortcodes.filter(shortcode => shortcode.id === id)[0]
}

function insertClassic (target = '', shortcode = '') {
  openPopup()
}

// Expose API
window.SUCoder = { init, insertClassic }

// Initialize Coder
document.addEventListener('DOMContentLoaded', window.SUCoder.init)
