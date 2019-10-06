import '../../simple/author.mjs';
import '../../simple/date.mjs';

class RecipeComment extends HTMLElement {
  constructor() {
    super();
  }

  render() {
    const { auteur, ajoute, corps } = this.comment;
    this.innerHTML = /*html*/ `
      <div style="margin-bottom: 8px">
        <span> posté par </span>
        <recipe-author-link author=${auteur} href=''></recipe-author-link>
        <span> &nbsp;le </span>
        <recipe-date initial=${ajoute} format='DateTime'></recipe-date>
      </div>
      <div id="message">${corps}</div>
      `;
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.comment = JSON.parse(decodeURI(newVal));
    this.render();
  }

  static get observedAttributes() {
    return ['comment'];
  }
}

customElements.define('recipe-comment', RecipeComment);
