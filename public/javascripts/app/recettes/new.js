(function() {

  window.onload = function() {

    function parent(elm, type) {
      if(elm.parentElement.tagName === type) {
        return elm.parentElement
      } else {
        return parent(elm.parentElement, type);
      }
    }

    function addDeleteBtnEvent(context) {
      var deleteBtn = context.querySelector("#btn-supprimer-arome");
      deleteBtn.addEventListener('click', function() {
        var curLi = parent(this, 'LI');
        curLi.parentElement.removeChild(curLi);
      });
    }

    var addBtn = document.getElementById("btn-ajouter-arome");
    addBtn.addEventListener('click', function() {
        var curLi = parent(this, 'LI');
        var clone = curLi.cloneNode(true);
        var innerAddBtn = clone.querySelector("#btn-ajouter-arome");
        innerAddBtn.parentElement.removeChild(innerAddBtn);

        addDeleteBtnEvent(clone);

        curLi.parentElement.insertBefore(clone, curLi);
    });

    addDeleteBtnEvent(document);

  }
})();