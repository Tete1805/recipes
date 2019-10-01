import { define } from '../../lib.mjs';
import './comment.mjs';

const template = document.createElement('template');
template.innerHTML = /*html*/ `
  <style>
    ul {
      list-style: none;
      padding: 0;
    }
    ul > li {
      border: 1px solid #ddd;
      border-radius: 5px;
      margin: 5px;
      padding: 10px;
    }
  </style>
  <h3>Commentaires&nbsp;:</h3>
  <div id="content">Soyez le premier à commenter cette recette !</div>
`;

class CommentList extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    const clone = template.content.cloneNode(true);
    this.shadow.appendChild(clone);
  }

  render() {
    if (this.comments.length === 0) {
      this.innerHTML = template.innerHTML;
    } else {
      const content = this.shadow.querySelector('#content');
      const lis = this.comments
        .map(
          comment => /*html*/ `
            <li>
              <recipe-comment
                comment=${JSON.stringify(comment)}>
              </recipe-comment>
            </li>`
        )
        .join('');
      content.innerHTML = ['<ul>', lis, '</ul>'].join('');
    }
  }

  static get observedAttributes() {
    return ['comments'];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.comments = JSON.parse(newVal);
    this.render();
  }
}

define('recipe-comment-list', CommentList);
