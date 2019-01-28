import * as React from 'react'
import * as ReactDOM from 'react-dom'
import animate from './animate'
import hoistNonReactStatics from '@helpscout/react-utils/dist/hoistNonReactStatics'
import {sequenceNodeMount, sequenceNodeUnmount} from './utils'

const defaultOptions = {
  componentDidMount: () => Promise.resolve(),
  componentDidUpdate: () => Promise.resolve(),
  componentWillUnmount: () => Promise.resolve(),
}

export interface Props {
  componentDidMount: any
  componentDidUpdate: any
  componentWillUnmount: any
}

const withMotion = (options: any = defaultOptions) => WrappedComponent => {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  }
  const {
    componentDidUpdate,
    componentDidMount,
    componentWillUnmount,
  } = mergedOptions

  class MotionWrapper extends React.PureComponent<Props> {
    node: HTMLElement

    componentDidMount() {
      this.node = ReactDOM.findDOMNode(this)

      sequenceNodeMount({
        node: this.node,
        componentDidMount,
        props: this.props,
      })
    }

    componentDidUpdate(prevProps) {
      if (!this.node) return

      componentDidUpdate({
        node: this.node,
        animate,
        props: this.props,
        prevProps,
      })
    }

    componentWillUnmount() {
      sequenceNodeUnmount({
        node: this.node,
        componentWillUnmount,
        props: this.props,
      })
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return hoistNonReactStatics(MotionWrapper, WrappedComponent)
}

export default withMotion
