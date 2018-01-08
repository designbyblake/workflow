if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) { // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

global.loadScript = function (url, callback, options) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    if (typeof options !== 'undefined') {
        if (typeof options.async !== 'undefined' && options.async) {
            script.async = true;
        }
        if (typeof options.defer !== 'undefined' && options.defer) {
            script.defer = true;
        }
        if (typeof options.id !== 'undefined' && options.id) {
            script.id = options.id;
        }
    }

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

var loadScriptsObj = {
    name: null,
    url: null,
    ip: null,
    ips: [],
    ua: [],
    matchIP: function() {
        return this.ips.indexOf(this.ip) !== -1;
    },
    matchUA: function() {
        return this.ua.filter(function(item){
            return navigator.userAgent.indexOf(item) !== -1;
        }).length > 0;
    },
    blocked: function() {
        if (this.matchUA()) {
            // console.log( this.name, ': Blocked UA' );
            return true;
        }
        if (this.matchIP()) {
            // console.log( this.name, ': Blocked IP' );
            return true;
        }
        return false;
    },
    init: function() {}
};

global.loadScripts = function (Obj) {

    var newObj = Object.create(loadScriptsObj);

    return Object.assign(newObj, Obj);

}


module.exports = loadScripts;
module.exports = loadScript;

// call ready
if (typeof loadScriptsReady === 'function') {
    loadScriptsReady();
}