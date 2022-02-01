export class Component {
  static isClassComponent = true
}

export class PureComponent extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }
}
