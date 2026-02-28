/** File: use-tree.ts - TypeScript File */

// ========== Dependencies Import ==========
import { ref, watch } from 'vue'
import type { TreeProps, TreeNode } from './tree'

export const useTree = (
  props: TreeProps,
  emit: (event: 'check-change', ...args: any[]) => void
) => {
  const flatMap = ref(new Map<string | number, TreeNode>())

  // Helper to get key
  const getKey = (node: TreeNode) => {
    const key = (node as Record<string, unknown>)[props.nodeKey]
    return key as string | number | undefined
  }

  const initData = () => {
    flatMap.value.clear()
    const traverse = (nodes: TreeNode[], parent: TreeNode | null = null) => {
      nodes.forEach(node => {
        const key = getKey(node)
        if (key !== undefined) {
          flatMap.value.set(key, node)
        }

        // Add parent pointer (non-enumerable)
        if (!Object.prototype.hasOwnProperty.call(node, 'parent')) {
          Object.defineProperty(node, 'parent', {
            value: parent,
            configurable: true,
            writable: true,
            enumerable: false,
          })
        } else {
          node.parent = parent
        }

        // Initialize checked/indeterminate if not present
        if (node.checked === undefined) {
          node.checked = false
        }
        if (node.indeterminate === undefined) {
          node.indeterminate = false
        }

        if (node.children && node.children.length) {
          traverse(node.children, node)
        }
      })
    }

    if (props.data) {
      traverse(props.data)
    }

    // Handle default checked keys
    if (props.defaultCheckedKeys && props.defaultCheckedKeys.length) {
      props.defaultCheckedKeys.forEach(key => {
        const node = flatMap.value.get(key)
        if (node) {
          updateChecked(node, true)
        }
      })
    }
  }

  const updateChecked = (node: TreeNode, checked: boolean) => {
    // 1. Update self
    node.checked = checked
    node.indeterminate = false

    // 2. Update children (cascade down)
    const updateChildren = (n: TreeNode, c: boolean) => {
      if (n.children && n.children.length) {
        n.children.forEach(child => {
          child.checked = c
          child.indeterminate = false
          updateChildren(child, c)
        })
      }
    }
    updateChildren(node, checked)

    // 3. Update parents (cascade up)
    updateParents(node)

    emit('check-change', node, checked, !!node.indeterminate)
  }

  const updateParents = (node: TreeNode) => {
    let parent = node.parent
    while (parent) {
      const children = parent.children || []
      const allChecked = children.every(child => !!child.checked)
      const someChecked = children.some(child => !!child.checked || !!child.indeterminate)

      if (allChecked) {
        parent.checked = true
        parent.indeterminate = false
      } else if (someChecked) {
        parent.checked = false
        parent.indeterminate = true
      } else {
        parent.checked = false
        parent.indeterminate = false
      }
      parent = parent.parent
    }
  }

  const toggleCheck = (node: TreeNode, checked: boolean) => {
    updateChecked(node, checked)
  }

  const getCheckedNodes = (leafOnly = false) => {
    const checkedNodes: TreeNode[] = []
    flatMap.value.forEach(node => {
      if (node.checked && (!leafOnly || !node.children || node.children.length === 0)) {
        checkedNodes.push(node)
      }
    })
    return checkedNodes
  }

  const getCheckedKeys = (leafOnly = false) => {
    return getCheckedNodes(leafOnly).map(node => getKey(node))
  }

  watch(
    () => props.data,
    () => {
      initData()
    },
    { immediate: true, deep: true }
  )

  return {
    toggleCheck,
    getCheckedNodes,
    getCheckedKeys,
  }
}
