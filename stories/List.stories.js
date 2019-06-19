import React from 'react'
import {storiesOf} from '@storybook/react'
import {StatsGraph} from '@helpscout/stats'
import styled from '@helpscout/fancy'
import {createSpec, faker} from '@helpscout/helix'

import withMotion from '../src/withMotion'

const stories = storiesOf('List', module)

const ItemSpec = createSpec({
  title: faker.lorem.sentence(),
  excerpt: faker.lorem.paragraph(),
})

stories.add('Example', () => {
  class Example extends React.Component {
    state = {
      items: ItemSpec.generate(5),
    }

    add = () => {
      this.setState({
        items: [...this.state.items, ItemSpec.generate()],
      })
    }

    remove = index => {
      this.setState({
        items: this.state.items.filter((item, i) => {
          return i !== index
        }),
      })
    }

    render() {
      return (
        <div>
          <StatsGraph />
          <button onClick={this.add}>Add Link</button>
          <hr />
          <List>
            {this.state.items.map((item, index) => (
              <AnimatedListItem
                key={item.title}
                {...item}
                onRemove={() => this.remove(index)}
              />
            ))}
          </List>
        </div>
      )
    }
  }

  return <Example />
})

class ListItem extends React.PureComponent {
  render() {
    return (
      <Item key={this.props.title}>
        <button onClick={this.props.onRemove}>Delete</button>
        <ItemInner>
          {this.props.title}
          <Excerpt>
            <div className="content">{this.props.excerpt}</div>
          </Excerpt>
        </ItemInner>
      </Item>
    )
  }
}

const List = styled('div')`
  font-family: sans-serif;
  position: relative;
  border: 1px solid #eee;
  box-sizing: border-box;
  overflow-x: hidden;
`

const Item = styled('div')`
  box-sizing: border-box;
  background: white;
  cursor: pointer;
  text-transform: capitalize;
  border-bottom: 1px solid #eee;
  overflow: hidden;
`

const ItemInner = styled('div')`
  padding: 8px 10px;
`

const Excerpt = styled('div')`
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  color: #888;
  font-size: 14px;
  padding: 10px 0;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
    height: 20px;
  }
`

const AnimatedListItem = withMotion({
  isAnimateOnInitialMount: false,
  componentDidMount: ({node, animate}) => {
    animate({
      keyframes: [
        {
          height: [0, node.clientHeight],
          opacity: [0, 1],
        },
      ],
    }).finished.then(() => {
      node.style.height = 'auto'
    })
  },
  componentWillUnmount: ({node, animate}) => {
    node.style.height = `${node.clientHeight}px`

    return animate({
      keyframes: [
        {
          opacity: [1, 0],
          translateX: '-100%',
        },
        {
          height: 0,
        },
      ],
      duration: 300,
      easing: 'linear',
    }).finished
  },
})(ListItem)
