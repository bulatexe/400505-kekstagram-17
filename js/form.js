'use strict';

(function () {
  var SCALECONTORLINITVALUE = 100;

  var uploadPicture = document.querySelector('#upload-file');
  var imgUpload = document.querySelector('.img-upload__overlay');
  var CloseBtnImgUploadHandler = imgUpload.querySelector('.img-upload__cancel');
  var scaleControl = imgUpload.querySelector('.scale__control--value');
  var imagePreview = imgUpload.querySelector('.img-upload__preview img');
  var commentInput = imgUpload.querySelector('.text__description');
  var effectLevel = imgUpload.querySelector('.effect-level');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeImgUpload);
  };

  var removeEscEvent = function () {
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var addEscEvent = function () {
    document.addEventListener('keydown', onPopupEscPress);
  };

  var resetStyles = function () {
    uploadPicture.value = '';
    imagePreview.className = '';
    imagePreview.style = '';
  };

  // Функция закрытия формы
  var closeImgUpload = function () {
    imgUpload.classList.add('hidden');
    uploadPicture.value = '';
    removeEscEvent();
    resetStyles();
  };

  // Показываем форму редактирования
  uploadPicture.addEventListener('change', function () {
    imgUpload.classList.remove('hidden');
    addEscEvent();
    scaleControl.value = SCALECONTORLINITVALUE + '%';
    effectLevel.style.display = 'none';
  });

  // ну и закрываем по клику
  CloseBtnImgUploadHandler.addEventListener('click', closeImgUpload);

  // если фокус находится в поле  ввода комментари, удаляем обработчик ESC
  commentInput.addEventListener('focus', removeEscEvent);

  // если убираем фокус, добавляем обработчик ESC
  commentInput.addEventListener('blur', addEscEvent);

})();
