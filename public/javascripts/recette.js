(function() {
  window.onload = function() {
    if (!NodeList.prototype.forEach) {
      NodeList.prototype.forEach = Array.prototype.forEach;
    }

    function clickHandler(e) {
      var input = e.currentTarget;
      fetch('/recette/' + input.attributes['recette-id'].value + '/like', {
        method: 'POST',
        credentials: 'include'
      }).then(function(response) {
        if (response.ok) {
          var pars = response.url.split('/');
          var id = pars[pars.length - 2];
          var span = document.querySelector("span[recette-id='" + id + "']");
          span.innerText = parseInt(span.innerText) + 1;
          span.previousSibling.className = 'liked';
          span.previousSibling.removeEventListener('click', clickHandler);
        }
      });
    }

    document.querySelectorAll('.like').forEach(function(input) {
      input.addEventListener('click', clickHandler);
    });
  };
})();
