# `<Motion>`

`Motion` renders component with `mount`/`unmount` based animations. For more info on animations, check out [animate](./animate.md).

## Example

```jsx
import React from 'react'
import {Motion} from '@helpscout/motion'
import Zoolander from './components/Zoolander'

class App extends React.Component {
  render() {
    return (
      <Motion
        componentDidMount={fadeInAndMoveUp}
        componentWillUnmount={fadeOut}
      >
        <Zoolander />
      </Motion>
    )
  }
}

// Technically these animation callbacks can be writing in line.
// It's advisable to keep them as separate functions to make the code
// more readable.
function fadeInAndMoveUp({animate}) {
  return animate({
    opacity: [0, 1],
    translateY: [-20, 0],
  }).finished
}

function fadeOut({animate}) {
  return animate({
    opacity: [0, 1],
    duration: 500,
    easing: 'linear',
  }).finished
}
```

## Props

### `componentDidMount({ node, animate, props })`

- **Type** `Function<Promise>`
- **Default** `() => Promise.resolve()`

Promise that runs when the component is mounted.

**Arguments**

| Prop    | Type          | Description                           |
| ------- | ------------- | ------------------------------------- |
| node    | `HTMLElement` | The target DOM element.               |
| animate | `Function`    | The [animate](./animate.md) function. |
| props   | `Object`      | Props passed to `<Motion />`.         |

---

### `componentWillUnmount({ node, animate, props })`

- **Type** `Function<Promise>`
- **Default** `() => Promise.resolve()`

Promise that runs when the component is unmounted.

**Arguments**

| Prop    | Type          | Description                           |
| ------- | ------------- | ------------------------------------- |
| node    | `HTMLElement` | The target DOM element.               |
| animate | `Function`    | The [animate](./animate.md) function. |
| props   | `Object`      | Props passed to `<Motion />`.         |
