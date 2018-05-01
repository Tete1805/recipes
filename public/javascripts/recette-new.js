(function() {
  window.addEventListener('load', recette, false);

  function recette() {
    if (!NodeList.prototype.forEach) {
      NodeList.prototype.forEach = Array.prototype.forEach;
    }

    //Fonction recursive de remontée des neouds pour trouver un élément de type donnée
    function parent(elm, type) {
      return elm.parentElement.tagName === type
        ? elm.parentElement
        : parent(elm.parentElement, type);
    }

    function attachDeleteEvents() {
      // Supprime le li container du bouton appelant
      document.querySelectorAll('.btn-supprimer').forEach(function(input) {
        input.addEventListener('click', function(e) {
          const target = e.currentTarget;
          if (parent(target, 'UL').children.length > 2) {
            var curLi = parent(target, 'LI');
            requestIdleCallback(() => {
              if (curLi.parentElement) curLi.parentElement.removeChild(curLi);
              total();
            });
          }
        });
      });
    }

    // Clone le li en cours, supprime le bouton d'ajout de ligne,
    // vide les inputs de la li en cours, insère le clone en amont

    function attachAddEvents() {
      document.querySelectorAll('.btn-ajouter').forEach(function(input) {
        input.addEventListener('click', function(e) {
          const curLi = parent(e.currentTarget, 'LI').previousSibling;
          const clone = curLi.cloneNode(true);
          curLi
            .querySelectorAll("input[type='text'], input[type='number']")
            .forEach(function(input) {
              input.value = null;
            });
          curLi.parentElement.insertBefore(clone, curLi);
          attachDeleteEvents();
          attachTotalEvents();
        });
      });
    }

    function total() {
      const t = Array.from(document.querySelectorAll('.pourcentage')).reduce(
        (total, input) => total + parseFloat(input.value) || 0,
        0
      );
      document.getElementById('total-pourcentage').innerText = t;
      const s = document.querySelector('input[value="Enregistrer"');
      if (s) {
        s.disabled = t < 100;
      }

      const n =
        Array.from(document.querySelectorAll('.nicotine')).reduce(
          (total, input) =>
            total +
            (parseFloat(input.value) || 0) *
              (parseInt(
                parent(input, 'LI').querySelector('.pourcentage').value,
                10
              ) || 0),
          0
        ) / 100;
      document.getElementById('total-nicotine').innerText = n;
    }

    function attachTotalEvents() {
      document.querySelectorAll('.pourcentage').forEach(function(input) {
        input.addEventListener('change', function() {
          total();
        });
        input.addEventListener('keyup', function() {
          total();
        });
      });
    }

    attachAddEvents();
    attachDeleteEvents();
    attachTotalEvents();
    total();
  }
})();
