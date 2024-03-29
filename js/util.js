'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    proportionMap: function (x, inMin, inMax, outMin, outMax) {
      return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
  };
})();
