/*eslint-env es6*/
Page.init = function () {
    document.onreadystatechange = function () {
        if (document.readyState === 'complete') {
            // create colorful background
            Page.bg = new Page.BgChanger();
            Page.bg.animateBg();

            // create image loader

            var imgUrls = [
                '/dist/images/default-bg.jpg'
            ];
            Page.imgLoader = new Page.BgImageLoader('.background');

            // setInterval(() => {
            //     Page.imgLoader.loadImg(
            //         imgUrls[parseInt(Math.random() * imgUrls.length)]
            //     );
            // }, Page.imgLoader.DEFAULT.timeout);

            Page.imgLoader.loadImg(
                imgUrls[parseInt(Math.random() * imgUrls.length)]
            );
        }
    };
};

Page.init();