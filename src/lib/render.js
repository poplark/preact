function createDOM(fiber) {
  /*
  let node;
  if (elem.type === 'TEXT_ELEMENT') {
    node = document.createTextNode('');
  } else {
    node = document.createElement(elem.type);
  }
  const isProperty = key => key !== "children"
  Object.keys(elem.props)
    .filter(isProperty)
    .forEach((key) => {
      node[key] = elem.props[key];
    });
  elem.props.children.forEach((child) => {
    render(child, node);
  });
  elem.node = node;
  container.appendChild(elem.node);
  */
}

export function render(elem, container) {
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [elem],
    },
  }
}
