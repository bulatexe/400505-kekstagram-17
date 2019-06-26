'use strict';

(function () {
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
    return pictureComments.comments.slice((window.util.getNumberInRange(0, pictureComments.comments.length)));
  };

  var generatePhotos = function (count) {
    var photosData = [];

    for (var i = 1; i <= count; i++) {
      photosData.push({
        url: 'photos/' + i + '.jpg',
        likes: window.util.getNumberInRange(15, 200),
        comments: getComments()
      });
    }
    return photosData;
  };

  window.dataPicture = generatePhotos(25);
})();
