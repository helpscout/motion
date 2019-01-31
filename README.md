# 💫 Motion

> A simple animation library for React

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```
npm install --save @helpscout/motion
```

## Usage

Start adding animations to any React component with the `Motion` component:

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

## Documentation

For additional info on Motion, check out [our documentation](./docs)!
