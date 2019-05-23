# `withMotion(options)(Component)`

`withMotion` is a higher-order component that renders a Component with `mount`, `update`, and `unmount` based animations. For more info on animations, check out [animate](./animate.md).

## Example

```jsx
import React from 'react'
import {withMotion} from '@helpscout/motion'
import Hansel from './components/Hansel'

class App extends React.Component {
  render() {
    return <AnimatedHansel />
  }
}

const AnimatedHansel = withMotion({
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
  }).finished
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

## Options

**Default Options**

```js
{
  componentDidMount: () => Promise.resolve(),
  componentDidUpdate: () => Promise.resolve(),
  componentWillUnmount: () => Promise.resolve(),
  isAnimateOnInitialMount: true,
  pure: true,
}
```

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

### `isAnimateOnInitialMount`

- **Type** `boolean`
- **Default** `true`

Determines if the component can animate on the initial mount/render.

### `pure`

- **Type** `boolean`
- **Default** `true`

Determines if the component extends from `React.PureComponent` or `React.Component`.
