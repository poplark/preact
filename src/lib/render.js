import { setWIPRoot, setNextUnitOfWork, workLoop } from "./concurrent" ;
import { Fiber } from "./fiber";

export function render(elem, container) {
  /*
  wipRoot = {
    dom: container,
    props: {
      children: [elem],
    },
  }
  */
  const wipRoot = new Fiber({
    type: 'Root',
    props: {
      children: [elem]
    }
  }, null);
  wipRoot.dom = container;

  setWIPRoot(wipRoot);
  setNextUnitOfWork(wipRoot);
  requestIdleCallback(workLoop);
}
