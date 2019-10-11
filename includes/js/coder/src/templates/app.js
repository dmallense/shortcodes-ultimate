export function app (args) {
  return `
    <div style="display:none">
      <div class="su-coder-app">
        <div class="su-coder-header">
          <div class="su-coder-header-inner wp-ui-highlight">
            <input type="text" value="" placeholder="${args.searchShortcodes}" />
            <button class="su-coder-close-btn" aria-label="${args.closeDialog}" title="${args.closeDialog}">
            <svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" aria-hidden="true"><path d="M2 30 L30 2 M30 30 L2 2" /></svg>
            </button>
          </div>
        </div>
        <div class="su-coder-shortcodes"></div>
        <div class="su-coder-settings"></div>
      </div>
    </div>
  `
}
