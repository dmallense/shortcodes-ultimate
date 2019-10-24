export function shortcode (args) {
  return `
    <a href="javascript:;" data-id="${args.id}" title="${args.desc}">
      <img src="${args.image}" alt="${args.name}" />
      <span>${args.name}</span>
    </a>
  `
}
