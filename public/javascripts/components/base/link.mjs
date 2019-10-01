import { define, template } from '../lib.mjs';

const html = /*html*/ `
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
<a></a>
`;

class Link extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    const clone = template(html).content.cloneNode(true);
    this.shadow.appendChild(clone);
    this.link = this.shadow.querySelector('a');
  }

  static get observedAttributes() {
    return ['href', 'content'];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'content') {
      this.link.innerHTML = newVal;
    }
    this.link[attrName] = newVal;
  }
}

define('recipe-link', Link);
