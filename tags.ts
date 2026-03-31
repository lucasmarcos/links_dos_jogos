type TemplateValue = string | number | boolean | null | undefined;

function renderTemplate(
  strings: TemplateStringsArray,
  values: TemplateValue[],
): string {
  return strings.reduce(
    (result, string, i) => result + string + (values[i] ?? ""),
    "",
  );
}

export function html(
  strings: TemplateStringsArray,
  ...values: TemplateValue[]
): string {
  return renderTemplate(strings, values);
}

export function css(
  strings: TemplateStringsArray,
  ...values: TemplateValue[]
): string {
  return renderTemplate(strings, values);
}
