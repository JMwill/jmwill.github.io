'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/*eslint-env es6*/
/**
 * utils
 */
if (!$) {
    var $ = function $(elem) {
        return document.querySelector(elem);
    };

    var $$ = function $$(elem) {
        return document.querySelectorAll(elem);
    };
    var utils = {
        isElement: function isElement(o) {
            return (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object' ? o instanceof HTMLElement : o && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string';
        },
        isType: function isType(type) {
            type = type[0].toUpperCase() + type.slice(1).toLowerCase();
            return function (obj) {
                return Object.prototype.toString.apply(obj) === '[object ' + type + ']';
            };
        },
        deepExtend: function deepExtend(out) {
            out = out || {};
            for (var i = 1, l = arguments.length; i < l; i++) {
                var obj = arguments[i];
                if (!obj) {
                    continue;
                }

                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (_typeof(obj[key]) === 'object') {
                            out[key] = deepExtend(out[key], obj[key]);
                        } else {
                            out[key] = obj[key];
                        }
                    }
                }
            }
            return out;
        }
    };
}
//# sourceMappingURL=utils.js.map
