import * as React from 'react'
import Motion from './Motion'

export interface Props {
  children: any
  duration: number
  easing: any
}

export class Fade extends React.PureComponent<Props> {
  static defaultProps = {
    easing: 'linear',
    duration: 500,
  }

  onMount = ({node, animate}) => {
    const {duration, easing} = this.props

    return animate({
      targets: node,
      duration,
      easing,
      opacity: [0, 1],
    }).finished
  }

  onUnmount = ({node, animate}) => {
    const {duration, easing} = this.props

    return animate({
      targets: node,
      duration,
      easing,
      opacity: [1, 0],
    }).finished
  }

  render() {
    return (
      <Motion
        componentDidMount={this.onMount}
        componentWillUnmount={this.onUnmount}
      >
        {this.props.children}
      </Motion>
    )
  }
}

export default Fade
