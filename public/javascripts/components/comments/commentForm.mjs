import { pushable, submitButton } from '../styles/buttons.mjs';
import { input } from '../styles/input.mjs';

const template = document.createElement('template');
template.innerHTML = /*html*/ `
<style>
  ${input} ${pushable} ${submitButton}
</style>
<form method="POST">
  <label for="comment">Votre commentaire</label>
  <textarea name="comment" rows=4 placeholder="Super recette !"></textarea>
  <input class="pushable" type="submit" value="Poster">
  <input type="hidden" name="_csrf">
</form>`;

class CommentForm extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    const clone = template.content.cloneNode(true);
    this.shadow.append(clone);
  }
  onClick(event) {
    if (this.isTextareaEmpty()) {
      event.preventDefault();
      alert('Vous devez saisir du texte pour soumettre votre commentaire.');
    }
  }
  isTextareaEmpty() {
    return this.shadow.querySelector('textarea').value === '';
  }
  connectedCallback() {
    this.submitButton = this.shadow.querySelector('input.pushable');
    this.submitButton.addEventListener('click', this.onClick.bind(this));
  }
  disconnectedCallback() {
    this.submitButton.removeEventListener('click', this.onClick.bind(this));
  }
}

window.customElements.define('recipe-comment-form', CommentForm);
