'use strict';

/*eslint-env es6*/
/**
 * utils
 */
var $ = function $(elem) {
    return document.querySelector(elem);
};

var $$ = function $$(elem) {
    return document.querySelectorAll(elem);
};

;(function () {
    function createRandomSexColor() {
        /**
         * create one primary color between 7c ~ fb
         */
        var randomPrimaryColor = (parseInt(Math.random() * (251 - 124)) + 124).toString(16);
        var colors = ['fb', '7c', randomPrimaryColor];

        var result = '#';
        while (colors.length) {
            var index = parseInt(Math.random() * colors.length);
            result += colors.splice(index, 1);
        }

        console.log(result);
        return result;
    }

    var BgChanger = function BgChanger() {
        var main = $('.main');

        setInterval(function () {
            main.style.backgroundColor = createRandomSexColor();
        }, 2000);
    };

    window.onload = BgChanger;
})();
//# sourceMappingURL=bg.js.map
