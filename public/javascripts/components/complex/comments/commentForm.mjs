import '../../base/textarea.mjs';
import '../../base/button.mjs';

import { LitElement, html } from '/lit-element.js';

class CommentForm extends LitElement {
  static get properties() {
    return {
      comment: String,
      csrfToken: String,
      id: String,
    };
  }
  render() {
    return html`
      <form method="POST">
        <label for="comment">Votre commentaire</label>
        <recipe-textarea
          placeholder="Super recette !"
          rows="4"
          @input="${this.onCommentChange}"
        ></recipe-textarea>
        <recipe-button class="pushable" type="submit" @click="${this.onSubmit}"
          >Poster</recipe-button
        >
        <input type="hidden" name="_csrf" value=${this.csrfToken} />
      </form>
    `;
  }
  onCommentChange(event) {
    this.comment = event.currentTarget.value;
  }
  onSubmit(event) {
    if (!this.comment) {
      event.preventDefault();
      alert('Vous devez saisir un commentaire');
      return;
    }
    console.log(this.id);
    fetch(`/comment/recette/${this.id}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: this.comment,
        _csrf: this.csrfToken,
      }),
    });
  }
}

customElements.define('recipe-comment-form', CommentForm);
