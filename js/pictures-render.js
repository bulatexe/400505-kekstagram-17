'use strict';

(function () {

  var picturesList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content;

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };
  window.pictureRender = function (data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (item) {
      fragment.appendChild(renderPicture(item));
    });
    picturesList.appendChild(fragment);
  };
})();
