export function templatePopup (args) {
  return `
    <div class="su-coder-header wp-ui-highlight">
      <input type="text" value="" placeholder="${args.searchShortcodes}" />
      <button class="su-coder-close-btn" aria-label="${args.closeDialog}" title="${args.closeDialog}">
      <svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" aria-hidden="true"><path d="M2 30 L30 2 M30 30 L2 2" /></svg>
      </button>
    </div>
    <div class="su-coder-shortcodes"></div>
  `
}

export function templateShortcode (args) {
  return `<button data-id="${args.id}" title="${args.desc}">${args.name}</button>`
}

export function templateLoading (args) {
  return `<div class="su-coder-popup-loading">${args.loadingPleaseWait}&hellip;</div>`
}

export function templateGroup (args) {
  return `
    <div class="su-coder-shortcodes-group" data-group="${args.id}">
      <div class="su-coder-shortcodes-group-title">${args.title}</div>
      <div class="su-coder-shortcodes-group-shortcodes"></div>
    </div>
  `
}
