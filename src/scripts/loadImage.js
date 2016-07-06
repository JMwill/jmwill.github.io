/*eslint-env es6*/
;(function (hook) {
    function _loadedImg (evt) {
        let prop = this.prop;

        this.fadeOut(0.3);
        setTimeout(() => {
            console.log(prop.imgContainer.src);
            prop.elem.style.backgroundImage = `url(${prop.imgContainer.src})`;
            prop.imgLoading = false;
            this.fadeIn();
        }, prop.options.fadeTime * 1000);

        if (prop.cb) {
            prop.cb();
            delete prop.cb;
        }
    }

    function _loadWithError (evt) {
        let prop = this.prop;
        prop.imgLoading = false;
        console.log('Can not load image');
    }
    function BgImageLoader(elem) {

        if (!elem) {
            throw new Error(`Image Loader Running Wrong!, elem: ${elem}`);
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
        let prop = this.prop;
        let isString = utils.isType('String');
        let isArray = utils.isType('Array');
        let isFunction = utils.isType('Function');

        prop.options = utils.deepExtend({}, this.DEFAULT, options);

        if (isString(urls)) {
            this.loadImg(urls);
        } else if (isArray(urls)) {
            prop.randomBgImg =
                setInterval(() => {
                    if (prop.imgLoading) return ;
                    this.loadImg(
                        this.randomUrl(urls)
                    );
                }, prop.options.timeout);

            // load first image
            this.loadImg(
                urls[parseInt(Math.random() * urls.length)]
            );
        }

        if (isFunction(cb)) { this.prop.cb = cb; }
    };

    BgImageLoader.prototype.randomUrl = function (urls) {
        let prop = this.prop;
        var url = urls[parseInt(Math.random() * urls.length)];
        if ( url === prop.imgContainer.src) {
            url = this.randomUrl(urls);
        }
        return url;
    };

    BgImageLoader.prototype.loadImg = function (url) {
        let prop = this.prop;
        prop.imgContainer.src = url;
        prop.imgLoading = true;
    };

    BgImageLoader.prototype.fadeOut = function (val = 0) {
        let prop = this.prop;
        let style = window.getComputedStyle(prop.elem);
        prop.oldTransitionProperty = style.transitionProperty;

        let transStr = `opacity ${prop.options.fadeTime}s linear`;
        prop.elem.style.WebkitTransition = transStr;
        prop.elem.style.MozTransition = transStr;

        prop.elem.style.opacity = val;
    };

    BgImageLoader.prototype.fadeIn = function (val = 1) {
        let prop = this.prop;
        prop.elem.style.opacity = val;
    };

    hook.BgImageLoader = BgImageLoader;

})(Page);
