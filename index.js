
var angular = require('angularjs')
  , query = require('query')
  , ffapi = require('ffapi')

  , template = require('./template');

angular.module('todo', ['ffapi'])
  .directive('todo', function (ffapi) {
    return {
      scope: {},
      replace: true,
      restrict: 'A',
      template: template,
      link: function (scope, element, attrs) {
        var name = attrs.todo;
        scope.$parent.$watch(name, function(value) {
          if (value && scope.dashboard && !scope.person && !scope.todo) {
            ffapi.relation(value.person, function (person) {
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
          ffapi('todos/' + url, {id: scope.todo._id});
        });
        scope.$watch('todo.done', function (value, old) {
          if (value === old) return;
          var url = value ? 'done' : 'undone';
          ffapi('todos/' + url, {id: scope.todo._id});
        });
        query('.delete', element[0]).addEventListener('click', function () {
          scope.$parent.removeTodo(scope.todo);
        });
        scope.dashboard = !!attrs.dashboard;
      }
    };
  });

module.exports = false;
