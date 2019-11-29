import { getIcon } from '../_utils'

export function shortcode (args) {
  return `
    <a href="javascript:;" data-id="${args.id}" data-primary-group="${args.primaryGroup}" title="${args.desc}">
      ${getIcon(args.icon)}
      <span>${args.name}</span>
    </a>
  `
}
