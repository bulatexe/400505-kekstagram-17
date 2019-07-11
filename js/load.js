'use strict';

(function () {
  var GETURL = 'https://js.dump.academy/kekstagram/data';
  var POSTURL = 'https://js.dump.academy/kekstagram';
  var TIMEOUT = 10000;

  var createXHR = function(onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT;
    return xhr;
  };

  window.load = function (onSuccess, onError) {
    var xhr = createXHR(onSuccess, onError);
    xhr.open('GET', GETURL);
    xhr.send();
  };

  window.upload = function (data, onSuccess, onError) {
    var xhr = createXHR(onSuccess, onError);
    xhr.open('POST', POSTURL);
    xhr.send(data);
  };
})();
