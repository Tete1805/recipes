import '../author.mjs';

class Comment extends HTMLElement {
  constructor() {
    super();

    const { author, posted, message } = this.attributes;

    this.innerHTML = /*html*/ `
      <div style="margin-bottom: 8px">
        <span> posté par </span>
        <recipe-author-link author=${author.value} href=''></recipe-author-link>
        <span> &nbsp;le </span>
        <span id="posted">${posted.value}</span>
      </div>
      <div id="message">${message.value}</div>
      `;
  }
}

window.customElements.define('recipe-comment', Comment);
