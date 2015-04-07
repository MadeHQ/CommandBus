(function () {
  'use strict';

  define(function () {
    var CommandBus;

    CommandBus = (function () {
      function Bus() {
        this.options = null;
      }

      Bus.prototype.setOptions = function (options) {
        this.options = options;
      };

      Bus.prototype.setHandlers = function (handlers) {
        this.setOptions({
          'handlers': handlers
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
        if (command.constructor === Object) {
          command = command.name;
          argv = command.arguments || {};
        }

        if (this.getOption('handlers').hasOwnProperty(command)) {
          var handler = this.getOption('handlers')[command];

          if (handler.handler.constructor === Function) {
            return handler.handler.apply(this, [
              handler.dependencies,
              argv,
              callback
            ]);
          } else {
            return require([handler.handler], function (item) {
              return item.apply(this, [
                handler.dependencies,
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
