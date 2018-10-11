import utils from '../utils'

const CUBE_TEMPLATE = '#cube-template'
const $ = utils.$
const $$ = utils.$$
const animateClassName = [
  'cube__container--rotate',
  'cube__container--rotate-reverse',
  'cube__container--slant-rotate',
  'cube__container--slant-rotate-reverse',
]

class Cube {
  constructor(size = 200) {
    this.cubeElem = utils.renderTemplate(CUBE_TEMPLATE).firstElementChild
    if (size) this.setSize(size)
  }

  setRandomColor(color = utils.genGradientColor()) {
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5), 16)
    const style = {
      backgroundColor: `rgba(${[r, g, b].join(',')}, .5)`,
      boxShadow: `0 0 20px ${color}`,
    }
    utils.setStyle(Array.from($$(this.cubeElem, '.cube__face')), style)
    return this
  }

  setSize(size) {
    const z = size / 2
    const containerStyle = {
      transform: `translateZ(-${z}px) `,
    }
    const cubeStyle = {
      width: `${size}px`,
      height: `${size}px`,
    }
    utils.setStyle(this.cubeElem, cubeStyle)
    utils.setStyle($(this.cubeElem, '.cube__container'), containerStyle)

    const faceStyleList = {
      '.cube__face--front': 'rotateY(0deg)',
      '.cube__face--right': 'rotateY(90deg)',
      '.cube__face--back': 'rotateY(180deg)',
      '.cube__face--left': 'rotateY(-90deg)',
      '.cube__face--top': 'rotateX(90deg)',
      '.cube__face--bottom': 'rotateX(-90deg)',
    }
    Object.keys(faceStyleList).forEach(k =>
      utils.setStyle($(this.cubeElem, k), {
        transform: `${faceStyleList[k]} translateZ(${z}px)`,
      })
    )
    return this
  }

  setPos(pos) {
    utils.setStyle(this.cubeElem, pos)
    return this
  }

  appendTo(parent) {
    parent.appendChild(this.cubeElem)
    return this
  }

  animate() {
    utils.addClass(
      $(this.cubeElem, '.cube__container'),
      utils.randomChoice(animateClassName)
    )
    return this
  }

  setClickReaction() {
    this.cubeElem.addEventListener('click', e => {
      e.stopPropagation()
      this.setRandomColor(utils.genRandomSexColor())
    })
  }

  destroy() {
    this.cubeElem.parentElement.removeChild(this.cubeElem)
  }
}

// let transStr = `opacity ${prop.options.fadeTime}s linear`
// prop.elem.style.WebkitTransition = transStr
// prop.elem.style.MozTransition = transStr

export default Cube
