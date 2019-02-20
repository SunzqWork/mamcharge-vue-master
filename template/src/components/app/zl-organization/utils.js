import Vue from 'vue'
// 数据格式化
export function formatData(data) {
  data.checked = 3
  data.className = 'no-select'
  const loop = (obj) => {
    if (obj.children && obj.children.length > 0) {
      obj.children.forEach(item => {
        Vue.set(item, 'checked', 3)
        Vue.set(item, 'className', 'no-select')
        loop(item)
      })
    }
  }
  loop(data)
  return data
}

// 根据搜索找到对象
export function setData(data, selectId) {
  const loop = (obj) => {
    if (obj.children && obj.children.length > 0) {
      obj.children.forEach(item => {
        Vue.set(item, 'checked', 3)
        Vue.set(item, 'className', 'no-select')
        if (item.id === selectId) {
          Vue.set(item, 'checked', 1)
          Vue.set(item, 'className', 'select')
        }
        loop(item)
      })
    }
  }
  loop(data)
  return data
}

// 根据id得到所有的父级id
export function getParentNodeOfTree(data, id) {
  const p = []
  const loop = (tree, id, parent) => {
    for (let i = 0; i < tree.length; i++) {
      if (tree[i].id === id) {
        p.push(tree[i].pid)
        loop(data, tree[i].pid)
      } else {
        if (tree[i].children && tree[i].children.length > 0) {
          loop(tree[i].children, id)
        }
      }
    }
  }
  loop(data, id)
  // 递归给元素class赋值
  const parentLoop = (obj) => {
    if (obj.children && obj.children.length > 0) {
      obj.children.forEach(item => {
        if (item.id !== id) {
          Vue.set(item, 'checked', 3)
          Vue.set(item, 'className', 'no-select')
        }
        if (p.includes(item.id)) {
          parentLoop(item)
          Vue.set(item, 'checked', 2)
          Vue.set(item, 'className', 'half-select')
        }
      })
    }
  }
  Vue.set(data[0], 'checked', 2)
  Vue.set(data[0], 'className', 'half-select')
  parentLoop(data[0])
  return data
}
