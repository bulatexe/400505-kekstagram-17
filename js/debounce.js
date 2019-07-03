'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 400; // ms
  var lastTimeout = null;
  window.debounce = function (cb, args) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb(args);
    }, DEBOUNCE_INTERVAL);
  };
})();
