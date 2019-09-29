(function() {
  window.onload = function() {
    function clickHandler(event) {
      const input = event.currentTarget;
      const token = input.getAttribute('csrf-token');
      const id = input.nextSibling.getAttribute('recette-id');
      const nextAction = getNextAction(input.className);

      if (nextAction) {
        fetch(`/api/rating/recette/${nextAction}/${id}/`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'CSRF-Token': token // <-- is the csrf token as a header
          }
        }).then(function(response) {
          if (response.ok) {
            const span = document.querySelector("span[recette-id='" + id + "']");
            span.innerText =
              parseInt(span.innerText) + (nextAction === 'like' ? 1 : -1);
            span.previousSibling.className =
              nextAction === 'like' ? 'liked' : 'like';
          }
        });
      }
    }

    function getNextAction(className) {
      switch (className) {
        case 'liked':
          return 'unlike';
        case 'like':
          return 'like';
        default:
          return null;
      }
    }

    Array.from(document.querySelectorAll('.like, .liked')).forEach(function(
      input
    ) {
      input.addEventListener('click', clickHandler);
    });
  };
})();
