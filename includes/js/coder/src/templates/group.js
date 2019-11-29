export function groupList (args) {
  return `<a href="javascript:;" data-group="${args.id}" ${args.class ? ' class="' + args.class + '"' : ''}>${args.title}</a>`
}

export function groupDropdown (args) {
  return `<option value="${args.id}" ${args.selected ? ' selected' : ''}>${args.title}</option>`
}
