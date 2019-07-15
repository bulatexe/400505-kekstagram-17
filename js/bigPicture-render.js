'use strict';

(function () {
  var PHOTO_SHOW = 5;

  var remainingComments;
  var commentsQuantity = {};
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCloseHandler = bigPicture.querySelector('#picture-cancel');
  var commentsList = document.querySelector('.social__comments');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
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

    updateCommentsContent(commentsQuantity.currentCount, commentsQuantity.totalCount);
  };

  window.renderBigPicture = function (pictures) {
    previewImage.src = pictures.url;
    previewLikes.textContent = pictures.likes;
    previewDescription.textContent = pictures.description;
    remainingComments = pictures.comments.slice(0);

    commentsQuantity.totalCount = remainingComments.length;
    commentsList.innerHTML = '';

    renderComments(prepareComments(remainingComments));

    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', popupEscPressHandler);
  };

  var prepareComments = function (comments) {
    if (comments.length > PHOTO_SHOW) {
      commentsLoader.classList.remove('hidden');
      commentsQuantity.currentCount = commentsQuantity.totalCount - comments.length + PHOTO_SHOW;

      return comments.splice(0, PHOTO_SHOW);
    }

    commentsLoader.classList.add('hidden');
    commentsQuantity.currentCount = commentsQuantity.totalCount;

    return comments.splice(0, comments.length);
  };

  var updateCommentsContent = function (currentCount, totalCount) {
    bigPicture.querySelector('.social__comment-count').textContent = currentCount + ' из '
      + totalCount + ' комментариев';
  };

  var loadCommentsClickHandler = function () {
    renderComments(prepareComments(remainingComments));
  };

  commentsLoader.addEventListener('click', loadCommentsClickHandler);
  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', popupEscPressHandler);
  };
  var popupEscPressHandler = function (evt) {
    window.util.isEscEvent(evt, closeBigPicture);
  };
  bigPictureCloseHandler.addEventListener('click', closeBigPicture);

})();
