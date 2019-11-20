export function group (args) {
  return `<a href="javascript:;" data-group="${args.id}" ${args.class ? ' class="' + args.class + '"' : ''}>${args.title}</a>`
}
