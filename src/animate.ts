import * as animate from 'animejs'

const METHODS = Object.keys(animate)

export function enhanceWithAnimateMethods(animation) {
  for (let i = 0, len = METHODS.length; i < len; i++) {
    const key = METHODS[i]
    animation[key] = animate[key]
  }

  return animation
}

/**
 * Wrapper component for the Animation library to conveniently define a
 * default target node
 * @param options
 * @returns Animate
 */
export function createAnimate(options: any = {}) {
  const {node, ...rest} = options
  const animation = animationProps =>
    animate({...rest, targets: node, ...animationProps})

  return enhanceWithAnimateMethods(animation)
}

export default animate
