import { Fiber} from './fiber';
import { createDOM } from './createDOM';

export let nextUnitOfWork = null;

export function setNextUnitOfWork(fiber) {
  nextUnitOfWork = fiber;
}

export function workLoop(deadline) {
  let shouldYield = false;
  while(nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);

    if (deadline.timeRemain < 1) {
      shouldYield = true;
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

  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  // 2. 给 Child Element 创建 Fiber 结点
  const children = fiber.props.children;
  let index = 0
  let prevSibling = null
  while (index < children.length) {
    const _fiber = new Fiber(children[index], fiber);
    if (index === 0) {
      fiber.children = _fiber;
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
