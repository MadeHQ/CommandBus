(function () {
  'use strict';

  define(function () {
    return function extend(out) {
      out = out || {};

      for (var i = 1; i < arguments.length; i++) {
        if (!arguments[i]) {
          continue;
        }

        // We need to handle arrays of options here too, for multi-tenant
        if (arguments[i].constructor === Array) {
          var options = [];
          for(var _x = 0; _x < arguments[i].length; _x++) {
            var _ref = arguments[i][_x];
            for (var _sub in _ref) {
              for (var _n in out) {
                if (!_ref[_sub].hasOwnProperty(_n)) {
                  _ref[_sub][_n] = out[_n];
                }
              }
            }

            options.push(_ref);
          }

          return options;
        } else {
          for (var key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key)) {
              out[key] = arguments[i][key];
            }
          }
        }
      }

      return out;
    };
  });
})();
