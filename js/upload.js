'use strict';
var ESC_KEYCODE = 27;


var uploadPicture = document.querySelector('#upload-file');
var imgUpload = document.querySelector('.img-upload__overlay');

var CloseBtnImgUploadHandler = imgUpload.querySelector('.img-upload__cancel');
var imgUploadPreview = imgUpload.querySelector('.img-upload__preview');
var btnBigger = imgUpload.querySelector('.scale__control--bigger');
var btnSmaller = imgUpload.querySelector('.scale__control--smaller');
var scaleControl = imgUpload.querySelector('.scale__control--value');
var imagePreview = imgUpload.querySelector('.img-upload__preview img');
var photosEffectsList = imgUpload.querySelectorAll('.effects__item');

var effectLevel = imgUpload.querySelector('.effect-level');

var commentInput = imgUpload.querySelector('.text__description');

var filters = [
  'effects__preview--none',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat'
];

// закрываем по клавише ESC
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeImgUpload();
  }
};

var removeEscEvent = function () {
  document.removeEventListener('keydown', onPopupEscPress);
};

var addEscEvent = function () {
  document.addEventListener('keydown', onPopupEscPress);
};

// Функция закрытия формы
var closeImgUpload = function () {
  imgUpload.classList.add('hidden');
  removeEscEvent();
  // сбрасываем значение поля выбора файла
  uploadPicture.value = '';
  imgUploadPreview.style.transform = '';
  imagePreview.className = '';
};

// Изменение масштаба изображения P.S надо будет улучшить
var buttonScaleClickHandler = function (evt) {
  if (btnSmaller === evt.target) {
    if (parseInt(scaleControl.value, 10) - 25 >= 25) {
      scaleControl.value = (parseInt(scaleControl.value, 10) - 25) + ' %';
      imgUploadPreview.style.transform = 'scale(' + parseInt(scaleControl.value, 10) / 100 + ')';
    }
  } else if (btnBigger === evt.target) {
    if (parseInt(scaleControl.value, 10) + 25 <= 100) {
      scaleControl.value = (parseInt(scaleControl.value, 10) + 25) + ' %';
      imgUploadPreview.style.transform = 'scale(' + parseInt(scaleControl.value, 10) / 100 + ')';
    }
  }
};

btnSmaller.addEventListener('click', buttonScaleClickHandler);
btnBigger.addEventListener('click', buttonScaleClickHandler);


// Переключение фильтров
var addFilterHandler = function (photo, filter) {
  photo.addEventListener('click', function () {
    imagePreview.className = filter;
    if (filter === 'effects__preview--none') {
      effectLevel.style.display = 'none';
    } else {
      effectLevel.style.display = 'block';
    }
  });
};

for (var i = 0; i < photosEffectsList.length; i++) {
  addFilterHandler(photosEffectsList[i], filters[i]);
}

// Показываем форму редактирования
uploadPicture.addEventListener('change', function () {
  imgUpload.classList.remove('hidden');
  addEscEvent();
  /* Временно */
  scaleControl.value = '100%';
  effectLevel.style.display = 'none';
});

// ну и закрываем по клику
CloseBtnImgUploadHandler.addEventListener('click', closeImgUpload);

// если фокус находится в поле  ввода комментари, удаляем обработчик ESC
commentInput.addEventListener('focus', removeEscEvent);

// если убираем фокус, добавляем обработчик ESC
commentInput.addEventListener('blur', addEscEvent);
