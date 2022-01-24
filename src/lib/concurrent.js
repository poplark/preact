import { Fiber} from './fiber';
import { createDOM } from './createDOM';

let wipRoot = null;
let currentRoot = null;
let deletions = [];
export let nextUnitOfWork = null;

export function setNextUnitOfWork(fiber) {
  nextUnitOfWork = fiber;
}

export function setWIPRoot(fiber) {
  wipRoot = fiber;
}

function commitRoot() {
  deletions.forEach((fiber) => {
    fiber.parent.dom.removeChild(fiber.dom);
  });
  deletions = [];
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function updateDOM(fiber) {
  // todo - 删除的 props
  // todo - 新增的 props, 变更的 props
  // todo - event listener
  const dom = fiber.dom;
  const props = fiber.props;
  Object.keys(props)
    .filter((key) => key !== 'children')
    .forEach((key) => {
      dom[key] = props[key];
    });
}

function commitWork(fiber) {
  if (!fiber) return;
  switch (fiber.effectTag) {
    case 'UPDATE':
      updateDOM(fiber);
      commitWork(fiber.child);
      commitWork(fiber.sibling);
      break;
    case 'ADD':
      fiber.parent.dom.appendChild(fiber.dom);
      commitWork(fiber.child);
      commitWork(fiber.sibling);
      break;
    case 'DELETE':
      // 不会有 delete 的，统一处理 deletions 数组中的
      break;
    default:
      break;
  }
  /*
  fiber.parent.dom.appendChild(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
  */
}

export function workLoop(deadline) {
  let shouldYield = false;
  while(nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);

    if (deadline.timeRemaining() < 1) {
      shouldYield = true;
    }

    if (!nextUnitOfWork && wipRoot) {
      commitRoot();
    }
  }
  requestIdleCallback(workLoop);
}

function reconcilerChildren(wipFiber, elements) {
  let idx = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;

  let prevSibling = null;
  while(oldFiber || idx < elements.length) {
    const element = elements[idx];

    let newFiber = null;
    const sameType =
      oldFiber &&
      element &&
      element.type === oldFiber.type

    if (sameType) {
      newFiber = new Fiber(element, wipFiber);
      newFiber.alternate = oldFiber;
      newFiber.dom = oldFiber.dom;
      newFiber.effectTag = 'UPDATE';
    }
    if (element && !sameType) {
      newFiber = new Fiber(element, wipFiber);
      newFiber.alternate = null;
      newFiber.effectTag = 'ADD';
    }
    if (oldFiber && !sameType) {
      oldFiber.effectTag = 'DELETE';
      deletions.push(oldFiber);
    }

    if (idx === 0) {
      wipFiber.child = newFiber;
    }
    if (prevSibling) {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    idx ++;
  }
}

/**
 * 
 * @param {*} nextUnitOfWork Fiber
 * the performUnitOfWork function, there we will do three things for each fiber:
 * 1. add the element to the DOM
 * 2. create the fibers for the element’s children
 * 3. select the next unit of work
 */
function performUnitOfWork(fiber) {
  // 1. 将 Element 添加到 DOM 结点
  if (!fiber.dom) {
    fiber.dom = createDOM(fiber);
  }

  // 2. 给 Child Element 创建 Fiber 结点
  /*
  const children = fiber.props.children;
  let index = 0
  let prevSibling = null
  while (index < children.length) {
    const _fiber = new Fiber(children[index], fiber);
    if (index === 0) {
      fiber.child = _fiber;
    } else {
      prevSibling.sibling = _fiber;
    }
    prevSibling = _fiber;
    index ++;
  }
  */
  reconcilerChildren(fiber, fiber.props.children);

  // 3. 找出下一个 work unit
  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;

  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

export function render(elem, container) {
  /*
  wipRoot = {
    dom: container,
    props: {
      children: [elem],
    },
  }
  */
  wipRoot = new Fiber({
    type: 'Root',
    props: {
      children: [elem]
    }
  }, null);
  wipRoot.dom = container;
  wipRoot.alternate = currentRoot;

  nextUnitOfWork = wipRoot;
  requestIdleCallback(workLoop);
}
