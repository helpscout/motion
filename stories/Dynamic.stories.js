import React from 'react'
import {storiesOf} from '@storybook/react'
import {StatsGraph} from '@helpscout/stats'
import styled from '@helpscout/fancy'
import withMotion from '../src/withMotion'
import Draggable from 'react-draggable'

const stories = storiesOf('Dynamic Values', module)

stories.add('Velocity + Spring', () => {
  class Example extends React.Component {
    state = {
      x: 0,
      y: 0,
    }

    handleStop = event => {
      const {pageX: x, pageY: y} = event
      this.setState({
        x,
        y,
      })
    }

    render() {
      return (
        <div>
          <StatsGraph />
          <h1>Dynamic Values: Velocity + Spring</h1>
          <p>Move the grey square around</p>
          <p>
            When you drop it, the ball will snap to that position with velocity
            + spring.
          </p>
          <Draggable onStop={this.handleStop}>
            <Target />
          </Draggable>
          <AnimatedBall position={this.state} />
        </div>
      )
    }
  }

  return <Example />
})

const Target = styled('div')`
  height: 20px;
  width: 20px;
  background: #ddd;
  cursor: grab;
  will-change: transform;
  position: absolute;
  top: 50px;
  left: 50px;
  z-index: 2;

  &.react-draggable-dragging {
    cursor: grabbing;
  }
`

const Ball = styled('div')`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background: dodgerblue;
  position: absolute;
  top: 0;
  left: 0;
`

const updateBallPosition = ({node, animate, props}) => {
  const {x, y} = props.position
  const offset = node.clientWidth / 2

  animate({
    translateX: x - offset,
    translateY: y - offset,
  })
}

const AnimatedBall = withMotion({
  componentDidMount: updateBallPosition,
  componentDidUpdate: updateBallPosition,
})(Ball)
