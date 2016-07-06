/*eslint-env es6*/
Page.init = function () {
    document.onreadystatechange = function () {
        if (document.readyState === 'complete') {
            // create colorful background
            Page.bg = new Page.BgChanger('.full-colorful-bg');
            Page.bg.animateBg();

            // create image loader
            var imgUrls = [
                'https://drscdn.500px.org/photo/117544915/m%3D2048/c0a9e0c80f713f6e60ff1007949e4305',
                'https://drscdn.500px.org/photo/88117953/m%3D2048/0c7766069e9b6610e899fbad9a0b4462',
                'https://drscdn.500px.org/photo/127499069/m%3D2048/df28be5b611ce61a8eebe04afaf0012b',
                'https://drscdn.500px.org/photo/138408329/m%3D2048/030533c95eb447847e1b8849d956a142',
                'https://drscdn.500px.org/photo/99282877/m%3D2048/703ab4bf665486b8ca542fa5626418fc'
            ];
            Page.imgLoader = new Page.BgImageLoader('.full-colorful-bg');

            Page.imgLoader.init(
                imgUrls,
                null,
                () => {
                    Page.bg.stopColorful();
                }
            );
        }
    };
};

Page.init();