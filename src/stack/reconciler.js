import { isFunctionComponent, isClassComponent } from './util';

class Instance {
  element = null
  constructor(element) {
    this.element = element;
  }
}

class CompositeInstance extends Instance {
  componentInstance = null;
  childElement = null;

  getPublicInstance() {
    return this.componentInstance;
  }

  // return DOM
  mount() {
    const { type, props } = this.element;
    if (isClassComponent(type)) {
      this.componentInstance = new type(props);
      if (this.componentInstance.componentWillMount) {
        this.componentInstance.componentWillMount();
      }
      this.childElement = this.componentInstance.render();
    } else if (isFunctionComponent(type)) {
      this.childElement = type(props);
    }
    return createInstance(this.childElement).mount();
  }


  receive(element) {
  }
}

class HostInstance extends Instance {
  node = null;
  childInstances = [];

  getPublicInstance() {
    return this.node;
  }

  // return DOM
  mount() {
    const { type, props } = this.element;
    this.node = createNode(type, props);

    props.children.forEach((child) => {
      const childInstance = createInstance(child);
      this.childInstances.push(childInstance);
    });

    this.childInstances.forEach((child) => {
      this.node.appendChild(child.mount());
    });
    return this.node;
  }

  receive(element) {
  }
}

function createNode(type, props) {
  let node;
  if (type === 'TEXT_ELEMENT') {
    node = document.createTextNode('');
  } else {
    node = document.createElement(type);
  }

  Object.keys(props)
    .filter(key => key !== 'children')
    .forEach((key) => {
      node[key] = props[key];
    });
  return node;
}

function createInstance(element) {
  const { type } = element;
  if (isClassComponent(type) || isFunctionComponent(type)) {
    return new CompositeInstance(element);
  }
  return new HostInstance(element);
}

export function render(element, container) {
  const previousNode = container.firstChild;

  if (!previousNode) {
    const instance = createInstance(element);
    const currentNode = instance.mount();
    currentNode._instance = instance;
    container.appendChild(currentNode);
    return;
  }

  const previousInstance = previousNode._instance;
  // 前面 render 过，且类型相同
  if (previousInstance && previousInstance.type === element.type) {
    previousInstance.receive(element);
  }
}
