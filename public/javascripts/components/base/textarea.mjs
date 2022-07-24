import { LitElement, html } from '/lit-element.js';

class RecipeTextarea extends LitElement {
  static get properties() {
    return {
      placeholder: String,
      rows: String,
    };
  }
  constructor(props) {
    super();
    this.value = '';
    console.log(props);
  }
  render() {
    return html`
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
    <textarea appearance="textarea" placeholder="${this.placeholder}" rows=${this.rows} @input="${this.onChange}">`;
  }
  onChange(event) {
    this.value = event.currentTarget.value;
  }
}

customElements.define('recipe-textarea', RecipeTextarea);
