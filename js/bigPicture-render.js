'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var commentsList = document.querySelector('.social__comments');

  var makeElement = function (tagName, className) {
    var element = document.createElement(tagName);
    element.classList.add(className);

    return element;
  };

  var createComment = function (pictures) {
    console.log(pictures.avatar);
    var listItem = makeElement('li', 'social__comment');
    var image = makeElement('img', 'social__picture');

    image.src = pictures.comments[0].avatar;
    listItem.appendChild(image);

    var commentText = makeElement('p', 'social__text');
    commentText.textContent = pictures.comments[0].message;
    listItem.appendChild(commentText);

    return listItem;
  };

  var renderComments = function (pictures) {
    var fragment = document.createDocumentFragment();

    /*
    pictures.forEach(function (item) {
      fragment.appendChild(createComment(item));
    });
     */
    fragment.appendChild(createComment(pictures));

    commentsList.appendChild(fragment);
  };
  window.renderBigPicture = function (pictures) {
    bigPicture.querySelector('.big-picture__img img').src = pictures.url;
    bigPicture.querySelector('.likes-count').textContent = pictures.likes;
    bigPicture.querySelector('.comments-count').textContent = pictures.comments.length;
    bigPicture.querySelector('.social__caption').textContent = pictures.description;

    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

    renderComments(pictures);
  };
})();
