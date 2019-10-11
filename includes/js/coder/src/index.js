/* global jQuery, SUCoderL10n, SUCoderSettings */

import * as templates from './templates'
import {
  hide,
  show,
  remove,
  inArray,
  forEach,
  ajax,
  on
} from './utils'

const store = {
  el: {
    app: null,
    shortcodes: null,
    settings: null
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
  store.el.shortcodes = document.querySelector('.su-coder-shortcodes')
  store.el.settings = document.querySelector('.su-coder-settings')
}

function bindEvents () {
  on('click', store.el.app, '.su-coder-close-btn', closeBtnClick)

  on(
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
    remove(el)
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
  forEach(store.data.groups, group => {
    store.el.shortcodes.insertAdjacentHTML('beforeend', templates.group(group))
  })

  const groupIds = store.data.groups.map(group => group.id)

  forEach(store.data.shortcodes, shortcode => {
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
    callbacks: {
      close: function () {
        hide(store.el.settings)
        show(store.el.shortcodes)
      }
    }
  })

  store.MFPInstance = jQuery.magnificPopup.instance
}

function closePopup () {
  store.MFPInstance.close()
}

function openSettings (id) {
  store.el.settings.innerHTML = ''

  hide(store.el.shortcodes)
  show(store.el.settings)

  appendSettings(id)
}

function appendSettings (id) {
  const shortcode = getShortcode(id)

  for (const optionId in shortcode.atts) {
    store.el.settings.insertAdjacentHTML('beforeend', `<em>${shortcode.atts[optionId].name}</em><hr>`)
  }
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
