import { isFunctionComponent, isClassComponent } from './util';

/**
 * 实例 - 用于 reconciler
 * 包含
 *  - jsx 生成的 element
 */
class Instance {
  element = null
  constructor(element) {
    this.element = element;
  }
}

/**
 * 组合实例 - 对应 class 组件，无状态的 functional 组件
 * 包含
 *  - class 组件时，包含 class 组件实例
 *  - class 和 functional 组件时，包含子实例（组合实例或宿主实例）
 */
class CompositeInstance extends Instance {
  componentInstance = null;
  childElement = null;

  getPublicInstance() {
    return this.componentInstance;
  }

  /**
   * 返回子实例的 mount 结果
   * - 若子实例也为组合实例，则继续调用子实例的子实例的 mount 并返回结果，依次类推，直到返回 DOM
   * - 若子实例为宿主实例，则 mount 的结果为 DOM，直接返回该结果
   */
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
    // todo - 不需要记录子实例么??
    return createInstance(this.childElement).mount();
  }


  receive(element) {
  }
}

/**
 * 宿主实例 - 对应 HTMLElement
 */
class HostInstance extends Instance {
  node = null;
  childInstances = [];

  getPublicInstance() {
    return this.node;
  }

  /**
   * 返回对应的 DOM
   */
  mount() {
    const { type, props } = this.element;
    this.node = createNode(type, props);

    // 对于每个 child element，创建对应的实例作为子实例
    props.children.forEach((child) => {
      const childInstance = createInstance(child);
      this.childInstances.push(childInstance);
    });

    // 将每个子实例，调用 mount 并挂载到自己的 DOM 节点中
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

  // 若没有子节点，则直接创建实例，并执行实例的 mount 方法，生成 DOM 添加到 container 中
  if (!previousNode) {
    const instance = createInstance(element);
    const currentNode = instance.mount();
    currentNode._instance = instance;
    container.appendChild(currentNode);
    return;
  }

  const previousInstance = previousNode._instance;
  if (previousInstance && previousInstance.element.type === element.type) {
    // 之前的子节点是挂载的实例，且与新挂载的是同类型，则做更新操作
    previousInstance.receive(element);
  } else {
    // 之前的子节点不是挂载的实例时，那么就创建实例并替换
    const instance = createInstance(element);
    const currentNode = instance.mount();
    currentNode._instance = instance;
    container.replaceChild(currentNode, previousNode);
  }
}
