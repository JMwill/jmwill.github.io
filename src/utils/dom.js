export const $ = (context, selector) =>
  context.querySelector
    ? context.querySelector(selector)
    : document.querySelector(context)
export const $$ = (context, selector) =>
  Array.from(
    context.querySelectorAll
      ? context.querySelectorAll(selector)
      : document.querySelectorAll(context)
  )

const _addClass = (e, name) => {
  if (e.classList && e.classList.add) {
    name.forEach(n => e.classList.add(n))
  } else {
    let className = e.className.split(' ')
    name.forEach(n => !className.includes(n) && className.push(n))
    e.className = className.join(' ')
  }
}
export const addClass = (context, selector, name) => {
  let addClassList
  if (!name) {
    addClassList = Array.isArray(selector) ? selector : selector.split(' ')
    _addClass(context, addClassList)
  } else {
    addClassList = Array.isArray(name) ? name : name.split(' ')
    $$(context, selector).forEach(e => _addClass(e, addClassList))
  }
}

const _rmClass = (e, name) => {
  if (e.classList && e.classList.remove) {
    name.forEach(n => e.classList.remove(n))
  } else {
    let className = []
    e.className.split(' ').forEach(n => !name.includes() && className.push(n))
    e.className = className.join(' ')
  }
}
export const rmClass = (context, selector, name) => {
  let rmClassList
  if (!name) {
    rmClassList = Array.isArray(selector) ? selector : selector.split(' ')
    _rmClass(context, rmClassList)
  } else {
    rmClassList = Array.isArray(name) ? name : name.split(' ')
    $(context, selector).forEach(e => _rmClass(e, rmClassList))
  }
}

export const isElement = o =>
  typeof HTMLElement === 'object'
    ? o instanceof HTMLElement
    : o &&
      typeof o === 'object' &&
      o !== null &&
      o.nodeType === 1 &&
      typeof o.nodeName === 'string'

export const setStyle = (elem, style) =>
  Array.isArray(elem)
    ? elem.forEach(e =>
      Object.keys(style).forEach(k => (e.style[k] = style[k]))
    )
    : Object.keys(style).forEach(k => (elem.style[k] = style[k]))

export const renderTemplate = selector => {
  const $tmpl = $(selector)
  if ('content' in document.createElement('template')) {
    const $cube = $tmpl.content.cloneNode(true)
    return $cube
  } else {
    const tempElem = document.createElement('div')
    tempElem.innerHTML = $tmpl.innerHTML

    if (tempElem.children.length > 1) {
      const fragment = document.createDocumentFragment()
      Array.from(tempElem.children).forEach(n => fragment.appendChild(n))
      return fragment
    } else {
      return tempElem.children[0]
    }
  }
}
