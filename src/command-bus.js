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

      Bus.prototype.getOption = function (key) {
        if (this.options.hasOwnProperty(key)) {
          return this.options[key];
        }
        throw new ReferenceError('Options ' + key + ' does not exist');
      };

      Bus.prototype.handle = function (command, callback) {
        if (command.constructor === Object) {
          command = command.name;
          var args = command.arguments || {};
        }

        if (this.getOption('handlers').hasOwnProperty(command)) {
          var handler = this.getOption('handlers')[command];
          if (handler.hasOwnProperty('callback')) {
            return handler.callback.apply(this, [
              handler.dependencies,
              args,
              callback
            ]);
          } else if (handler.hasOwnProperty('handler')) {
            return require([handler.handler], function (item) {
              return item.apply(this, [
                handler.dependencies,
                args,
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
