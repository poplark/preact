export class Component {
  static isClassComponent = true

  /**
   * state: obj | setFunc(state) => newState
   */
  setState(state, callback) {
    const nextState = Object.assign(this.state, state);
    let needRender = true;
    if (this.shouldComponentUpdateUpdate) {
      needRender = this.shouldComponentUpdate(this.props);
    }
    if (needRender && this.componentWillUpdate) {
      this.componentWillUpdate(this.props, nextState);
    }
    this.state = nextState;
    if (needRender) {
      const newElement = this.render();
      this.host && this.host.childInstance.receive(newElement);
      if (this.componentDidUpdate) {
        this.componentDidUpdate();
      }
    }
    callback && callback(this.state);
  }

  forceUpdate() {
    this.host && this.host.receive(this.render());
  }
}

export class PureComponent extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }
}
