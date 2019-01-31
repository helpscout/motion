# animate

`animate` is function that creates an animatable instance from Motion's animation engine, [`Anime.js`](https://animejs.com).

Internally, Motion creates an enhanced version of `animate` when instantiated from [`<Motion />`](./Motion.md) or [`withMotion`](./withMotion.md). This is for improved performance handling.

## Example

```js
import {animate} from '@helpscout/motion'

animate({
  targets: '.zoolander .bluesteel',
  translateX: 250,
})
```

Check out [Anime.js](https://animejs.com/documentation/) for a complete documentation.
