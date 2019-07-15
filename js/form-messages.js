'use strict';

(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successBlock;
  var errorBlock;
  var errorTitle;
  var successButtonHandler;
  var errorButtonsHandler;

  var createMessageBlock = function (template) {
    var messageTemplate = template.cloneNode(true);

    main.appendChild(messageTemplate);
    messageTemplate.classList.add('hidden-block');
  };

  createMessageBlock(successTemplate);
  createMessageBlock(errorTemplate);

  successBlock = main.querySelector('.success');
  errorBlock = main.querySelector('.error');
  errorTitle = main.querySelector('.error__title');
  successButtonHandler = main.querySelector('.success__button');
  errorButtonsHandler = main.querySelectorAll('.error__button');

  var hideSuccessBlock = function () {
    successBlock.classList.add('hidden-block');
    document.removeEventListener('keydown', removeSuccessBlockEscHandler);
  };

  var hideErrorBlock = function () {
    errorBlock.classList.add('hidden-block');
    document.removeEventListener('keydown', removeErrorBlockEscHandler);
  };

  var removeSuccessBlockEscHandler = function (evt) {
    window.util.isEscEvent(evt, hideSuccessBlock);
  };

  var removeErrorBlockEscHandler = function (evt) {
    window.util.isEscEvent(evt, hideErrorBlock);
  };

  successButtonHandler.addEventListener('click', hideSuccessBlock);

  var errorButtonsEvent = function () {
    Array.from(errorButtonsHandler).forEach(function (item) {
      item.addEventListener('click', hideErrorBlock);
    });
  };

  errorButtonsEvent();
  document.addEventListener('keydown', removeSuccessBlockEscHandler);
  document.addEventListener('keydown', removeErrorBlockEscHandler);

  window.showSuccessMessage = function () {
    successBlock.classList.remove('hidden-block');
  };

  window.showErrorMessage = function (text) {
    errorBlock.classList.remove('hidden-block');
    errorTitle.textContent = text;
  };
})();
