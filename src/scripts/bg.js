/*eslint-env es6*/
;(function (hook) {
    let dom =
    `<div class="full-colorful-bg"
        style="position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        transition: background-color 1s ease-in;
        z-index: -10;
        background-color: #7cd8fb;
        background-size: cover;">
    </div>`;

    function _createRandomSexColor() {
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

        return result;
    }

    function BgChanger(elem) {
        if (typeof elem == 'string') {
            try {
                elem = $(elem);
            } catch (e) {
                // create background element
                let tempNode = document.createElement('div');
                tempNode.innerHTML = dom;

                elem = tempNode.childNodes[0];

                // append background element to body
                document.body.appendChild(
                    elem
                );
                console.error(`select element with an error: $(e.stack), so background element will be ${dom}`);
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
        let prop = this.prop;
        if (prop.colorfulBg)
            this.stopColorful();

        prop.colorfulBg = setInterval(() => {
            prop.elem.style.backgroundColor = _createRandomSexColor();
        }, 2000);
    };

    BgChanger.prototype.stopColorful = function () {
        clearInterval(this.prop.colorfulBg);
    };

    BgChanger.prototype.setColor = function (color) {
        let prop = this.prop;
        if (!color)
            color = this.DEFAULT.color;

        this.style.backgroundColor = color;
    };

    hook.BgChanger = BgChanger;
})(Page);
