import * as animate from 'animejs'
import {doCallback} from './utils'

// Plucking the method names from the Animation library.
const METHODS = Object.keys(animate)

/**
 * Wrapper component for the Animation library to conveniently define a
 * default target node
 * @param {Object} options The options to create an Animation instance.
 * @returns {Object} Animate The Animation instance.
 */
export function createAnimate(options: any = {}) {
  const {node, ...rest} = options

  const animation = animationProps => {
    return wrappedAnimate({...rest, targets: node}, animationProps)
  }

  return mergeMethodsWithAnimate(animation)
}

/**
 * Hoists the methods from the Animation to the custom wrapped animation
 * instance.
 * @param {Object} animation The Animation instance.
 * @param {Array<any>} methods An array of methods/static properties to merge.
 * @returns {Object} The enhanced Animation instance.
 */
export function mergeMethodsWithAnimate(animation, methods = METHODS) {
  for (let i = 0, len = methods.length; i < len; i++) {
    const key = methods[i]
    animation[key] = animate[key]
  }

  return animation
}

/**
 * Higher-order function to create the Animation instance. The purpose of this
 * is to to add performance adjustments, without modifying the original
 * Animation class.
 * @param {Object} props Custom properties.
 * @param {Object} animationProps Properties for the Animation library.
 * @returns {Object} The wrapped Animation instance.
 */
export function wrappedAnimate(props, animationProps) {
  const {begin, complete, ...rest} = animationProps

  return animate({
    ...props,
    ...rest,
    begin: anim => {
      const properties = getAnimationProperties(anim.animations)
      addWillChangeToAnimatables(anim.animatables, properties)

      doCallback(begin)(anim)
    },
    complete: anim => {
      doCallback(complete)(anim)
    },
  })
}

/**
 * Retrieves a concatted string of animatable CSS properties for an animation.
 * @param {Array<any>} animations Collection of animation sequences.
 * @returns {string} The animation CSS properties.
 */
export function getAnimationProperties(animations: Array<any> = []): string {
  const properties = {}

  for (let i = 0, len = animations.length; i < len; i++) {
    const animation = animations[i]
    const prop = getCSSPropertyFromAnimation(animation)

    if (prop && typeof prop === 'string' && !properties[prop]) {
      properties[prop] = true
    }
  }

  return Object.keys(properties).join(',')
}

/**
 * Retrieves the CSS property from an animation sequence.
 * @param {Object} animation The animation sequence.
 * @returns {string} The CSS property.
 */
export function getCSSPropertyFromAnimation(animation): string {
  const {property, type} = animation

  return type === 'transform' ? type : property
}

/**
 * Adds the `will-change` CSS property to the DOM target of an animation
 * sequence. Since the Animation library (currently) does not support this,
 * we need to do this for (GPU) rendering performance.
 * @param {Array<any>} animatables A collection of animatables from an Animation instance.
 * @param {string} properties A collection of CSS properties to observe.
 * @returns {Array<any>} The originalcollection of animatables.
 */
export function addWillChangeToAnimatables(
  animatables: Array<any>,
  properties: string | null,
): Array<any> {
  for (let i = 0, len = animatables.length; i < len; i++) {
    const animatable = animatables[i]
    if (animatable.target) {
      animatable.target.style.willChange = properties
    }
  }

  return animatables
}

export default animate
