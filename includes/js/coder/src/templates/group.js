export function group (args) {
  return `
    <div class="su-coder-shortcodes-group" data-group="${args.id}">
      <div class="su-coder-shortcodes-group-title">${args.title}</div>
      <div class="su-coder-shortcodes-group-shortcodes"></div>
    </div>
  `
}
