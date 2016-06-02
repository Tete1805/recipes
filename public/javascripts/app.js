(function() {

  var $http = {
    get: function(url, msg, callback) {
      action('GET', msg, callback);
    },
    post: function(url, msg, callback) {
      action('POST', msg, callback);
    }
  }

  function action(url, msg, callback) {

    var r = new XMLHttpRequest();

    r.open('GET', url, true);

    r.onreadystatechange = function(e) {
      if (r.readyState === 4 && r.status === 200) {
        callback(r.responseText);
      }
    }

    r.send(msg);

  }

  var recipe = {
    base: [],
    date: '',
    flavors: [],
    title: ''
  };

})();