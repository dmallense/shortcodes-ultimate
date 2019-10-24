export function shortcode (args) {
  return `
    <button data-id="${args.id}" title="${args.desc}">
      <img src="${args.image}" alt="${args.name}" />
      <span>${args.name}</span>
    </button>
  `
}
