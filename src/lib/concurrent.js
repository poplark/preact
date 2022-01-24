import { Fiber} from './fiber';
import { createDOM } from './createDOM';

let wipRoot = null;
export let nextUnitOfWork = null;

export function setNextUnitOfWork(fiber) {
  nextUnitOfWork = fiber;
}

export function setWIPRoot(fiber) {
  wipRoot = fiber;
}

function commitRoot() {
  commitWork(wipRoot.child);
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) return;
  fiber.parent.dom.appendChild(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
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

  nextUnitOfWork = wipRoot;
  requestIdleCallback(workLoop);
}
