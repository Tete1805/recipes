import '../base/link.mjs';
import { LitElement, html } from '/lit-element.js';

class AuthorLink extends LitElement {
  static get properties() {
    return { author: { type: String } };
  }

  render() {
    return html`
      <recipe-link
        content=${this.author}
        href=${'/profile/' + this.author}
      ></recipe-link>
    `;
  }
}

customElements.define('recipe-author-link', AuthorLink);
