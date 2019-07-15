'use strict';

(function () {
  var GET_URL = 'https://js.dump.academy/kekstagram/data';
  var POST_URL = 'https://js.dump.academy/kekstagram';
  var TIMEOUT = 10000;

  var errorToMessage = {
    '301': 'Moved Permanently',
    '302': 'Moved Temporarily',
    '404': 'Not Found',
    '500': 'Internal Server Error',
    '502': 'Bad Gateway'
  };

  var createXHR = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + errorToMessage[xhr.status]);
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
    xhr.open('GET', GET_URL);
    xhr.send();
  };

  window.upload = function (data, onSuccess, onError) {
    var xhr = createXHR(onSuccess, onError);
    xhr.open('POST', POST_URL);
    xhr.send(data);
  };
})();
