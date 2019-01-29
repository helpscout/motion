import * as React from 'react'
import * as ReactDOM from 'react-dom'
import hoistNonReactStatics from '@helpscout/react-utils/dist/hoistNonReactStatics'
import wrapComponentName from '@helpscout/react-utils/dist/wrapComponentName'
import {
  sequenceNodeMount,
  sequenceNodeUpdate,
  sequenceNodeUnmount,
} from './utils'

const defaultOptions = {
  componentDidMount: () => Promise.resolve(),
  componentDidUpdate: () => Promise.resolve(),
  componentWillUnmount: () => Promise.resolve(),
  pure: true,
}

/**
 * Higher-order component that wraps a component with <Motion>
 * @returns {React.Component} Wrapped React component
 */
const withMotion = (options: any = defaultOptions) => WrappedComponent => {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  }
  const {
    componentDidUpdate,
    componentDidMount,
    componentWillUnmount,
    pure,
  } = mergedOptions

  const OuterBaseComponent = pure ? React.PureComponent : React.Component

  class MotionWrapper extends OuterBaseComponent {
    static displayName = wrapComponentName(WrappedComponent, 'withMotion')
    node: HTMLElement
    animation: any

    componentDidMount() {
      this.node = ReactDOM.findDOMNode(this)

      sequenceNodeMount({
        node: this.node,
        componentDidMount: componentDidMount,
        props: this.props,
      })
    }

    componentDidUpdate(prevProps) {
      if (this.animation) {
        this.animation.pause()
      }

      sequenceNodeUpdate({
        node: this.node,
        componentDidUpdate: componentDidUpdate,
        props: this.props,
        prevProps,
        callback: animation => (this.animation = animation),
      })
    }

    componentWillUnmount() {
      sequenceNodeUnmount({
        node: this.node,
        componentWillUnmount: componentWillUnmount,
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
