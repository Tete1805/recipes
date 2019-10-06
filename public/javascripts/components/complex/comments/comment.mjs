import '../../simple/author.mjs';
import '../../simple/date.mjs';
import { LitElement, html } from '/lit-element.js';

class RecipeComment extends LitElement {
  constructor() {
    super();
    this.comment = '';
  }

  static get properties() {
    return { comment: { type: Object } };
  }

  render() {
    const { auteur, ajoute, corps } = this.comment;
    return html`
      <div style="margin-bottom: 8px">
        <span> posté par </span>
        <recipe-author-link author=${auteur}></recipe-author-link>
        <span> &nbsp;le </span>
        <recipe-date initial=${ajoute} format="DateTime"></recipe-date>
      </div>
      <div id="message">${corps}</div>
    `;
  }
}

customElements.define('recipe-comment', RecipeComment);
