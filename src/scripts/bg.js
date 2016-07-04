/*eslint-env es6*/
/**
 * utils
 */
let $ = (elem) => {
    return document.querySelector(elem);
};

let $$ = (elem) => {
    return document.querySelectorAll(elem);
};

;(function () {
    function createRandomSexColor() {
        /**
         * create one primary color between 7c ~ fb
         */
        let randomPrimaryColor = (parseInt(Math.random() * (251 - 124)) + 124).toString(16);
        let colors = ['fb', '7c', randomPrimaryColor];

        let result = '#';
        while (colors.length) {
            let index = parseInt(Math.random() * colors.length);
            result += colors.splice(index, 1);
        }

        console.log(result);
        return result;
    }

    let BgChanger = () => {
        let main = $('.main');

        setInterval(() => {
            main.style.backgroundColor = createRandomSexColor();
        }, 2000);
    };

    window.onload = BgChanger;
})();
