(() => {

  window.onload = () => {

    //Fonction recursive de remontée des neouds pour trouver un élément de type donnée
    function parent(elm, type) {
      return elm.parentElement.tagName === type ? elm.parentElement : parent(elm.parentElement, type);
    }

    function toArray() {
        return Array.prototype.slice.call(this, 0)
    }

    function rebuildNumbers() {

      document.querySelectorAll('.recette-aromes, .recette-bases')
        .forEach((ul) => {
          var i = 1;
          ul.querySelectorAll('LI')
            .forEach((li) => {
              var t = li.children[0].children[0];
              t.innerText = t.innerText.replace(/\s[0-9]*/, ' ' + i);
              i++;
            })
        })
    }

    function attachDeleteEvents() {
      // Supprime le li container du bouton appelant
      document.querySelectorAll('.btn-supprimer')
        .forEach((input) => {
          input.addEventListener('click', (e) => {
            if (parent(e.currentTarget, 'UL').children.length > 1) {
              var curLi = parent(e.currentTarget, 'LI');
              curLi.parentElement.removeChild(curLi);
              rebuildNumbers();
            }
          })
        })
    }

    // Clone le li en cours, supprime le bouton d'ajout de ligne,
    // vide les inputs de la li en cours, insère le clone en amont
    // et réécrit l'ordonnancement des éléments

    function attachAddEvents() {
      document.querySelectorAll('.btn-ajouter')
        .forEach((input) => {
          input.addEventListener('click', (e) => {
            var curLi = parent(e.currentTarget, 'LI');
            var clone = curLi.cloneNode(true);
            curLi.querySelectorAll("input[type='text'], input[type='number']")
              .forEach((input) => {
                input.value = null;
              });
            var innerAddBtn = clone.querySelector(".btn-ajouter");
            innerAddBtn.parentElement.removeChild(innerAddBtn);
            curLi.parentElement.insertBefore(clone, curLi);

            attachDeleteEvents();
            attachTotalEvents();
            rebuildNumbers();
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