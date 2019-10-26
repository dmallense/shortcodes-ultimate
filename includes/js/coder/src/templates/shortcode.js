import { getIcon } from '../utils'

export function shortcode (args) {
  return `
    <a href="javascript:;" data-id="${args.id}" title="${args.desc}">
      ${getIcon(args.icon)}
      <span>${args.name}</span>
    </a>
  `
}
