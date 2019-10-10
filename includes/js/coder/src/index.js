/* global jQuery, SUCoderL10n, SUCoderSettings */

import { inArray, ajax, live } from './utils'
import {
  templatePopup,
  templateShortcode,
  templateLoading,
  templateGroup
} from './templates/popup'

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
  timers: {
    popupLoading: null
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

  console.log(shortcode)
}

const buildPopup = function () {
  if (store.state.popupReady) {
    return
  }

  store.el.app.insertAdjacentHTML('beforeend', templatePopup({
    searchShortcodes: SUCoderL10n.searchShortcodes,
    closeDialog: SUCoderL10n.closeDialog
  }))

  store.timers.popupLoading = setTimeout(addPopupLoading, 1000)

  ajax(
    'POST',
    SUCoderSettings.ajaxUrl,
    { action: 'su_coder_get_shortcodes' },
    function (data) {
      store.data.shortcodes = JSON.parse(data)

      if (isPopupDataLoaded()) {
        removePopupLoading()
        buildShortcodes()
      }
    }
  )

  ajax(
    'POST',
    SUCoderSettings.ajaxUrl,
    { action: 'su_coder_get_groups' },
    data => {
      store.data.groups = JSON.parse(data)

      if (isPopupDataLoaded()) {
        removePopupLoading()
        buildShortcodes()
      }
    }
  )

  store.state.popupReady = true
}

const isPopupDataLoaded = function () {
  return !!store.data.shortcodes && !!store.data.groups
}

const addPopupLoading = function () {
  store.el.app.insertAdjacentHTML('beforeend', templateLoading({
    loadingPleaseWait: SUCoderL10n.loadingPleaseWait
  }))
}

const removePopupLoading = function () {
  clearTimeout(store.timers.popupLoading)

  const el = store.el.app.querySelector('.su-coder-popup-loading')

  if (el) {
    el.parentNode.removeChild(el)
  }
}

const buildShortcodes = function () {
  store.el.shortcodes = document.querySelector('.su-coder-shortcodes')

  Array.prototype.forEach.call(store.data.groups, (group) => {
    store.el.shortcodes.insertAdjacentHTML('beforeend', templateGroup(group))
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

    groupContentEl.insertAdjacentHTML('beforeend', templateShortcode(shortcode))
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
