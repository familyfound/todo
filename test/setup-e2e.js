
var angular = require('angularjs')
  // , settings = require('settings')
  // , angularSettings = require('angular-settings')
  , boxes = require('todo');

// angularSettings.factory('settings', settings.getSettings());



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
  $scope.removeTodo = function (todo) {
    log('removing todo', todo);
  };
}

var logdiv = document.getElementById('log');

function log() {
  var msg = arguments.length == 1 ? arguments[0] : [].slice.call(arguments);
  var div = document.createElement('div');
  div.innerHTML = JSON.stringify(msg);
  logdiv.appendChild(div);
}

angular.module('test', ['todo'])
  .factory('ffApi', function () {
    return log;
  });
    

