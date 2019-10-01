class RecipeDate extends HTMLElement {
  constructor() {
    super();
    const { initial, format } = this.attributes;
    this.innerText = formatDate(initial.value, format.value);
  }
}

customElements.define('recipe-date', RecipeDate);

function padRight(v) {
  return v < 10 ? '0' + v : v;
}

function formatDate(stringDate, type) {
  const date = new Date(stringDate);
  const formattedDate = [
    padRight(date.getDate()),
    padRight(date.getMonth() + 1),
    date.getFullYear()
  ].join('/');

  if (type === 'DateTime') {
    const formattedTime = [
      padRight(date.getHours()),
      padRight(date.getMinutes())
    ].join(':');
    return formattedDate + ' à ' + formattedTime;
  }

  return formattedDate;
}
