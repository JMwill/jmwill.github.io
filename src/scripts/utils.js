/*eslint-env es6*/
/**
 * utils
 */
if (!$) {
    var $ = (elem) => {
        return document.querySelector(elem);
    };

    var $$ = (elem) => {
        return document.querySelectorAll(elem);
    };
    var utils = {
        isElement: (o) => {
            return (
                typeof HTMLElement === 'object'
                ?
                o instanceof HTMLElement
                :
                o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string'
            );
        },
        isType: (type) => {
            type = type[0].toUpperCase() + type.slice(1).toLowerCase();
            return function (obj) {
                return Object.prototype.toString.apply(obj) === `[object ${type}]`;
            };
        },
        deepExtend: function deepExtend(out) {
            out = out || {};
            for (let i = 1, l = arguments.length; i < l; i++) {
                var obj = arguments[i];
                if (!obj) { continue; }

                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (typeof obj[key] === 'object') {
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
