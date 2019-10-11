export function shortcode (args) {
  return `<button data-id="${args.id}" title="${args.desc}">${args.name}</button>`
}
