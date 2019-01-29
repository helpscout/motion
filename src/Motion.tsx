import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {sequenceNodeMount, sequenceNodeUnmount} from './utils'

export interface Props {
  componentDidMount: any
  componentWillUnmount: any
}

export class Motion extends React.PureComponent<Props> {
  static defaultProps = {
    componentDidMount: () => Promise.resolve(),
    componentWillUnmount: () => Promise.resolve(),
  }

  node: HTMLElement

  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this)

    sequenceNodeMount({
      node: this.node,
      componentDidMount: this.props.componentDidMount,
      props: this.props,
    })
  }

  componentWillUnmount() {
    sequenceNodeUnmount({
      node: this.node,
      componentWillUnmount: this.props.componentWillUnmount,
      props: this.props,
    })
  }

  render() {
    return this.props.children
  }
}

export default Motion
