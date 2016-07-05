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