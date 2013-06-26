var angular = require('angularjs')
  , query = require('query')

  , template = require('./template');

angular.module('todo', [])
  .factory('ffApi', function () {
    return function (name, options, next) {
      console.log('stub: ffapi', name, options, next);
    };
  })
  .factory('person', function () {
    return function (id, next) {
      console.log('stub: person', id, next);
    }
  })
  .directive('todo', function (ffApi, person) {
    return {
      scope: {},
      replace: true,
      restrict: 'A',
      template: template,
      link: function (scope, element, attrs) {
        var name = attrs.todo;
        scope.$parent.$watch(name, function(value) {
          if (value && scope.dashboard && !scope.person && !scope.todo) {
            person(value.person, function (err, person) {
              if (err) return;
              scope.person = person;
              scope.$digest();
            });
          }
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
        query('.delete', element[0]).addEventListener('click', function () {
          scope.$parent.removeTodo(scope.todo);
        });
        scope.dashboard = !!attrs.dashboard;
      }
    };
  });

module.exports = false;
