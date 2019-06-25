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
var effectLevelPin = imgUpload.querySelector('.effect-level__pin');
var effectLevelLine = imgUpload.querySelector('.effect-level__line');
var effectLevelValue = imgUpload.querySelector('.effect-level__value');
var effectLevelDepth = imgUpload.querySelector('.effect-level__depth');

var commentInput = imgUpload.querySelector('.text__description');

var filters = [
  'effects__preview--none',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat'
];

var filtersRange = {
  'none': {
    MIN: 'none',
    MAX: 'none'
  },
  'chrome': {
    MIN: 0,
    MAX: 1
  },
  'sepia': {
    MIN: 0,
    MAX: 1
  },
  'marvin': {
    MIN: 0,
    MAX: 100
  },
  'phobos': {
    MIN: 0,
    MAX: 3
  },
  'heat': {
    MIN: 1,
    MAX: 3
  }
};

var setEffectLevel = function () {
  var minFilter = filtersRange[imagePreview.dataset.filterName].MIN;
  var maxFilter = filtersRange[imagePreview.dataset.filterName].MAX;

  var value = Math.floor(map(effectLevelDepth.offsetWidth, 0, effectLevelLine.offsetWidth, minFilter, maxFilter) * 10) / 10;

  var nameToFilter = {
    'none': '',
    'chrome': 'grayscale(' + value + ')',
    'sepia': 'sepia(' + value + ')',
    'marvin': 'invert(' + value + '%)',
    'phobos': 'blur(' + value + 'px)',
    'heat': 'brightness(' + value + ')'
  };

  imagePreview.style.filter = nameToFilter[imagePreview.dataset.filterName];
};

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

var resetStyles = function () {
  imagePreview.style = '';
  effectLevelPin.style.left = effectLevelDepth.style.width = effectLevelLine.offsetWidth + 'px';
  effectLevelValue.value = 100;
};

var map = function (x, inMin, inMax, outMin, outMax) {
  return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
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


// Изменение насыщенности фильтров
effectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var effectLevelPinCoords = {
    x: evt.clientX - evt.offsetX,
  };
  var shiftX = evt.pageX - effectLevelPinCoords.x;
  var sliderCoordsX = effectLevelLine.getBoundingClientRect().left + pageXOffset;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var newLeft = moveEvt.pageX - shiftX - sliderCoordsX;

    if (newLeft < 0) {
      newLeft = 0;
    }

    var rightEdge = effectLevelLine.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    effectLevelPin.style.left = newLeft + 'px';
    effectLevelDepth.style.width = effectLevelPin.style.left;
    effectLevelValue.value = Math.floor(newLeft / effectLevelLine.offsetWidth * 100);

    setEffectLevel();
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

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
  photo.addEventListener('click', function (evt) {
    imagePreview.className = filter;
    if (evt.target.closest('.effects__radio')) {
      imagePreview.dataset.filterName = evt.target.value;
      resetStyles();
    }

    if (filter === 'effects__preview--none') {
      effectLevel.style.display = 'none';
    } else {
      effectLevel.style.display = 'block';
    }
    resetStyles();
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
  resetStyles();
});

// ну и закрываем по клику
CloseBtnImgUploadHandler.addEventListener('click', closeImgUpload);

// если фокус находится в поле  ввода комментари, удаляем обработчик ESC
commentInput.addEventListener('focus', removeEscEvent);

// если убираем фокус, добавляем обработчик ESC
commentInput.addEventListener('blur', addEscEvent);
