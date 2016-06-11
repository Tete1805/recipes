(function() {

  window.onload = function() {

    var autocompletes = document.querySelectorAll(".autocomplete");

    for (var i = 0; i < autocompletes.length; i++) {

      var autocomplete = autocompletes[i];

      var input = autocomplete.parentElement.querySelector('input')

      input.addEventListener('focus', function() {
        this.parentElement.querySelector('ul').style.display = 'inline-block';
      }, false);

      input.addEventListener('blur', function() {
        this.value = this.parentElement.querySelector('li:hover').innerText;
        this.parentElement.querySelector('ul').style.display = 'none';
      }, false);

      input.addEventListener('keyup', function(e){
        var filter = this.value.toUpperCase();
        var width = window.getComputedStyle(this.parentElement).width;
        var suggestions = this.parentElement.querySelectorAll('li');
        for (var i = 0; i < suggestions.length; i++) {
          suggestions[i].style.display = suggestions[i].innerText.toUpperCase().indexOf(filter) > -1 ? 'block' : 'none';
          suggestions[i].style.width = width;
        }
      })

    }
  }
})();