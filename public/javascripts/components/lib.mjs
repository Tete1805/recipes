export function define(...args) {
  if (window.customElements.get(name) === undefined)
    window.customElements.define(...args);
}

export function template(innerHTML) {
  const template = document.createElement('template');
  template.innerHTML = innerHTML;
  return template;
}

export function createCustomElement(name, attributes = []) {
  const element = document.createElement(name, { is: name });

  attributes.forEach(attribute => {
    element.setAttribute(attribute.name, attribute.value);
  });
  return element;
}
