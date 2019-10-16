export function group (args) {
  return `
    <div class="su-coder-group" data-group="${args.id}">
      <div class="su-coder-group-title">${args.title}</div>
      <div class="su-coder-group-content"></div>
    </div>
  `
}
