export class Fiber {
  type = null
  props = null

  parent = null
  child = null
  sibling = null

  dom = false

  constructor(elem, parent) {
    this.type = elem.type;
    this.props = elem.props;
    this.parent = parent;
  }
}
