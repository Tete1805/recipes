(function() {
  window.addEventListener('load', windowLoaded);
  window.addEventListener('recipe-line-deleted', inputChangeHandler);
  window.addEventListener('recipe-line-added', newLineAdded);

  function windowLoaded() {
    const btnAjouter = document.querySelectorAll('.btn-ajouter');
    const btnSupprimer = document.querySelectorAll('.btn-supprimer');

    attachEventHandlerToTargets(btnAjouter, addHanler);
    attachEventHandlerToTargets(btnSupprimer, deleteHandler);
    attachTotalEvents();
  }

  function newLineAdded({ detail: newLine }) {
    const btnSupprimer = newLine.querySelector('.btn-supprimer');
    attachEventHandlerToTargets([btnSupprimer], deleteHandler);
    attachTotalEvents();
  }

  function attachEventHandlerToTargets(targets, handler, event = 'click') {
    Array.from(targets).forEach(target =>
      target.addEventListener(event, handler)
    );
  }

  function addHanler(event) {
    event.preventDefault();
    const buttonLine = getParentByType(event.currentTarget, 'LI');
    const lastLine = buttonLine.previousSibling;
    const newLine = lastLine.cloneNode(true);
    cleanInputValues(newLine);
    lastLine.insertAdjacentElement('afterend', newLine);
    window.dispatchEvent(
      new CustomEvent('recipe-line-added', { detail: newLine })
    );
  }

  function deleteHandler(event) {
    event.preventDefault();
    const target = event.currentTarget;
    const parent = getParentByType(target, 'UL');
    if (hasMoreThanOneLine(parent)) {
      const line = getParentByType(target, 'LI');
      requestIdleCallback(() => {
        parent.removeChild(line);
        document.dispatchEvent(new Event('recipe-line-deleted'));
      });
    }
  }

  function getParentByType(element, type) {
    return element.parentElement.tagName === type
      ? element.parentElement
      : getParentByType(element.parentElement, type);
  }

  function hasMoreThanOneLine(section) {
    return section.children.length > 2;
  }

  function cleanInputValues(line) {
    const inputs = line.querySelectorAll(
      "input[type='text'], input[type='number']"
    );
    Array.from(inputs).forEach(input => (input.value = null));
  }

  function tryGetValue(input, format) {
    return input.value ? format(input.value, 10) : 0;
  }

  function validatePourcentage() {
    const pourcentageInputs = Array.from(
      document.querySelectorAll('.pourcentage')
    );
    const totalPourcentage = pourcentageInputs.reduce(
      (total, input) => total + tryGetValue(input, parseFloat),
      0
    );
    document.getElementById('total-pourcentage').innerText = totalPourcentage;
    document.querySelector('input[value="Enregistrer"]').disabled =
      totalPourcentage != 100;
  }

  function validateNicotineLevel() {
    const nicotineLevels = Array.from(document.querySelectorAll('.nicotine'));
    const totalNicotineLevel = nicotineLevels.reduce((total, input) => {
      const pourcentageInput = getParentByType(input, 'LI').querySelector(
        '.pourcentage'
      );
      const pourcentage = tryGetValue(pourcentageInput, parseFloat);
      const nicotineLevel = tryGetValue(input, parseFloat);
      return total + (nicotineLevel * pourcentage) / 100;
    }, 0);

    document.getElementById('total-nicotine').innerText = totalNicotineLevel;
  }

  function inputChangeHandler() {
    validatePourcentage();
    validateNicotineLevel();
  }

  function attachTotalEvents() {
    document
      .querySelectorAll('.pourcentage, .nicotine')
      .forEach(function(input) {
        input.addEventListener('change', function() {
          inputChangeHandler();
        });
        input.addEventListener('keyup', function() {
          inputChangeHandler();
        });
      });
  }
})();
