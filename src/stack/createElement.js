function createTextElement(txt) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: txt,
      children: []
    }
  }
}

export function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === 'object'
          ? child
          : createTextElement(child)
      })
    }
  }
}
