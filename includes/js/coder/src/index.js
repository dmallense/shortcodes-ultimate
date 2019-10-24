/* global SUCoderL10n, SUCoderSettings */

import * as templates from './templates'
import {
  hide,
  show,
  remove,
  forEach,
  ajax,
  on
} from './utils'

const store = {
  el: {
    app: null,
    lightboxBg: null,
    lightbox: null,
    shortcodes: null,
    shortcode: null,
    settings: null,
    preview: null
  },
  data: {
    shortcodes: null,
    groups: null
  },
  timers: {
    dataLoading: null
  }
}

function init () {
  appendApp()
  bindEvents()
}

function appendApp () {
  document.body.insertAdjacentHTML('beforeend', templates.app(SUCoderL10n))

  store.el.app = document.querySelector('.su-coder-app')
  store.el.lightboxBg = document.querySelector('.su-coder-lightbox-bg')
  store.el.lightbox = document.querySelector('.su-coder-lightbox')
  store.el.shortcodes = document.querySelector('.su-coder-shortcodes')
  store.el.shortcode = document.querySelector('.su-coder-shortcode')
  store.el.settings = document.querySelector('.su-coder-settings')
  store.el.preview = document.querySelector('.su-coder-preview')
}

function bindEvents () {
  on('click', store.el.app, '.su-coder-close-btn', onCloseBtnClick)

  on(
    'click',
    store.el.app,
    '.su-coder-shortcodes button',
    onShortcodeClick
  )

  on('keyup', document, null, onDocumentKeyup)
}

function onShortcodeClick (event, element) {
  openShortcode(element.getAttribute('data-id'))
}

function onCloseBtnClick () {
  closePopup()
}

function onDocumentKeyup (event) {
  if (event.keyCode && event.keyCode === 27) {
    closePopup()
  }
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
    forEach(store.data.shortcodes, shortcode => {
      if (shortcode.deprecated && SUCoderSettings.hideDeprecated) {
        return
      }

      if (group.id !== shortcode.group.split(' ')[0]) {
        return
      }

      console.log(shortcode)

      store.el.shortcodes.insertAdjacentHTML('beforeend', templates.shortcode(shortcode))
    })
  })
}

function openPopup () {
  loadShortcodes()

  show(store.el.shortcodes)
  hide(store.el.shortcode)

  document.body.classList.add('su-coder-lightbox-opened')

  show(store.el.lightboxBg)
  show(store.el.lightbox)
}

function closePopup () {
  show(store.el.shortcodes)
  hide(store.el.shortcode)

  document.body.classList.remove('su-coder-lightbox-opened')

  hide(store.el.lightboxBg)
  hide(store.el.lightbox)
}

function openShortcode (id) {
  store.el.settings.innerHTML = ''
  store.el.preview.innerHTML = ''

  hide(store.el.shortcodes)
  show(store.el.shortcode)

  appendSettings(id)
}

function appendSettings (id) {
  const shortcode = getShortcode(id)

  for (const optionId in shortcode.atts) {
    const { name, desc } = shortcode.atts[optionId]

    store.el.settings.insertAdjacentHTML('beforeend', `<em>${name}</em><br><p>${desc}</p><hr>`)
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

// TODO: remove (1) [!]
document.addEventListener('DOMContentLoaded', window.SUCoder.insertClassic)
