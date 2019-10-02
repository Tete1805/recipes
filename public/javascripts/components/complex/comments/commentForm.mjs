import '../../base/textarea.mjs';
import '../../base/button.mjs';

const { html, render } = window.litHtml;

class CommentForm extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    render(this.template(), this.shadow);
  }
  template() {
    return html`
      <form method="POST">
        <label for="comment">Votre commentaire</label>
        <recipe-textarea
          appearance="textarea"
          name="comment"
          rows="4"
          placeholder="Super recette !"
        ></recipe-textarea>
        <recipe-button class="pushable" type="submit">Poster</recipe-button>
        <input
          type="hidden"
          name="_csrf"
          value=${this.attributes.csrfToken.value}
        />
      </form>
    `;
  }
  onClick(event) {
    if (this.isTextareaEmpty()) {
      event.preventDefault();
      alert('Vous devez saisir du texte pour soumettre votre commentaire.');
    }
  }
  isTextareaEmpty() {
    return this.shadow.querySelector('recipe-textarea').textContent === '';
  }
  connectedCallback() {
    this.submitButton = this.shadow.querySelector('.pushable');
    this.submitButton.addEventListener('click', this.onClick.bind(this));
  }
  disconnectedCallback() {
    this.submitButton.removeEventListener('click', this.onClick.bind(this));
  }
}

customElements.define('recipe-comment-form', CommentForm);
