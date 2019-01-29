import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  sequenceNodeMount,
  sequenceNodeUpdate,
  sequenceNodeUnmount,
} from './utils'

export interface Props {
  componentDidMount: any
  componentDidUpdate: any
  componentWillUnmount: any
}

export class Motion extends React.PureComponent<Props> {
  static defaultProps = {
    componentDidMount: () => Promise.resolve(),
    componentDidUpdate: () => Promise.resolve(),
    componentWillUnmount: () => Promise.resolve(),
  }

  node: HTMLElement
  animation: any

  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this)

    sequenceNodeMount({
      node: this.node,
      componentDidMount: this.props.componentDidMount,
      props: this.props,
    })
  }

  componentDidUpdate(prevProps) {
    if (this.animation) {
      this.animation.pause()
    }

    sequenceNodeUpdate({
      node: this.node,
      componentDidUpdate: this.props.componentDidUpdate,
      props: this.props,
      prevProps,
      callback: animation => (this.animation = animation),
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
