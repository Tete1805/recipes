class RecipeButton extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.htmlAttributes = this.getHTMLAttributes();
    this.shadow.innerHTML = /*html*/ `
    <style>
      button {
        border: none;
        color: white;
        cursor: pointer;
        font-family: 'Handlee', cursive;
        font-size: 1.3em;
        font-weight: bold;
        margin-top: 25px;
        padding: 10px 20px;
        width: 100%;
      }
      button[type="submit"] {background-color: #6d6;}
      button[type="submit"]:hover {
        background-color: #4d4;
        color: white;
      }
      .pushable {        
        box-shadow: 2px 2px 3px #bba687;
        transition: all 0.2s;
      }
      
      .pushable:hover {
        background-color: #ffd080;
        transition: all 0.2s;
      }
      
      .pushable:active {
        background-color: #ffd38a;
        transform: translate(2px, 2px);
        box-shadow: none !important;
        transition: all 0.2s;
      }
    </style>
    <button ${this.getHTMLAttributes()}>${this.innerText}</button>`;
  }
  getHTMLAttributes() {
    return Array.from(this.attributes)
      .map(attribute => attribute.name + "='" + attribute.value + "'")
      .join(' ');
  }
}

customElements.define('recipe-button', RecipeButton);
