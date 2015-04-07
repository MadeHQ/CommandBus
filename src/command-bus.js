(function () {
  'use strict';

  define([
    'extend'
  ], function (extend) {
    var CommandBus;

    CommandBus = (function () {
      function Bus() {
        this.options = null;
      }

      Bus.prototype.setOptions = function (options) {
        if (this.options === null) {
          this.options = {};
        }

        this.options = extend(this.options, options);
      };

      Bus.prototype.setHandlers = function (handlers) {
        this.setOptions({
          'handlers': handlers
        });
      };

      Bus.prototype.setGlobalDependencies = function (dependencies) {
        this.setOptions({
          'globalDependencies': dependencies
        });
      };

      Bus.prototype.getOption = function (key) {
        if (this.options.hasOwnProperty(key)) {
          return this.options[key];
        }
        throw new ReferenceError('Options ' + key + ' does not exist');
      };

      Bus.prototype.handle = function (command, callback) {
        var argv = {};
        var dependencies = {};
        if (command.constructor === Object) {
          command = command.name;
          argv = command.arguments || {};
        }

        if (this.getOption('handlers').hasOwnProperty(command)) {
          var handler = this.getOption('handlers')[command];

          try {
            dependencies = extend(this.getOption('globalDependencies'), handler.dependencies);
          } catch(e) {
            dependencies = handler.dependencies;
          }

          if (handler.handler.constructor === Function) {
            return handler.handler.apply(this, [
              dependencies,
              argv,
              callback
            ]);
          } else {
            return require([handler.handler], function (item) {
              return item.apply(this, [
                dependencies,
                argv,
                callback
              ]);
            });
          }
        }
      };

      return Bus;
    })();

    return CommandBus;
  });
})();
