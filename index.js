var angular = require('angularjs')

  , template = require('./template');

angular.module('todo', [])
  .factory('ffApi', function () {
    return function (name, options, next) {
      console.log('stub: ffapi', name, options, next);
    };
  })
  .directive('todo', function (ffApi) {
    return {
      scope: {},
      replace: true,
      restrict: 'A',
      template: template,
      link: function (scope, element, attrs) {
        var name = attrs.todo;
        scope.$parent.$watch(name, function(value) {
          scope.todo = value;
        });
        scope.$watch('todo', function(value) {
          scope.$parent[name] = value;
        });
        scope.$watch('todo.watching', function (value, old) {
          if (value === old) return;
          var url = value ? 'watch' : 'unwatch';
          ffApi('todos/' + url, {id: scope.todo._id});
        });
        scope.$watch('todo.done', function (value, old) {
          if (value === old) return;
          var url = value ? 'done' : 'undone';
          ffApi('todos/' + url, {id: scope.todo._id});
        });
        element.find('button')[0].addEventListener('click', function () {
          scope.$parent.removeTodo(scope.todo);
        });
      }
    };
  })

module.exports = false;
