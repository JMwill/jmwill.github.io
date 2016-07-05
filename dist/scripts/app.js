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
'use strict';

/*eslint-env es6*/
;(function (hook) {
    var dom = '<div class="full-colorful-bg" style=""></div>';

    function _createRandomSexColor() {
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

        return result;
    }

    function BgChanger() {
        var elem = arguments.length <= 0 || arguments[0] === undefined ? document.body : arguments[0];

        if (typeof elem == 'string') {
            try {
                elem = $(elem);
            } catch (e) {
                elem = document.body;
                console.error('select element with an error: $(e.stack)');
            }
        }

        // create background element
        var tempNode = document.createElement('div');
        tempNode.innerHTML = dom;

        /**********************************
         * property
         **********************************/
        this.prop = {
            elem: elem,
            node: tempNode.childNodes[0]
        };

        this.DEFAULT = {
            color: '#7cd8fb'
        };

        /**********************************/

        // append background element to elem
        this.prop.elem.appendChild(this.prop.node);
    }

    BgChanger.prototype.animateBg = function () {
        var prop = this.prop;
        if (prop.colorfulBg) this.stopColorful();

        prop.colorfulBg = setInterval(function () {
            prop.node.style.backgroundColor = _createRandomSexColor();
        }, 2000);
    };

    BgChanger.prototype.stopColorful = function () {
        clentInterval(this.prop.colorfulBg);
    };

    BgChanger.prototype.setColor = function (color) {
        var prop = this.prop;
        if (!color) color = this.DEFAULT.color;

        this.node.style.backgroundColor = color;
    };

    hook.BgChanger = BgChanger;
})(Page);
'use strict';

/*eslint-env es6*/
;(function (hook) {
    function loadedImg(evt) {
        var prop = this.prop;

        prop.elem.style.backgroundImage = 'url(' + prop.imgContainer.src + ')';
    }

    function BgImageLoader(elem) {

        if (!elem) {
            throw new Error('Image Loader Running Wrong!, elem: ' + elem);
        }
        elem = $(elem);

        /**********************************
         * property
         **********************************/
        this.prop = {
            elem: elem,
            imgContainer: new Image()
        };

        this.DEFAULT = {
            timeout: 10000
        };
        /**********************************/

        this.prop.imgContainer.addEventListener('load', loadedImg.bind(this));
    }

    BgImageLoader.prototype.loadImg = function (url) {
        var prop = this.prop;
        prop.imgContainer.src = url;
    };

    hook.BgImageLoader = BgImageLoader;
})(Page);
'use strict';

/*eslint-env es6*/
Page.init = function () {
    document.onreadystatechange = function () {
        // create colorful background
        if (document.readyState === 'complete') {
            Page.bg = new Page.BgChanger();
            Page.bg.animateBg();
        }

        // create image loader

        var imgUrls = ['/dist/images/default-bg.jpg'];
        Page.imgLoader = new Page.BgImageLoader('.background');

        setInterval(function () {
            Page.imgLoader.loadImg(imgUrls[parseInt(Math.random() * imgUrls.length)]);
        }, Page.imgLoader.DEFAULT.timeout);
    };
};

Page.init();