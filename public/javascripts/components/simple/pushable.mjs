import { LitElement, html } from '/lit-element.js';

class RecettePushable extends LitElement {
  render() {
    return html`
      <style>
        :host {
          background-color: transparent;
          border: none;
          cursor: pointer;
          box-shadow: 2px 2px 3px #bfbfbf;
          transition: all 0.2s;
        }
        :host(:active) {
          transform: translate(2px, 2px);
          box-shadow: none !important;
          transition: all 0.2s;
        }
      </style>
      <slot></slot>
    `;
  }
}

customElements.define('recette-pushable', RecettePushable);
