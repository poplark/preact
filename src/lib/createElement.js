
function isFunctionComponent(p) {
  return Object.prototype.toString.call(p).indexOf('Function') >= 0;
}

function isClassComponent(p) {
  return p.prototype.constructor === p;
}

function createTextElement(txt) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: txt,
      children: []
    }
  }
}

/**
 * 创建一个 VDOM / Fiber
 * @param {*} type 
 * @param {*} props 
 * @param  {...any} children 
 * @returns 
 */
export function createElement(type, props, ...children) {
  if (isFunctionComponent(type)) {
    // todo - children
    if (isClassComponent(type)) {
      return new type(props);
    } else {
      return type(props);
    }
  }
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === 'object'
          ? child
          : createTextElement(child);
      }),
    }
  }
}
