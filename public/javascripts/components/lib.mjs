export function define(name, constructor) {
  if (window.customElements.get(name) === undefined)
    window.customElements.define(name, constructor);
}

export function template(innerHTML) {
  const template = document.createElement('template');
  template.innerHTML = innerHTML;
}

export function createCustomElement(name, attributes = []) {
  const element = document.createElement(name, { is: name });

  attributes.forEach(attribute => {
    element.setAttribute(attribute.name, attribute.value);
  });
  return element;
}
