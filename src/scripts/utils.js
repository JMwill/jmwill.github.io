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
}
