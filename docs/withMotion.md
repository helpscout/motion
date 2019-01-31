# `withMotion(props)(Component)`

`withMotion` is a higher-order component that renders a Component with `mount`, `update`, and `unmount` based animations. For more info on animations, check out [animate](./animate.md).

## Example

```jsx
import React from 'react'
import {withMotion} from '@helpscout/motion'
import Zoolander from './components/Zoolander'

class App extends React.Component {
  render() {
    return <AnimatedZoolander />
  }
}

const AnimatedZoolander = withMotion({
  componentDidMount: fadeInAndMoveUp,
  componentDidUpdate: moveLeftRight,
  componentWillUnmount: fadeOut,
})

// Technically these animation callbacks can be writing in line.
// It's advisable to keep them as separate functions to make the code
// more readable.
function fadeInAndMoveUp({animate}) {
  return animate({
    opacity: [0, 1],
    translateY: [-20, 0],
  })
}

function moveLeftRight({animate}) {
  return animate({
    keyframes: [
      {
        translateX: 10,
      },
      {
        translateX: -10,
      },
      {
        translateX: 0,
      },
    ],
  })
}

function fadeOut({animate}) {
  return animate({
    opacity: [0, 1],
    duration: 500,
    easing: 'linear',
  })
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

### `componentDidUpdate({ node, animate, props })`

- **Type** `Function<Promise>`
- **Default** `() => Promise.resolve()`

Promise that runs when the component is updated.

**Arguments**

| Prop      | Type          | Description                                     |
| --------- | ------------- | ----------------------------------------------- |
| node      | `HTMLElement` | The target DOM element.                         |
| animate   | `Function`    | The [animate](./animate.md) function.           |
| prevProps | `Object`      | Previous props passed to the wrapped Component. |
| props     | `Object`      | Previous props passed to the wrapped Component. |

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
