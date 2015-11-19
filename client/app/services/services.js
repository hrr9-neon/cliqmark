angular.module('cliqmark.services', [])

.factory('Bookmarks', function ($http) {

  var getData = function(){
    return $http({
      method: 'GET',
      url: '/getBookmarks?userId=1' //todo: change this hard coded',
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var addBookmark = function(bookmark){
    $http({
      method: 'POST',
      url: '/addBookmark',
      data: bookmark
    });
  };

  return {
    getData: getData,
    addBookmark: addBookmark
  }
})

.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var login = function (user) {
    return $http({
      method: 'POST',
      url: '/login',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };


  return {
    login: login,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
