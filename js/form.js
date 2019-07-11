'use strict';

(function () {
  var SCALECONTORLINITVALUE = 100;

  var hashtagsInterval = {
    MAX: 5,
    MIN_LENGTH: 2,
    MAX_LENGTH: 20
  };

  var form = document.querySelector('.img-upload__form');
  var uploadPicture = document.querySelector('#upload-file');
  var imgUpload = document.querySelector('.img-upload__overlay');
  var CloseBtnImgUploadHandler = imgUpload.querySelector('.img-upload__cancel');
  var scaleControl = imgUpload.querySelector('.scale__control--value');
  var imgUploadPreview = imgUpload.querySelector('.img-upload__preview');
  var imagePreview = imgUpload.querySelector('.img-upload__preview img');
  var commentInput = imgUpload.querySelector('.text__description');
  var effectLevel = imgUpload.querySelector('.effect-level');
  var hashtagsInput = imgUpload.querySelector('.text__hashtags');

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
    imgUploadPreview.style = '';
  };

  // Функция закрытия формы
  var closeImgUpload = function () {
    imgUpload.classList.add('hidden');
    uploadPicture.value = '';
    hashtagsInput.value = '';
    commentInput.value = '';
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

  // Валидация
  var checkFirstSymbol = function (hashtag) {
    return hashtag.charAt(0) !== '#';
  };

  var checkMinLength = function (hashtag) {
    return hashtag.length < hashtagsInterval.MIN_LENGTH;
  };

  var checkMaxLength = function (hashtag) {
    return hashtag.length > hashtagsInterval.MAX_LENGTH;
  };

  var checkNoSpace = function (hashtag) {
    return /([a-z0-9]#)/.test(hashtag);
  };

  var checkEmpty = function (hastags) {
    return hastags.value === '';
  };

  var checkUnique = function (hashtags) {
    var valuesSoFar = [];
    for (var i = 0; i < hashtags.length; ++i) {
      var value = hashtags[i].toLowerCase();
      if (valuesSoFar.indexOf(value) !== -1) {
        return true;
      }
      valuesSoFar.push(value);
    }
    return false;
  };

  hashtagsInput.addEventListener('input', function (evt) {
    var hashtags = hashtagsInput.value.trim().split([' ']);

    if (checkEmpty(hashtagsInput)) {
      evt.target.setCustomValidity('');
    } else if (hashtags.some(checkFirstSymbol)) {
      evt.target.setCustomValidity('Хэш-тег должен начинаться с символа #');
    } else if (hashtags.some(checkMinLength)) {
      evt.target.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
    } else if (hashtags.some(checkMaxLength)) {
      evt.target.setCustomValidity('Хэш-тег должен содержать максимум 20 символов');
    } else if (hashtags.some(checkNoSpace)) {
      evt.target.setCustomValidity('Хэш-теги должны разделяться пробелами');
    } else if (hashtags.length > hashtagsInterval.MAX) {
      evt.target.setCustomValidity('Вы можете добавить максимум 5 хэш-тегов');
    } else if (checkUnique(hashtags)) {
      evt.target.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
    } else {
      evt.target.setCustomValidity('');
    }
  });

  // ну и закрываем по клику
  CloseBtnImgUploadHandler.addEventListener('click', closeImgUpload);

  // если фокус находится в поле  ввода, удаляем обработчик ESC
  commentInput.addEventListener('focus', removeEscEvent);
  hashtagsInput.addEventListener('focus', removeEscEvent);

  // если убираем фокус, добавляем обработчик ESC
  commentInput.addEventListener('blur', addEscEvent);
  hashtagsInput.addEventListener('blur', addEscEvent);

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), window.showSuccessMessage, window.showErrorMessage);
    evt.preventDefault();
    closeImgUpload();
  });
})();
