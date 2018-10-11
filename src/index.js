import 'normalize.css/normalize.css'
import './index.css'

import utils from './utils'
import Cube from './components/cube'

const W = window.innerWidth
const H = window.innerHeight
const genCubeConfig = existCubeConfig => {
  const config = {
    size: utils.randomInt(100, 200),
    animate: true,
    colorful: true,
    clickable: true,
  }
  let x = Math.random() * W
  let y = Math.random() * H
  while (x > W - config.size || x < config.size) {
    x = Math.random() * W
  }
  while (y > H - config.size || y < config.size) {
    y = Math.random() * H
  }
  config.x = x
  config.y = y
  return config
}

function getCubeList(num = 5) {
  const cubeConfigList = []
  let i
  for (i = 0; i < num; i++) {
    cubeConfigList.push(genCubeConfig(cubeConfigList))
  }

  return cubeConfigList.map(c => {
    const cube = new Cube(c.size)
    cube.setPos({top: c.y + 'px', left: c.x + 'px'})
    c.animate && cube.animate()
    c.colorful && cube.setRandomColor()
    c.clickable && cube.setClickReaction()
    return cube
  })
}

function appendCubeList() {
  let cubeList = getCubeList()
  cubeList.forEach(c => c.appendTo(document.body))
  return cubeList
}

document.addEventListener('DOMContentLoaded', () => {
  let cubeList = appendCubeList()
  document.addEventListener('click', () => {
    cubeList.forEach(c => c.destroy())
    cubeList = appendCubeList()
  })
})
