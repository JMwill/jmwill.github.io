(function () {
  'use strict';

  const $ = (context, selector) =>
    context.querySelector
      ? context.querySelector(selector)
      : document.querySelector(context);
  const $$ = (context, selector) =>
    Array.from(
      context.querySelectorAll
        ? context.querySelectorAll(selector)
        : document.querySelectorAll(context)
    );

  const _addClass = (e, name) => {
    if (e.classList && e.classList.add) {
      name.forEach((n) => e.classList.add(n));
    } else {
      let className = e.className.split(" ");
      name.forEach((n) => !className.includes(n) && className.push(n));
      e.className = className.join(" ");
    }
  };
  const addClass = (context, selector, name) => {
    let addClassList;
    if (!name) {
      addClassList = Array.isArray(selector) ? selector : selector.split(" ");
      _addClass(context, addClassList);
    } else {
      addClassList = Array.isArray(name) ? name : name.split(" ");
      $$(context, selector).forEach((e) => _addClass(e, addClassList));
    }
  };

  const _rmClass = (e, name) => {
    if (e.classList && e.classList.remove) {
      name.forEach((n) => e.classList.remove(n));
    } else {
      let className = [];
      e.className
        .split(" ")
        .forEach((n) => !name.includes() && className.push(n));
      e.className = className.join(" ");
    }
  };
  const rmClass = (context, selector, name) => {
    let rmClassList;
    if (!name) {
      rmClassList = Array.isArray(selector) ? selector : selector.split(" ");
      _rmClass(context, rmClassList);
    } else {
      rmClassList = Array.isArray(name) ? name : name.split(" ");
      $(context, selector).forEach((e) => _rmClass(e, rmClassList));
    }
  };

  const isElement = (o) =>
    typeof HTMLElement === "object"
      ? o instanceof HTMLElement
      : o &&
        typeof o === "object" &&
        o !== null &&
        o.nodeType === 1 &&
        typeof o.nodeName === "string";

  const setStyle = (elem, style) =>
    Array.isArray(elem)
      ? elem.forEach((e) =>
          Object.keys(style).forEach((k) => (e.style[k] = style[k]))
        )
      : Object.keys(style).forEach((k) => (elem.style[k] = style[k]));

  const renderTemplate = (selector) => {
    const $tmpl = $(selector);
    if ("content" in document.createElement("template")) {
      const $cube = $tmpl.content.cloneNode(true);
      return $cube;
    } else {
      const tempElem = document.createElement("div");
      tempElem.innerHTML = $tmpl.innerHTML;

      if (tempElem.children.length > 1) {
        const fragment = document.createDocumentFragment();
        Array.from(tempElem.children).forEach((n) => fragment.appendChild(n));
        return fragment;
      } else {
        return tempElem.children[0];
      }
    }
  };

  var dom = /*#__PURE__*/Object.freeze({
    __proto__: null,
    $: $,
    $$: $$,
    addClass: addClass,
    rmClass: rmClass,
    isElement: isElement,
    setStyle: setStyle,
    renderTemplate: renderTemplate
  });

  const isType = (t) => {
    const type = t[0].toUpperCase() + t.slice(1).toLowerCase();
    return function (obj) {
      return Object.prototype.toString.apply(obj) === `[object ${type}]`;
    };
  };

  const deepExtend = (target, ...rest) => {
    target = target || {};
    rest.forEach((o) => {
      if (!o) return;
      const keys = Object.keys(o);
      for (let key of keys) {
        if (typeof o[key] === "object") {
          target[key] = deepExtend(target[key], o[key]);
        } else {
          target[key] = o[key];
        }
      }
    });
    return target;
  };

  const genGradientColor = (function () {
    const cos = Math.cos;
    const PI2 = Math.PI;
    let r = 0;
    return () => {
      r -= PI2 / -50;
      const color =
        "#" +
        (
          ((cos(r) * 127 + 128) << 16) |
          ((cos(r + PI2 / 3) * 127 + 128) << 8) |
          (cos(r + (PI2 / 3) * 2) * 127 + 128)
        ).toString(16);
      return color;
    };
  })();

  const genRandomSexColor = () => {
    /**
     * create one primary color between 7c ~ fb
     */
    let randomPrimaryColor = (
      parseInt(Math.random() * (251 - 124)) + 124
    ).toString(16);
    let colors = ["fb", "7c", randomPrimaryColor];

    let result = "#";
    while (colors.length) {
      let index = parseInt(Math.random() * colors.length);
      result += colors.splice(index, 1);
    }

    return result;
  };

  const randomChoice = (items) => {
    items = Array.from(items);
    return items[Math.floor(Math.random() * items.length)];
  };

  const randomInt = (min, max) => {
    if (!max) {
      min = 0;
      max = min;
    }
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const lightOrDark = (color) => {
    let c, r, g, b;
    if (color.match(/^rgb/)) {
      c = color.match(
        /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
      );
      if (c) {
        r = c[1];
        g = c[2];
        b = c[3];
      }
    } else {
      c = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));
      r = c >> 16;
      g = (c >> 8) & 255;
      b = c & 255;
    }

    const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

    if (hsp > 127.5) {
      return "light";
    } else {
      return "dark";
    }
  };

  var tool = /*#__PURE__*/Object.freeze({
    __proto__: null,
    isType: isType,
    deepExtend: deepExtend,
    genGradientColor: genGradientColor,
    genRandomSexColor: genRandomSexColor,
    randomChoice: randomChoice,
    randomInt: randomInt,
    lightOrDark: lightOrDark
  });

  /* eslint-env es6 */

  var utils = {
    ...dom,
    ...tool,
  };

  const colors = [
    "#DC9FB4",
    "#E16B8C",
    "#8E354A",
    "#F8C3CD",
    "#F4A7B9",
    "#64363C",
    "#F596AA",
    "#B5495B",
    "#E87A90",
    "#D05A6E",
    "#DB4D6D",
    "#FEDFE1",
    "#9E7A7A",
    "#D0104C",
    "#9F353A",
    "#CB1B45",
    "#EEA9A9",
    "#BF6766",
    "#86473F",
    "#B19693",
    "#EB7A77",
    "#954A45",
    "#A96360",
    "#CB4042",
    "#AB3B3A",
    "#D7C4BB",
    "#904840",
    "#734338",
    "#C73E3A",
    "#554236",
    "#994639",
    "#F19483",
    "#B54434",
    "#B9887D",
    "#F17C67",
    "#884C3A",
    "#E83015",
    "#D75455",
    "#B55D4C",
    "#854836",
    "#A35E47",
    "#CC543A",
    "#724832",
    "#F75C2F",
    "#6A4028",
    "#9A5034",
    "#C46243",
    "#AF5F3C",
    "#FB966E",
    "#724938",
    "#B47157",
    "#DB8E71",
    "#F05E1C",
    "#ED784A",
    "#CA7853",
    "#B35C37",
    "#563F2E",
    "#E3916E",
    "#8F5A3C",
    "#F0A986",
    "#A0674B",
    "#C1693C",
    "#FB9966",
    "#947A6D",
    "#A36336",
    "#E79460",
    "#7D532C",
    "#C78550",
    "#985F2A",
    "#E1A679",
    "#855B32",
    "#FC9F4D",
    "#FFBA84",
    "#E98B2A",
    "#E9A368",
    "#B17844",
    "#96632E",
    "#43341B",
    "#CA7A2C",
    "#ECB88A",
    "#78552B",
    "#B07736",
    "#967249",
    "#E2943B",
    "#C7802D",
    "#9B6E23",
    "#6E552F",
    "#EBB471",
    "#D7B98E",
    "#82663A",
    "#B68E55",
    "#BC9F77",
    "#876633",
    "#C18A26",
    "#FFB11B",
    "#D19826",
    "#DDA52D",
    "#C99833",
    "#F9BF45",
    "#DCB879",
    "#BA9132",
    "#E8B647",
    "#F7C242",
    "#7D6C46",
    "#DAC9A6",
    "#FAD689",
    "#D9AB42",
    "#F6C555",
    "#FFC408",
    "#EFBB24",
    "#CAAD5F",
    "#8D742A",
    "#B4A582",
    "#877F6C",
    "#897D55",
    "#74673E",
    "#A28C37",
    "#6C6024",
    "#867835",
    "#62592C",
    "#E9CD4C",
    "#F7D94C",
    "#FBE251",
    "#D9CD90",
    "#ADA142",
    "#DDD23B",
    "#A5A051",
    "#BEC23F",
    "#6C6A2D",
    "#939650",
    "#838A2D",
    "#B1B479",
    "#616138",
    "#4B4E2A",
    "#5B622E",
    "#4D5139",
    "#89916B",
    "#90B44B",
    "#91AD70",
    "#B5CAA0",
    "#646A58",
    "#7BA23F",
    "#86C166",
    "#4A593D",
    "#42602D",
    "#516E41",
    "#91B493",
    "#808F7C",
    "#1B813E",
    "#5DAC81",
    "#36563C",
    "#227D51",
    "#A8D8B9",
    "#6A8372",
    "#2D6D4B",
    "#465D4C",
    "#24936E",
    "#86A697",
    "#00896C",
    "#096148",
    "#20604F",
    "#0F4C3A",
    "#4F726C",
    "#00AA90",
    "#69B0AC",
    "#26453D",
    "#66BAB7",
    "#268785",
    "#405B55",
    "#305A56",
    "#78C2C4",
    "#376B6D",
    "#A5DEE4",
    "#77969A",
    "#6699A1",
    "#81C7D4",
    "#33A6B8",
    "#0C4842",
    "#0D5661",
    "#0089A7",
    "#336774",
    "#255359",
    "#1E88A8",
    "#566C73",
    "#577C8A",
    "#58B2DC",
    "#2B5F75",
    "#3A8FB7",
    "#2E5C6E",
    "#006284",
    "#7DB9DE",
    "#51A8DD",
    "#2EA9DF",
    "#0B1013",
    "#0F2540",
    "#08192D",
    "#005CAF",
    "#0B346E",
    "#7B90D2",
    "#6E75A4",
    "#261E47",
    "#113285",
    "#4E4F97",
    "#211E55",
    "#8B81C3",
    "#70649A",
    "#9B90C2",
    "#8A6BBE",
    "#6A4C9C",
    "#8F77B5",
    "#533D5B",
    "#B28FCE",
    "#986DB2",
    "#77428D",
    "#3C2F41",
    "#4A225D",
    "#66327C",
    "#592C63",
    "#6F3381",
    "#574C57",
    "#B481BB",
    "#3F2B36",
    "#572A3F",
    "#5E3D50",
    "#72636E",
    "#622954",
    "#6D2E5B",
    "#C1328E",
    "#A8497A",
    "#562E37",
    "#E03C8A",
    "#60373E",
    "#FCFAF2",
    "#FFFFFB",
    "#BDC0BA",
    "#91989F",
    "#787878",
    "#828282",
    "#787D7B",
    "#707C74",
    "#656765",
    "#535953",
    "#4F4F48",
    "#52433D",
    "#373C38",
    "#3A3226",
    "#434343",
    "#1C1C1C",
    "#080808",
    "#0C0C0C",
  ];
  const getRandomColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
  };

  function changeContainerBgColor(color) {
    utils.$(".container-bg").style.backgroundColor = color;
  }

  function changeTitleColor(brightness) {
    utils.$(".main-title").style.color =
      brightness === "dark" ? "#ffffff" : "#000000";
  }

  let colorInterval;
  document.addEventListener("DOMContentLoaded", () => {
    colorInterval = setInterval(() => {
      const color = getRandomColor();
      const brightness = utils.lightOrDark(color);
      changeContainerBgColor(color);
      changeTitleColor(brightness);
    }, 30 * 1000);
  });
  document.addEventListener("beforeunload", () => {
    clearInterval(colorInterval);
  });

}());
