import { LitElement, html } from '/lit-element.js';

class Link extends LitElement {
  static get properties() {
    return { href: { type: String }, content: { type: String } };
  }

  render() {
    return html`
      <style>
        a {
          color: #09d;
          position: relative;
          text-decoration: none;
          transition: color 0.2s;
        }
        a:hover {
          color: #7cf !important;
          transition: color 0.2s;
        }
        a:before {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #7cf;
          visibility: hidden;
          transform: scaleX(0);
          transition: all 0.3s;
        }
        a:hover:before {
          visibility: visible;
          transform: scaleX(1);
        }
      </style>
      <a href=${this.href}>${this.content}</a>
    `;
  }
}

customElements.define('recipe-link', Link);
