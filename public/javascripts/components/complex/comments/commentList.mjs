import './comment.mjs';
import { LitElement, html } from '/lit-element.js';

class CommentList extends LitElement {
  constructor() {
    super();
    this.comments = [];
  }

  render() {
    return html`
      <style>
        :host ul {
          list-style: none;
          padding: 0;
        }
        :host ul > li {
          border: 1px solid #ddd;
          border-radius: 5px;
          margin: 5px 0;
          padding: 10px;
        }
        :host #content {
          margin-bottom: 20px;
        }
      </style>
      <h3>Commentaires&nbsp;:</h3>
      <div id="content">
        ${this.comments.length === 0
          ? html`
              Soyez le premier à commenter cette recette !
            `
          : html`
              <ul>
                ${this.comments.map(
                  comment => html`
                    <li>
                      <recipe-comment .comment=${comment}> </recipe-comment>
                    </li>
                  `
                )}
              </ul>
            `}
      </div>
    `;
  }

  static get properties() {
    return { comments: { type: Array } };
  }
}

customElements.define('recipe-comment-list', CommentList);
