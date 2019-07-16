'use strict';

(function () {
  var SCALE_VALUE = 100;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];


  var HashtagsInterval = {
    MAX: 5,
    MIN_LENGTH: 2,
    MAX_LENGTH: 20
  };

  var form = document.querySelector('.img-upload__form');
  var uploadPicture = document.querySelector('#upload-file');
  var imgUpload = document.querySelector('.img-upload__overlay');
  var closeBtnImgUploadHandler = imgUpload.querySelector('.img-upload__cancel');
  var scaleControl = imgUpload.querySelector('.scale__control--value');
  var imgUploadPreview = imgUpload.querySelector('.img-upload__preview');
  var imagePreview = imgUpload.querySelector('.img-upload__preview img');
  var commentInput = imgUpload.querySelector('.text__description');
  var effectLevel = imgUpload.querySelector('.effect-level');
  var hashtagsInput = imgUpload.querySelector('.text__hashtags');
  var formSubmitButton = imgUpload.querySelector('.img-upload__submit');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeImgUpload);
  };

  var removeEscEvent = function () {
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var addEscEvent = function () {
    document.addEventListener('keydown', onPopupEscPress);
  };

  // загрузка фотографии
  var uploadUserImage = function () {
    var file = uploadPicture.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imagePreview.src = reader.result;
      });

      reader.readAsDataURL(file);
      openImgUpload();
    } else {
      window.showMessage.errorMessage('Неверный формат файла');
      closeImgUpload();
    }
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

  var openImgUpload = function () {
    imgUpload.classList.remove('hidden');
    addEscEvent();
    scaleControl.value = SCALE_VALUE + '%';
    effectLevel.style.display = 'none';
  };

  // Показываем форму редактирования
  uploadPicture.addEventListener('change', function () {
    uploadUserImage();
  });

  // Валидация
  var checkFirstSymbol = function (hashtag) {
    return hashtag.charAt(0) !== '#';
  };

  var checkMinLength = function (hashtag) {
    return hashtag.length < HashtagsInterval.MIN_LENGTH;
  };

  var checkMaxLength = function (hashtag) {
    return hashtag.length > HashtagsInterval.MAX_LENGTH;
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

  formSubmitButton.addEventListener('click', function () {
    var hashtagsArray = hashtagsInput.value.trim().split([' ']);

    if (checkEmpty(hashtagsInput)) {
      hashtagsInput.setCustomValidity('');
    } else if (hashtagsArray.some(checkFirstSymbol)) {
      hashtagsInput.setCustomValidity('Хэш-тег должен начинаться с символа # ');
    } else if (hashtagsArray.some(checkMinLength)) {
      hashtagsInput.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
    } else if (hashtagsArray.some(checkMaxLength)) {
      hashtagsInput.setCustomValidity('Хэш-тег должен содержать максимум 20 символов');
    } else if (hashtagsArray.some(checkNoSpace)) {
      hashtagsInput.setCustomValidity('Хэш-теги должны разделяться пробелами');
    } else if (hashtagsArray.length > HashtagsInterval.MAX) {
      hashtagsInput.setCustomValidity('Вы можете добавить максимум 5 хэш-тегов');
    } else if (checkUnique(hashtagsArray)) {
      hashtagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
    } else {
      hashtagsInput.setCustomValidity('');
    }
  });

  // ну и закрываем по клику
  closeBtnImgUploadHandler.addEventListener('click', closeImgUpload);

  // если фокус находится в поле  ввода, удаляем обработчик ESC
  commentInput.addEventListener('focus', removeEscEvent);
  hashtagsInput.addEventListener('focus', removeEscEvent);

  // если убираем фокус, добавляем обработчик ESC
  commentInput.addEventListener('blur', addEscEvent);
  hashtagsInput.addEventListener('blur', addEscEvent);

  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), window.showMessage.successMessage, window.showMessage.errorMessage);
    evt.preventDefault();
    closeImgUpload();
  });
})();
