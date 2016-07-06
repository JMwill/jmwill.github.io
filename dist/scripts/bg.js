'use strict';

/*eslint-env es6*/
;(function (hook) {
    var dom = '<div class="full-colorful-bg"\n        style="position: absolute;\n        width: 100%;\n        top: 0;\n        bottom: 0;\n        transition: background-color 1s ease-in;\n        z-index: -10;\n        background-color: #7cd8fb;\n        background-size: cover;">\n    </div>';

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

    function BgChanger(elem) {
        if (typeof elem == 'string') {
            try {
                elem = $(elem);
            } catch (e) {
                // create background element
                var tempNode = document.createElement('div');
                tempNode.innerHTML = dom;

                elem = tempNode.childNodes[0];

                // append background element to body
                document.body.appendChild(elem);
                console.error('select element with an error: $(e.stack), so background element will be ' + dom);
            }
        }

        if (!utils.isElement(elem)) {
            throw new Error('Error element selector or input object is not an Element!');
        }

        /**********************************
         * property
         **********************************/
        this.prop = {
            elem: elem
        };

        this.DEFAULT = {
            color: '#7cd8fb'
        };

        /**********************************/
    }

    BgChanger.prototype.animateBg = function () {
        var prop = this.prop;
        if (prop.colorfulBg) this.stopColorful();

        prop.colorfulBg = setInterval(function () {
            prop.elem.style.backgroundColor = _createRandomSexColor();
        }, 2000);
    };

    BgChanger.prototype.stopColorful = function () {
        clearInterval(this.prop.colorfulBg);
    };

    BgChanger.prototype.setColor = function (color) {
        var prop = this.prop;
        if (!color) color = this.DEFAULT.color;

        this.style.backgroundColor = color;
    };

    hook.BgChanger = BgChanger;
})(Page);
//# sourceMappingURL=bg.js.map
