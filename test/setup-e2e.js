
var angular = require('angularjs')
  // , settings = require('settings')
  // , angularSettings = require('angular-settings')
  , log = require('domlog')
  , todo = require('todo');

log.init();

function Tester($scope) {
  $scope.todo = {
    _id: 'oneId',
    title: "Do this fix thing",
    type: 'General',
    person: 'KWX-3E',
    owned: true,
    completed: false,
    done: false,
    user: 'user.MMZSD'
  };
  $scope.todo1 = {
    _id: 'twoId',
    title: "Do this one thing",
    type: 'General',
    person: 'KWX-3E',
    owned: true,
    completed: new Date().toString(),
    done: true,
    user: 'user.MMZSD'
  };
  $scope.todo2 = {
    _id: 'threeId',
    title: "Do this other thing",
    type: 'General',
    person: 'KWX-3E',
    owned: false,
    completed: false,
    done: false,
    user: 'user.MRZSD'
  };
  $scope.todo3 = {
    _id: 'threeId',
    title: "Give me some lovin",
    type: 'Find Ancetors',
    person: 'KWX-3E',
    owned: true,
    completed: false,
    done: false,
    user: 'user.MRZSD'
  };
  $scope.removeTodo = function (todo) {
    log('removing todo', todo);
  };
}

angular.module('test', ['todo'])
  .factory('ffperson', function () {
    return function (pid, next) {
      log('person api', pid, next);
      setTimeout(function () {
        next(null, {display: {name: 'Edward'}});
      }, 1000);
    }
  })
  .factory('ffapi', function () {
    return log;
  });

