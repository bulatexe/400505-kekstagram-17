'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCloseHandler = bigPicture.querySelector('#picture-cancel');
  var commentsList = document.querySelector('.social__comments');
  var previewImage = bigPicture.querySelector('.big-picture__img img');
  var previewLikes = bigPicture.querySelector('.likes-count');
  var previewDescription = bigPicture.querySelector('.social__caption');

  var makeElement = function (tagName, className) {
    var element = document.createElement(tagName);
    element.classList.add(className);

    return element;
  };

  var createComment = function (pictures) {
    var listItem = makeElement('li', 'social__comment');
    var image = makeElement('img', 'social__picture');

    image.src = pictures.avatar;
    listItem.appendChild(image);

    var commentText = makeElement('p', 'social__text');
    commentText.textContent = pictures.message;
    listItem.appendChild(commentText);

    return listItem;
  };

  var renderComments = function (pictures) {
    var fragment = document.createDocumentFragment();
    pictures.forEach(function (item) {
      fragment.appendChild(createComment(item));
    });

    commentsList.appendChild(fragment);
  };

  window.renderBigPicture = function (pictures) {
    previewImage.src = pictures.url;
    previewLikes.textContent = pictures.likes;
    bigPicture.querySelector('.comments-count').textContent = pictures.comments.length;
    previewDescription.textContent = pictures.description;
    commentsList.innerHTML = '';
    var remainingComments = pictures.comments.slice(0);

    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    renderComments(remainingComments);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };
  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeBigPicture);
  };
  bigPictureCloseHandler.addEventListener('click', closeBigPicture);

})();
