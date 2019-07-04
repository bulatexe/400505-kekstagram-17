'use strict';

(function () {

  var picturesList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content;
  var imgFilters = document.querySelector('.img-filters');

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };

  window.render = function (data) {
    var fragment = document.createDocumentFragment();
    imgFilters.classList.remove('img-filters--inactive');
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderPicture(data[i]));
    }
    picturesList.appendChild(fragment);
  };
})();
