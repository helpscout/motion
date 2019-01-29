import React from 'react'
import {storiesOf} from '@storybook/react'
import {StatsGraph} from '@helpscout/stats'
import styled from '@helpscout/fancy'
import {createSpec, faker} from '@helpscout/helix'

import withMotion from '../src/withMotion'

const stories = storiesOf('EmojiMenu', module)

stories.add('Example', () => {
  class Example extends React.Component {
    state = {
      emojis: ['🤗', '🚀', '❤️', '👋', '⭐️', '🔥', '🌈'],
      show: false,
    }

    toggle = () => {
      this.setState({
        show: !this.state.show,
      })
    }

    render() {
      return (
        <div>
          <StatsGraph />
          <button onClick={this.toggle}>Toggle</button>
          <br />
          <br />
          {this.state.show && (
            <AnimatedEmojiList>
              {this.state.emojis.map((item, index) => (
                <Emoji className="emoji" key={index}>
                  <EmojiIcon>{item}</EmojiIcon>
                </Emoji>
              ))}
            </AnimatedEmojiList>
          )}
        </div>
      )
    }
  }

  return <Example />
})

const Emoji = styled('span')`
  display: inline-block;
  font-size: 32px;
  width: 32px;
  height: 32px;
  margin: 0 5px;
  user-select: none;
  will-change: opacity, transform;
`

const EmojiIcon = styled('span')`
  cursor: pointer;
  display: block;
  transform: scale(1);
  transition: all 200ms ease;
  will-change: transform;

  &:hover {
    transform: scale(1.1) translateY(-2px);
  }
  &:active {
    transform: scale(0.9) translateY(2px);
  }
`

const EmojiList = styled('div')`
  border-radius: 8px;
  padding: 8px;
  border: 1px solid #ddd;
  display: inline-block;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 10px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  will-change: opacity, transform;
`

const AnimatedEmojiList = withMotion({
  componentDidMount: ({node, animate}) => {
    animate({
      targets: node.querySelectorAll('.emoji'),
      translateY: [20, 0],
      opacity: [0, 1],
      delay: animate.stagger(60),
    })
    animate({
      translateY: [20, 0],
      opacity: [0, 1],
    })
  },
  componentWillUnmount: ({node, animate}) => {
    animate({
      targets: node.querySelectorAll('.emoji'),
      translateY: 20,
      opacity: 0,
      delay: animate.stagger(20),
      duration: 400,
    })
    return animate({
      translateY: 20,
      opacity: 0,
      duration: 150,
      easing: 'linear',
    }).finished
  },
})(EmojiList)
