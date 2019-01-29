import React from 'react'
import {storiesOf} from '@storybook/react'
import {StatsGraph} from '@helpscout/stats'
import styled from '@helpscout/fancy'
import {createSpec, faker} from '@helpscout/helix'
import withMotion from '../src/withMotion'

const stories = storiesOf('Messaging', module)

stories.add('Example', () => {
  class Example extends React.Component {
    state = {
      items: [],
    }

    addReply = () => {
      this.setState({
        items: [...this.state.items, ReplySpec.generate()],
      })
      this.scrollToBottom()
    }

    addMessage = () => {
      this.setState({
        items: [...this.state.items, MessageSpec.generate()],
      })
      this.scrollToBottom()
    }

    scrollToBottom = () => {
      requestAnimationFrame(() => {
        this.node.scrollTop = 100000
      })
    }

    setNodeRef = node => (this.node = node)

    render() {
      return (
        <div>
          <StatsGraph />
          <button onClick={this.addMessage}>Add Message</button>
          <button onClick={this.addReply}>Add Reply</button>
          <hr />
          <MessageList innerRef={this.setNodeRef}>
            {this.state.items.map((item, index) => (
              <AnimatedBubble {...item} />
            ))}
          </MessageList>
        </div>
      )
    }
  }

  return <Example />
})

const MessageSpec = createSpec({
  id: faker.random.uuid(),
  body: faker.lorem.sentence(),
  type: 'from',
})

const ReplySpec = createSpec({
  id: faker.random.uuid(),
  body: faker.lorem.sentence(),
  type: 'to',
})

const MessageList = styled('div')`
  width: 350px;
  max-height: 80vh;
  height: 480px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  scroll-behavior: smooth;
  margin: auto;
  font-family: sans-serif;
`

const BubbleWrapper = styled('div')`
  display: flex;
  margin: 0 0 15px;

  &.is-from + .is-from,
  &.is-to + .is-to {
    margin-top: -12px;
  }
`

const BubbleUI = styled('div')`
  padding: 5px 10px;
  display: inline-block;
  border-radius: 15px;
  background: #ddd;
  font-size: 13px;
  text-align: left;
  margin-right: auto;
  margin-left: 0;
  max-width: 80%;

  ${({type}) =>
    type === 'to' &&
    `
    background: dodgerblue;
    color: white;
    text-align: right;
    margin-left: auto;
    margin-right: 0;
  `}
`

class Bubble extends React.PureComponent {
  render() {
    const {body, isTyping, type} = this.props
    return (
      <BubbleWrapper className={`is-${type}`}>
        <BubbleUI className="bubble" type={type}>
          {isTyping ? '...' : body}
        </BubbleUI>
      </BubbleWrapper>
    )
  }
}

const AnimatedBubble = withMotion({
  componentDidMount: ({node, animate}) => {
    const bubbleNode = node.querySelector('.bubble')
    animate({
      targets: bubbleNode,
      opacity: [0, 1],
      translateY: [10, 0],
    })
  },
})(Bubble)
