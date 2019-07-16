'use strict';

(function () {
  var EFFECT_VALUE = 100;

  var FILTERS = [
    'effects__preview--none',
    'effects__preview--chrome',
    'effects__preview--sepia',
    'effects__preview--marvin',
    'effects__preview--phobos',
    'effects__preview--heat'
  ];

  var ScaleSettings = {
    MIN: 25,
    MAX: 100,
    STEP: 25
  };

  var FiltersRange = {
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

  var imgUpload = document.querySelector('.img-upload__overlay');

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

  var setEffectLevel = function () {
    var minFilter = FiltersRange[imagePreview.dataset.filterName].MIN;
    var maxFilter = FiltersRange[imagePreview.dataset.filterName].MAX;

    var value = Math.floor(window.util.proportionMap(effectLevelDepth.offsetWidth, 0, effectLevelLine.offsetWidth, minFilter, maxFilter) * 10) / 10;

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

  var setControlStyle = function (value) {
    imgUploadPreview.style.transform = 'scale(' + value / 100 + ')';
  };

  var buttonScaleClickHandler = function (evt) {
    var scaleControlValue = parseInt(scaleControl.value, 10);

    switch (evt.target) {
      case btnSmaller:
        if (scaleControlValue - ScaleSettings.STEP >= ScaleSettings.MIN) {
          scaleControl.value = (scaleControlValue -= ScaleSettings.STEP) + '%';
          setControlStyle(scaleControlValue);
        }
        break;
      case btnBigger:
        if (scaleControlValue + ScaleSettings.STEP <= ScaleSettings.MAX) {
          scaleControl.value = (scaleControlValue += ScaleSettings.STEP) + '%';
          setControlStyle(scaleControlValue);
        }
        break;
    }
  };

  btnSmaller.addEventListener('click', buttonScaleClickHandler);
  btnBigger.addEventListener('click', buttonScaleClickHandler);
  var addFilterHandler = function (photo, filter) {
    photo.addEventListener('click', function (evt) {
      imagePreview.className = filter;
      if (evt.target.closest('.effects__radio')) {
        imagePreview.dataset.filterName = evt.target.value;
        effectLevelPin.style.left = effectLevelDepth.style.width = effectLevelLine.offsetWidth + 'px';
        effectLevelValue.value = EFFECT_VALUE;
        setEffectLevel();
      }

      if (filter === 'effects__preview--none') {
        effectLevel.style.display = 'none';
      } else {
        effectLevel.style.display = 'block';
      }
      effectLevelPin.style.left = effectLevelDepth.style.width = effectLevelLine.offsetWidth + 'px';
    });
  };

  var addFilter = function () {
    for (var i = 0; i < photosEffectsList.length; i++) {
      addFilterHandler(photosEffectsList[i], FILTERS[i]);
    }
  };

  addFilter();
})();
