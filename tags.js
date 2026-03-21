export function html(strings, ...values) {
  return strings.reduce((result, string, i) => result + string + (values[i] || ''), '');
}

export function css(strings, ...values) {
  return strings.reduce((result, string, i) => result + string + (values[i] || ''), '');
}
