import React from 'react'
import {storiesOf} from '@storybook/react'
import {StatsGraph} from '@helpscout/stats'
import styled from '@helpscout/fancy'
import {createSpec, faker} from '@helpscout/helix'

import withMotion from '../src/withMotion'

const stories = storiesOf('NavBar', module)

const LinkSpec = createSpec({
  title: faker.lorem.word(),
})

stories.add('Example', () => {
  class Example extends React.Component {
    state = {
      activeIndex: 0,
      items: LinkSpec.generate(5),
    }

    addLink = () => {
      this.setState({
        items: [...this.state.items, LinkSpec.generate()],
      })
    }

    removeLink = () => {
      this.setState({
        items: this.state.items.slice(0, -1),
        activeIndex: 0,
      })
    }

    selectItem = event => {
      const activeIndex = parseInt(event.target.getAttribute('data-index'), 10)

      this.setState({
        activeIndex,
      })
    }

    render() {
      return (
        <div>
          <StatsGraph />
          <button onClick={this.addLink}>Add Link</button>
          <button onClick={this.removeLink}>Remove Link</button>
          <hr />
          <NavBar>
            {this.state.items.map((item, index) => (
              <NavItem
                className={
                  this.state.activeIndex === index ? 'item active' : null
                }
                key={item.title}
                data-index={index}
                onClick={this.selectItem}
              >
                {item.title}
              </NavItem>
            ))}
            <AnimatedStripe
              activeIndex={this.state.activeIndex}
              linkCount={this.state.items.length}
            />
          </NavBar>
        </div>
      )
    }
  }

  return <Example />
})

const NavBar = styled('div')`
  display: flex;
  font-family: sans-serif;
  position: relative;
  margin: 10%;
`

const NavItem = styled('div')`
  cursor: pointer;
  padding: 8px 10px;
  text-transform: capitalize;
`

const Stripe = styled('div')`
  height: 3px;
  background-color: dodgerblue;
  width: 0;
  position: absolute;
  bottom: 0;
  left: 0;
`

const animateStripeUI = ({node, animate}) => {
  const itemNode = document.querySelector('.item.active')
  if (!itemNode) return
  animate({
    targets: node,
    width: itemNode.clientWidth,
    translateX: itemNode.offsetLeft,
  })
}

const AnimatedStripe = withMotion({
  componentDidMount: animateStripeUI,
  componentDidUpdate: animateStripeUI,
})(Stripe)
