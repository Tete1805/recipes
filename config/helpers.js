function inBrowserHelpers(req, res, next) {

  function padRight(v) {
    return v < 10 ? '0' + v : v;
  }

  res.locals.formatDate = function formatDate(d, type) {

    var s = '';
    
    s += padRight(d.getDate());
    s += '/';
    s += padRight(d.getMonth() + 1);
    s += '/';
    s += d.getFullYear();

    if (type === 'dateTime') {
      s += ' à ';
      s += padRight(d.getHours());
      s += ':';
      s += padRight(d.getMinutes());
    }

    return s;

  }
  
  next();

}

module.exports = inBrowserHelpers;