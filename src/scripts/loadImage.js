/*eslint-env es6*/
;(function (hook) {
    function loadedImg (evt) {
        let prop = this.prop;

        prop.elem.style.backgroundImage = `url(${prop.imgContainer.src})`;
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
            imgContainer: new Image()
        };

        this.DEFAULT = {
            timeout: 10000
        };
        /**********************************/

        this.prop.imgContainer.addEventListener('load', loadedImg.bind(this));
    }

    BgImageLoader.prototype.loadImg = function (url) {
        let prop = this.prop;
        prop.imgContainer.src = url;
    };

    hook.BgImageLoader = BgImageLoader;

})(Page);
