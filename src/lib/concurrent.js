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
function performUnitOfWork(nextUnitOfWork) {
  if (nextUnitOfWork.done) {
    return nextUnitOfWork.sibling
      ? nextUnitOfWork.sibling
      : nextUnitOfWork.parent;
  }

  // todo - perform node

  return nextUnitOfWork.child
    ? nextUnitOfWork.child
    : nextUnitOfWork.sibling
      ? nextUnitOfWork.sibling
      : nextUnitOfWork.parent
}
