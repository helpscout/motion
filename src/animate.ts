import * as animate from 'animejs'

/**
 * Wrapper component for the Animation library to conveniently define a
 * default target node
 * @param options
 * @returns Animate
 */
export function createAnimate(options: any = {}) {
  const {node, ...rest} = options
  return animationProps => animate({...rest, targets: node, ...animationProps})
}

export default animate
