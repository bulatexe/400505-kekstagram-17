'use strict';

(function () {
  var pictures = [];
  var picturesList = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');
  var imgFiltersButtons = document.querySelectorAll('.img-filters__button');
  var imgFiltersPopularButton = document.querySelector('#filter-popular');
  var imgFiltersNewButton = document.querySelector('#filter-new');
  var imgFilterDiscussedButton = document.querySelector('#filter-discussed');

  var shuffle = function (array) {
    var j;
    var x;
    var i;
    for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
    }
    return array;
  };
  var updatePictures = function (filterType) {
    window.debounce(window.pictureRender, filterType);
  };
  var clearPicturesField = function () {
    Array.prototype.forEach.call(picturesList.querySelectorAll('.picture'), function (picture) {
      picture.parentNode.removeChild(picture);
    });
  };

  var filterPopular = function () {
    clearPicturesField();
    updatePictures(pictures);
  };

  var filterNew = function () {
    clearPicturesField();
    var picturesCopy = pictures.slice();
    var renderNewImg = shuffle(picturesCopy).slice(0, 10);
    updatePictures(renderNewImg);
  };

  var filterDiscussed = function () {
    clearPicturesField();
    var renderDiscussedImg = pictures.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    updatePictures(renderDiscussedImg);
  };

  imgFiltersPopularButton.addEventListener('click', filterPopular);

  imgFiltersNewButton.addEventListener('click', filterNew);

  imgFilterDiscussedButton.addEventListener('click', filterDiscussed);

  var setActiveFilterHandler = function (filterBtn) {
    filterBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
      Array.from(imgFiltersButtons).forEach(function (filter) {
        filter.classList.remove('img-filters__button--active');
      });
      filterBtn.classList.add('img-filters__button--active');
    });
  };

  for (var i = 0; i < imgFiltersButtons.length; i++) {
    setActiveFilterHandler(imgFiltersButtons[i]);
  }

  var successHandler = function (data) {
    imgFilters.classList.remove('img-filters--inactive');
    pictures = data;
    updatePictures(pictures);
    window.renderBigPicture(pictures[0]);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; padding: 10px 0; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);
})();
