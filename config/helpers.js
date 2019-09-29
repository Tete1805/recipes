function inBrowserHelpers(req, res, next) {
  function padRight(v) {
    return v < 10 ? '0' + v : v;
  }

  res.locals.formatDate = function formatDate(date, type) {
    const formattedDate = [
      padRight(date.getDate()),
      padRight(date.getMonth() + 1),
      date.getFullYear()
    ].join('/');

    if (type === 'dateTime') {
      const formattedTime = [
        padRight(date.getHours()),
        padRight(date.getMinutes())
      ].join(':');
      return formattedDate + ' à ' + formattedTime;
    }

    return formattedDate;
  };

  next();
}

module.exports = inBrowserHelpers;
