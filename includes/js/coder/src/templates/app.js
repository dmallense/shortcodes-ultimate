export function app ({ searchShortcodes, closeDialog }) {
  return `
    <div class="su-coder-lightbox-bg su-coder-hidden"></div>
    <div class="su-coder-lightbox su-coder-hidden">
      <div class="su-coder-app">
        <div class="su-coder-header">
          <div class="su-coder-header-inner wp-ui-highlight">
            <input type="text" value="" placeholder="${searchShortcodes}" class="su-coder-search" />
            <button class="su-coder-close-btn" aria-label="${closeDialog}" title="${closeDialog}">
            <svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" aria-hidden="true"><path d="M2 30 L30 2 M30 30 L2 2" /></svg>
            </button>
          </div>
        </div>
        <div class="su-coder-main">
          <div class="su-coder-main-nav">
            <select class="su-coder-main-nav-groups-dropdown" aria-hidden="true"></select>
            <ul class="su-coder-main-nav-groups-list"></ul>
          </div>
          <div class="su-coder-main-shortcodes"></div>
        </div>
        <div class="su-coder-shortcode">
          <div class="su-coder-shortcode-settings"></div>
          <div class="su-coder-shortcode-preview"></div>
        </div>
      </div>
    </div>
  `
}
