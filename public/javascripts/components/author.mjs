import './base/link.mjs';

class AuthorLink extends HTMLElement {
  constructor() {
    super();
    const { author } = this.attributes;
    const href = '/user/profile/' + author.value;
    this.innerHTML =
      /*html*/
      `<recipe-link content=${author.value} href=${href}></recipe-link>`;
  }
}

window.customElements.define('recipe-author-link', AuthorLink);
