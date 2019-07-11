'use strict';

(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var createMessageBlock = function (template) {
    var messageTemplate = template.cloneNode(true);

    main.appendChild(messageTemplate);
    messageTemplate.style.display = 'none';
  };
  createMessageBlock(successTemplate);
  createMessageBlock(errorTemplate);

  var successBlock = main.querySelector('.success');
  var errorBlock = main.querySelector('.error');
  var successButtonHandler = main.querySelector('.success__button');
  var errorButtonsHandler = main.querySelectorAll('.error__button');

  var hideSuccessBlock = function () {
    successBlock.style.display = 'none';
    document.removeEventListener('keydown', removeSuccessBlockEscHandler);
  };

  var hideErrorBlock = function () {
    errorBlock.style.display = 'none';
    document.removeEventListener('keydown', removeErrorBlockEscHandler);
  };

  var removeSuccessBlockEscHandler = function (evt) {
    window.util.isEscEvent(evt, hideSuccessBlock);
  };

  var removeErrorBlockEscHandler = function (evt) {
    window.util.isEscEvent(evt, hideErrorBlock);
  };

  successButtonHandler.addEventListener('click', hideSuccessBlock);
  Array.from(errorButtonsHandler).forEach(function (item) {
    item.addEventListener('click', hideErrorBlock);
  });
  document.addEventListener('keydown', removeSuccessBlockEscHandler);
  document.addEventListener('keydown', removeErrorBlockEscHandler);

  window.showSuccessMessage = function () {
    successBlock.style.display = 'flex';
  };

  window.showErrorMessage = function () {
    errorBlock.style.display = 'flex';
  };
})();
