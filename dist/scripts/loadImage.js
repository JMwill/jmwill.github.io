'use strict';

/*eslint-env es6*/
;(function (hook) {
    function _loadedImg(evt) {
        var _this = this;

        var prop = this.prop;

        this.fadeOut(0.3);
        setTimeout(function () {
            console.log(prop.imgContainer.src);
            prop.elem.style.backgroundImage = 'url(' + prop.imgContainer.src + ')';
            prop.imgLoading = false;
            _this.fadeIn();
        }, prop.options.fadeTime * 1000);

        if (prop.cb) {
            prop.cb();
            delete prop.cb;
        }
    }

    function _loadWithError(evt) {
        var prop = this.prop;
        prop.imgLoading = false;
        console.log('Can not load image');
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
            imgContainer: new Image(),
            imgLoading: false
        };

        this.DEFAULT = {
            timeout: 10000,
            fadeTime: 1
        };
        /**********************************/

        this.prop.imgContainer.addEventListener('load', _loadedImg.bind(this));
        this.prop.imgContainer.addEventListener('error', _loadWithError.bind(this));
    }

    BgImageLoader.prototype.init = function (urls, options, cb) {
        var _this2 = this;

        var prop = this.prop;
        var isString = utils.isType('String');
        var isArray = utils.isType('Array');
        var isFunction = utils.isType('Function');

        prop.options = utils.deepExtend({}, this.DEFAULT, options);

        if (isString(urls)) {
            this.loadImg(urls);
        } else if (isArray(urls)) {
            prop.randomBgImg = setInterval(function () {
                if (prop.imgLoading) return;
                _this2.loadImg(_this2.randomUrl(urls));
            }, prop.options.timeout);

            // load first image
            this.loadImg(urls[parseInt(Math.random() * urls.length)]);
        }

        if (isFunction(cb)) {
            this.prop.cb = cb;
        }
    };

    BgImageLoader.prototype.randomUrl = function (urls) {
        var prop = this.prop;
        var url = urls[parseInt(Math.random() * urls.length)];
        if (url === prop.imgContainer.src) {
            url = this.randomUrl(urls);
        }
        return url;
    };

    BgImageLoader.prototype.loadImg = function (url) {
        var prop = this.prop;
        prop.imgContainer.src = url;
        prop.imgLoading = true;
    };

    BgImageLoader.prototype.fadeOut = function () {
        var val = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

        var prop = this.prop;
        var style = window.getComputedStyle(prop.elem);
        prop.oldTransitionProperty = style.transitionProperty;

        var transStr = 'opacity ' + prop.options.fadeTime + 's linear';
        prop.elem.style.WebkitTransition = transStr;
        prop.elem.style.MozTransition = transStr;

        prop.elem.style.opacity = val;
    };

    BgImageLoader.prototype.fadeIn = function () {
        var val = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

        var prop = this.prop;
        prop.elem.style.opacity = val;
    };

    hook.BgImageLoader = BgImageLoader;
})(Page);
//# sourceMappingURL=loadImage.js.map
