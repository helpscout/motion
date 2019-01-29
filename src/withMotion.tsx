import * as React from 'react'
import hoistNonReactStatics from '@helpscout/react-utils/dist/hoistNonReactStatics'
import wrapComponentName from '@helpscout/react-utils/dist/wrapComponentName'
import Motion from './Motion'

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

    render() {
      const motionProps = {
        componentDidUpdate,
        componentDidMount,
        componentWillUnmount,
      }

      return (
        <Motion {...motionProps}>
          <WrappedComponent {...this.props} />
        </Motion>
      )
    }
  }

  return hoistNonReactStatics(MotionWrapper, WrappedComponent)
}

export default withMotion
