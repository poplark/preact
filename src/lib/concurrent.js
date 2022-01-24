import { Fiber} from './fiber';
let nextUnitOfWork = null;

function workLoop(deadline) {
  let shouldYield = false;
  while(nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performWork(nextUnitOfWork);

    if (deadline.timeRemain < 1) {
      shouldYield = true;
    }
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

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
  // 需要判断 dom 存在?
  // if (!fiber.dom) {
  fiber.dom = createDOM(fiber);
  // }

  // 需要判断 parent 存在?
  // if (fiber.parent) {
  fiber.parent.dom.appendChild(fiber.dom);
  // }

  // 2. 给 Child Element 创建 Fiber 结点
  const children = fiber.props.children;
  let index = 0
  let prevSibling = null
  while (index < children.length) {
    const _fiber = new Fiber(children[i], fiber);
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
