class RecipeInput extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.htmlAttributes = this.getHTMLAttributes();
    this.shadow.innerHTML = this.template();
  }
  template() {
    return /*html*/ `
    <style>
      input {
        box-sizing: border-box !important;
        border: none;
        border-bottom: 1px solid #ccc;
        color: #578;
        font-family: 'Handlee', cursive;
        font-size: 19px;
        font-weight: bold;
        margin-right: 10px;
        padding: 4px 8px;
        padding-bottom: 0px;
        width: 100%;
      }
    </style>
    <input ${this.getHTMLAttributes()} />`;
  }
  getHTMLAttributes() {
    return Array.from(this.attributes)
      .filter(attribute => attribute.name !== 'appearance')
      .map(attribute => attribute.name + "='" + attribute.value + "'")
      .shift();
  }
}

customElements.define('recipe-input', RecipeInput);
