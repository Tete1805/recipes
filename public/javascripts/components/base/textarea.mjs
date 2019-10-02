class RecipeTextarea extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.htmlAttributes = this.getHTMLAttributes();
    this.shadow.innerHTML = this.template();
  }
  template() {
    return /*html*/ `
    <style>
      textarea
       {
        box-sizing: border-box !important;
        border: none;
        border-bottom: 1px solid #ccc;
        color: #578;
        font-family: 'Handlee', cursive;
        font-size: 19px;
        font-weight: bold;
        margin-bottom: -10px;
        margin-right: 10px;
        margin-top: 5px;
        border-width: 1px;
        padding: 4px 8px;
        padding-bottom: 0px;
        width: 100%;
      }
    </style>
    <textarea ${this.getHTMLAttributes()} >`;
  }
  getHTMLAttributes() {
    return Array.from(this.attributes)
      .map(attribute => attribute.name + "='" + attribute.value + "'")
      .shift();
  }
}

customElements.define('recipe-textarea', RecipeTextarea);
