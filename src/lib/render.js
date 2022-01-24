import { setNextUnitOfWork, workLoop } from "./concurrent" ;
import { Fiber } from "./fiber";

let wipRoot = null;

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

  setNextUnitOfWork(wipRoot);
  requestIdleCallback(workLoop);
}
