'use strict';

(function () {
  var MAX_NEW_PHOTOS = 10;

  var pictures = [];
  var picturesList = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');
  var imgFiltersButtons = document.querySelectorAll('.img-filters__button');
  var imgFiltersPopularButton = document.querySelector('#filter-popular');
  var imgFiltersNewButton = document.querySelector('#filter-new');
  var imgFilterDiscussedButton = document.querySelector('#filter-discussed');

  var updatePictures = function (filterType) {
    window.debounce(window.picturesRender, filterType);
  };

  var clearPicturesField = function () {
    Array.prototype.forEach.call(picturesList.querySelectorAll('.picture'), function (picture) {
      picture.parentNode.removeChild(picture);
    });
  };

  var getPicturesPopular = function () {
    clearPicturesField();
    updatePictures(pictures);
  };

  var getPicturesNew = function () {
    clearPicturesField();
    var picturesCopy = pictures.slice();
    var renderNewImg = picturesCopy.sort(function () {
      return Math.random() - 0.5;
    }).slice(0, MAX_NEW_PHOTOS);
    updatePictures(renderNewImg);
  };

  var getPicturesDiscussed = function () {
    clearPicturesField();
    var renderDiscussedImg = pictures.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    updatePictures(renderDiscussedImg);
  };

  var setActiveFilterHandler = function (filterBtn) {
    filterBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
      Array.from(imgFiltersButtons).forEach(function (filter) {
        filter.classList.remove('img-filters__button--active');
      });
      filterBtn.classList.add('img-filters__button--active');
    });
  };

  var setActiveFilter = function () {
    imgFiltersButtons.forEach(function (item) {
      setActiveFilterHandler(item);
    });
  };

  var openBigPictureHandler = function (data) {

    picturesList.addEventListener('click', function (evt) {
      var target = evt .target;
      if (target.closest('.picture__img') && !target.closest('.picture__likes')) {
        window.renderBigPicture(data[target.dataset.id]);
      }
    });


    var pictureEnterPressHandler = function (evt) {
      window.util.isEnterEvent(evt, function () {
        var target = evt.target.querySelector('.picture__img');
        if (target) {
          window.renderBigPicture(data[target.dataset.id]);
        }
      });
    };

    picturesList.addEventListener('keydown', pictureEnterPressHandler);
  };

  imgFiltersPopularButton.addEventListener('click', getPicturesPopular);

  imgFiltersNewButton.addEventListener('click', getPicturesNew);

  imgFilterDiscussedButton.addEventListener('click', getPicturesDiscussed);

  var successHandler = function (data) {
    imgFilters.classList.remove('img-filters--inactive');
    setActiveFilter();
    pictures = data;
    updatePictures(pictures);
    openBigPictureHandler(data);
  };

  var errorHandler = function (errorMessage) {
    window.showMessage.errorMessage(errorMessage);
  };

  window.backend.load(successHandler, errorHandler);
})();
