(function() {
  window.onload = function() {
    // Adds forEach from Array to NodeList
    if (!NodeList.prototype.forEach) {
      NodeList.prototype.forEach = Array.prototype.forEach;
    }

    function clickHandler(event) {
      var input = event.currentTarget;
      var token = input.getAttribute('csrf-token');
      fetch('/recette/' + input.attributes['recette-id'].value + '/like', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'CSRF-Token': token // <-- is the csrf token as a header
        }
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
