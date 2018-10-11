export const isType = t => {
  const type = t[0].toUpperCase() + t.slice(1).toLowerCase()
  return function(obj) {
    return Object.prototype.toString.apply(obj) === `[object ${type}]`
  }
}

export const deepExtend = (target, ...rest) => {
  target = target || {}
  rest.forEach(o => {
    if (!o) return
    for (let key in o) {
      if (o.hasOwnProperty(key)) {
        if (typeof o[key] === 'object') {
          target[key] = deepExtend(target[key], o[key])
        } else {
          target[key] = o[key]
        }
      }
    }
  })
  return target
}

export const genGradientColor = (function() {
  const cos = Math.cos
  const PI2 = Math.PI
  let r = 0
  return () => {
    r -= PI2 / -50
    const color =
      '#' +
      (
        ((cos(r) * 127 + 128) << 16) |
        ((cos(r + PI2 / 3) * 127 + 128) << 8) |
        (cos(r + (PI2 / 3) * 2) * 127 + 128)
      ).toString(16)
    return color
  }
})()

export const genRandomSexColor = () => {
  /**
   * create one primary color between 7c ~ fb
   */
  let randomPrimaryColor = (
    parseInt(Math.random() * (251 - 124)) + 124
  ).toString(16)
  let colors = ['fb', '7c', randomPrimaryColor]

  let result = '#'
  while (colors.length) {
    let index = parseInt(Math.random() * colors.length)
    result += colors.splice(index, 1)
  }

  return result
}

export const randomChoice = items => {
  items = Array.from(items)
  return items[Math.floor(Math.random() * items.length)]
}

export const randomInt = (min, max) => {
  if (!max) {
    min = 0
    max = min
  }
  return Math.floor(Math.random() * (max - min)) + min
}
