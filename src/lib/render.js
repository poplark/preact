export function render(elem, container) {
  let node;
  if (elem.type === 'TEXT_ELEMENT') {
    node = document.createTextNode('');
  } else {
    node = document.createElement(elem.type);
  }
  const keys = Object.keys(elem.props);
  for(let key of keys) {
    if (key !== 'children') {
      node[key] = elem.props[key];
    }
  }
  elem.node = node;
  elem.props.children.forEach((child) => {
    render(child, elem.node);
  });
  container.appendChild(elem.node);
}
