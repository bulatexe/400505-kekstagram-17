'use strict';

var picturesList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content;


var getNumberInRange = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  randomNumber = Math.floor(randomNumber);
  return randomNumber;
};

var getComments = function () {
  var pictureComments = {
    comments: [
      'Всё отлично!',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.'
    ],
  };
  return pictureComments.comments.slice((getNumberInRange(0, pictureComments.comments.length)));
};

var generatePhotos = function (count) {
  var photosData = [];

  for (var i = 0; i < count; i++) {
    photosData.push({
      url: 'photos/' + getNumberInRange(1, 25) + '.jpg',
      likes: getNumberInRange(15, 200),
      comments: getComments()
    });
  }
  return photosData;
};

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

var createPictures = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPicture(arr[i]));
  }
  picturesList.appendChild(fragment);
};

var showPictures = function () {
  var pictures = generatePhotos(25);
  createPictures(pictures);
};

showPictures();

