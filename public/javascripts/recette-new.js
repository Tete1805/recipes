(() => {

  window.onload = () => {

    //Fonction recursive de remontée des neouds pour trouver un élément de type donnée
    function parent(elm, type) {
      return elm.parentElement.tagName === type ? elm.parentElement : parent(elm.parentElement, type);
    }

    function toArray() {
        return Array.prototype.slice.call(this, 0)
    }

    function attachDeleteEvents() {
      // Supprime le li container du bouton appelant
      document.querySelectorAll('#btn-supprimer')
        .forEach((input) => {
          input.addEventListener('click', (e) => {
            console.log(parent(e.currentTarget, 'UL').children.length );
            if (parent(e.currentTarget, 'UL').children.length > 2) {
              var curLi = parent(e.currentTarget, 'LI');
              curLi.parentElement.removeChild(curLi);
            }
          })
        })
    }

    // Clone le li en cours, supprime le bouton d'ajout de ligne,
    // vide les inputs de la li en cours, insère le clone en amont

    function attachAddEvents() {
      document.querySelectorAll('#btn-ajouter')
        .forEach((input) => {
          input.addEventListener('click', (e) => {
            var curLi = parent(e.currentTarget, 'LI').previousSibling;
            var clone = curLi.cloneNode(true);
            curLi.querySelectorAll("input[type='text'], input[type='number']")
              .forEach((input) => {
                input.value = null;
              });
            curLi.parentElement.insertBefore(clone, curLi);

            attachDeleteEvents();
            attachTotalEvents();
          })
        })
    }

    function total() {

      var t = 0.00;
      document.querySelectorAll('.pourcentage').forEach((input) => { t += parseFloat(input.value) || 0; });
      document.getElementById('total-pourcentage').innerText = t;
      document.querySelector('input[value="Enregistrer"').disabled = t < 100;

      t = 0.00;
      document.querySelectorAll('.nicotine').forEach((input) => {
        t += (parseFloat(input.value) || 0) * (parseInt(parent(input, 'LI').querySelector('.pourcentage').value, 10) || 0) / 100;
      })
      document.getElementById('total-nicotine').innerText = t;
    }

    function attachTotalEvents() {
      document.querySelectorAll('.pourcentage')
        .forEach((input) => {
          input.addEventListener('change', () => { total() })
          input.addEventListener('keyup', () => { total() })
        })
    }

    attachAddEvents();
    attachDeleteEvents();
    attachTotalEvents();
    total();

  }

})();