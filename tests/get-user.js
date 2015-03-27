(function () {
  'use strict';

  define(function () {
    return function (dependencies, callback) {
      console.log(callback);

      return callback.call();
    }
  });
})();
