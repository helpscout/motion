import {createAnimate} from './animate'

/**
 * Determines if the current environment is a test environment.
 * We need to prevent the animations from happening, since rAF may be
 * mocked.
 */
export const isTestEnv = () => {
  if (!process || !process.env) return
  const currentEnv = process.env.NODE_ENV || process.env.BABEL_ENV || ''

  return currentEnv.toLowerCase() === 'test'
}

/**
 * Determines if an entity is a function
 * @param {any} entity The entity.
 * @returns {boolean} The result.
 */
export const isFn = entity => typeof entity === 'function'

/**
 * Executes only valid callbacks with arguments
 * @param {Function} callback The callback.
 * @param {any} args The arguments.
 * @returns {any} The result of the executed callback.
 */
export const doCallback = callback => (...args) =>
  isFn(callback) && callback(...args)

/**
 * Sequences the animations for the componentDidMount React lifecycle hook.
 * @param {HTMLElement} node The DOM node to target.
 * @param {Function} componentDidMount The lifecycle callback.
 * @param {Object} props The component props to pass through.
 * @returns {any} The result of the lifecycle callback.
 */
export function sequenceNodeMount({node, componentDidMount, props}) {
  if (isTestEnv()) return
  if (!node) return

  if (!isFn(componentDidMount)) {
    return Promise.resolve()
  }

  return componentDidMount({
    node,
    animate: createAnimate({node}),
    props,
  })
}

/**
 * Sequences the animations for the componentDidUpdate React lifecycle hook.
 * @param {HTMLElement} node The DOM node to target.
 * @param {Function} componentDidUpdate The lifecycle callback.
 * @param {Object} props The component props to pass through.
 * @param {Object} prevProps The component props to pass through.
 * @param {Function} callback The callback to pass the Animation instance.
 * @returns {any} The result of the lifecycle callback.
 */
export function sequenceNodeUpdate({
  node,
  componentDidUpdate,
  prevProps,
  props,
  callback,
}) {
  if (isTestEnv()) return
  if (!node) return

  if (!isFn(componentDidUpdate)) {
    return Promise.resolve()
  }

  const animate = animationProps => {
    const animation = createAnimate({node})(animationProps)
    doCallback(callback)(animation)
  }

  return componentDidUpdate({
    node,
    animate,
    props,
    prevProps,
  })
}

/**
 * Sequences the animations for the componentWillUnmount React lifecycle hook.
 * @param {HTMLElement} node The DOM node to target.
 * @param {Function} componentWillUnmount The lifecycle callback.
 * @param {Object} props The component props to pass through.
 * @returns {any} The result of the lifecycle callback.
 */
export function sequenceNodeUnmount({node, componentWillUnmount, props}) {
  if (isTestEnv()) return
  if (!node) return

  if (!isFn(componentWillUnmount)) {
    return Promise.resolve()
  }

  // Retrieving the parentElement at the point of unmounting
  const parentNode = node.parentElement
  if (!parentNode) return

  // Since React is going to remove the DOM node, we'll need to make
  // copy and (re)inject it into the parent
  const clonedNode = node.cloneNode(true)
  parentNode.insertBefore(clonedNode, node)

  return componentWillUnmount({
    animate: createAnimate({node: clonedNode}),
    node: clonedNode,
    props,
  }).then(() => {
    // Finally, remove the node after things have resolved
    if (parentNode) {
      parentNode.removeChild(clonedNode)
    }
  })
}
