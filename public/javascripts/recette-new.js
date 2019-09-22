(function() {
  window.addEventListener('load', windowLoaded);
  window.addEventListener('recipe-row-deleted', rowDeleted);
  window.addEventListener('recipe-row-added', newRowAdded);

  function windowLoaded() {
    addEventHandlerToTargets({
      selector: '.btn-ajouter',
      handler: addNewRow
    });
    addEventHandlerToTargets({
      selector: '.btn-supprimer',
      handler: deleteRow
    });
    addEventHandlerToTargets({
      selector: '.pourcentage',
      handler: updatePourcentage,
      events: ['change', 'keyup']
    });
    addEventHandlerToTargets({
      selector: '.pourcentage, .nicotine',
      handler: updatePourcentage,
      events: ['change', 'keyup']
    });
    updatePourcentage();
    updateNicotine();
  }

  function newRowAdded({ detail: newRow }) {
    addEventHandlerToTargets({
      selector: '.btn-supprimer',
      handler: deleteRow,
      root: newRow
    });
    addEventHandlerToTargets({
      selector: '.pourcentage, .nicotine',
      handler: updatePourcentage,
      events: ['change', 'keyup'],
      root: newRow
    });
  }

  function rowDeleted() {
    updatePourcentage();
    updateNicotine();
  }

  function addEventHandlerToTargets(options) {
    const { selector, handler, events = ['click'], root = document } = options;
    const targets = root.querySelectorAll(selector);
    Array.from(targets).forEach(target =>
      events.forEach(event => target.addEventListener(event, handler))
    );
  }

  function addNewRow(event) {
    event.preventDefault();
    const buttonRow = getParentByType(event.currentTarget, 'LI');
    const lastRow = buttonRow.previousSibling;
    const newRow = lastRow.cloneNode(true);
    cleanInputValues(newRow);
    lastRow.insertAdjacentElement('afterend', newRow);
    lastRow.dispatchEvent(
      new CustomEvent('recipe-row-added', { detail: newRow, bubbles: true })
    );
  }

  function deleteRow(event) {
    event.preventDefault();
    const target = event.currentTarget;
    const parent = getParentByType(target, 'UL');
    if (hasMoreThanOneRow(parent)) {
      const row = getParentByType(target, 'LI');
      requestIdleCallback(() => {
        parent.removeChild(row);
        parent.dispatchEvent(new Event('recipe-row-deleted'));
      });
    }
  }

  function updatePourcentage() {
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

  function updateNicotine() {
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

  function getParentByType(element, type) {
    return element.parentElement.tagName === type
      ? element.parentElement
      : getParentByType(element.parentElement, type);
  }

  function hasMoreThanOneRow(section) {
    return section.children.length > 2;
  }

  function cleanInputValues(row) {
    const inputs = row.querySelectorAll(
      "input[type='text'], input[type='number']"
    );
    Array.from(inputs).forEach(input => (input.value = null));
  }

  function tryGetValue(input, format) {
    return input.value ? format(input.value, 10) : 0;
  }
})();
