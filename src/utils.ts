import animate from './animate'

export const isFn = entity => typeof entity === 'function'

export function sequenceNodeMount({node, componentDidMount, props}) {
  if (!node) return

  if (!isFn(componentDidMount)) {
    return Promise.resolve()
  }

  return componentDidMount({
    node,
    animate,
    props,
  })
}

export function sequenceNodeUnmount({node, componentWillUnmount, props}) {
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

  return componentWillUnmount({animate, node: clonedNode, props}).then(() => {
    // Finally, remove the node after things have resolved
    if (parentNode) {
      parentNode.removeChild(clonedNode)
    }
  })
}
