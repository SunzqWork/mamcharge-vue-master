
/**
 * 树形结构转数组格式
 *  tree
 */
let arr = []
function treeToArrayFunc(tree) {
  if (tree.children && tree.children.length > 0) {
    if (tree.parent === 0) {
      arr.push(tree)
    }
    tree.children.forEach(item => {
      arr.push(item)
      treeToArrayFunc(item)
    })
  }
}
export function treeToArray(tree) {
  arr = []
  treeToArrayFunc(tree)
  return arr
}

// 数组转树形结构数据
export function buildTree(data) {
  data.forEach(item => {
    delete item.children
  })
  const map = {}
  data.forEach(item => {
    map[item.id] = item
  })
  const val = []
  data.forEach(item => {
    const parent = map[item.parent]
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      val.push(item)
    }
  })
  return val
}
