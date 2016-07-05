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