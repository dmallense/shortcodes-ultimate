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
  el: {},
  data: {},
  timers: {}
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
  store.el.main = document.querySelector('.su-coder-main')
  store.el.groupsList = document.querySelector('.su-coder-main-nav-groups-list')
  store.el.groupsDropdown = document.querySelector('.su-coder-main-nav-groups-dropdown')
  store.el.shortcodes = document.querySelector('.su-coder-main-shortcodes')
  store.el.shortcode = document.querySelector('.su-coder-shortcode')
  store.el.settings = document.querySelector('.su-coder-shortcode-settings')
  store.el.preview = document.querySelector('.su-coder-shortcode-preview')
  store.el.search = document.querySelector('.su-coder-search')
}

function bindEvents () {
  on('click', store.el.app, '.su-coder-close-btn', onCloseBtnClick)

  on(
    'click',
    store.el.app,
    '.su-coder-main-shortcodes a',
    onShortcodeClick
  )

  on(
    'click',
    store.el.app,
    '.su-coder-main-nav-groups-list a',
    onGroupClick
  )

  on(
    'change',
    store.el.app,
    '.su-coder-main-nav-groups-dropdown',
    onGroupChange
  )

  on('keyup', document, null, onDocumentKeyup)
}

function onShortcodeClick (event, element) {
  openShortcode(element.getAttribute('data-id'))
}

function onGroupClick (event, element) {
  event.preventDefault()
  openGroup(element.getAttribute('data-group'))
}

function onGroupChange (event, element) {
  openGroup(element.options[element.selectedIndex].value)
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
  store.el.groupsList.insertAdjacentHTML('beforeend', templates.groupList({
    id: 'all',
    title: SUCoderL10n.allShortcodes,
    class: 'su-coder-main-nav-selected'
  }))
  store.el.groupsDropdown.insertAdjacentHTML('beforeend', templates.groupDropdown({
    id: 'all',
    title: SUCoderL10n.allShortcodes,
    selected: true
  }))

  forEach(store.data.groups, group => {
    store.el.groupsList.insertAdjacentHTML('beforeend', templates.groupList(group))
    store.el.groupsDropdown.insertAdjacentHTML('beforeend', templates.groupDropdown(group))

    forEach(store.data.shortcodes, shortcode => {
      if (shortcode.deprecated && SUCoderSettings.hideDeprecated) {
        return
      }

      shortcode.primaryGroup = shortcode.group.split(' ')[0]

      if (group.id !== shortcode.primaryGroup) {
        return
      }

      store.el.shortcodes.insertAdjacentHTML('beforeend', templates.shortcode(shortcode))
    })
  })
}

function openPopup () {
  loadShortcodes()

  show(store.el.main)
  hide(store.el.shortcode)

  document.body.classList.add('su-coder-lightbox-opened')

  show(store.el.lightboxBg)
  show(store.el.lightbox)

  store.el.search.focus()
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

  hide(store.el.main)
  show(store.el.shortcode)

  appendSettings(id)
}

function openGroup (id) {
  forEach(store.el.groupsList.querySelectorAll('a'), group => {
    if (id === group.getAttribute('data-group')) {
      group.classList.add('su-coder-main-nav-selected')
      return
    }

    group.classList.remove('su-coder-main-nav-selected')
  })

  forEach(store.el.groupsDropdown.querySelectorAll('option'), (group, groupIndex) => {
    if (id === group.value) {
      store.el.groupsDropdown.selectedIndex = groupIndex
    }
  })

  forEach(store.el.shortcodes.querySelectorAll('a'), shortcode => {
    if (id === 'all') {
      shortcode.classList.remove('su-coder-main-shortcodes-item-hidden')
      return
    }

    shortcode.classList.add('su-coder-main-shortcodes-item-hidden')

    if (id === shortcode.getAttribute('data-primary-group')) {
      shortcode.classList.remove('su-coder-main-shortcodes-item-hidden')
    }
  })
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

function insertClassicEditor (target = '', shortcode = '') {
  openPopup()
}

function insertBlockEditor (target = '', shortcode = '') {
  openPopup()
}

// Expose API
window.SUCoder = { init, insertClassicEditor, insertBlockEditor }

// Initialize Coder
document.addEventListener('DOMContentLoaded', window.SUCoder.init)

// TODO: remove (1) [!]
document.addEventListener('DOMContentLoaded', window.SUCoder.insertClassicEditor)
