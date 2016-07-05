"use strict";

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
}