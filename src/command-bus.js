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
        if (this.getOption('handlers').hasOwnProperty(command)) {
          var handler = this.getOption('handlers')[command];
          if (handler.hasOwnProperty('callback')) {
            return handler.callback.apply(this, [
              handler.dependencies,
              callback
            ]);
          } else if (handler.hasOwnProperty('handler')) {
            return require([handler.handler], function (handler) {
              return handler.apply(this, [
                handler.dependencies,
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
