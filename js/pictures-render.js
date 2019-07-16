'use strict';

(function () {

  var picturesList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content;

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    var image = pictureElement.querySelector('.picture__img');

    image.src = picture.url;
    image.dataset.id = picture.id;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };
  window.picturesRender = function (data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (item) {
      fragment.appendChild(renderPicture(item));
    });
    picturesList.appendChild(fragment);
  };
})();
