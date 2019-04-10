
'use strict'
import Vue from 'vue'
export default function treeToArray(data, expandAll, parent = null, level = null) {
  let tmp = []
  Array.from(data).forEach(function(record) {
    // if (record._expanded === undefined) {
    //   Vue.set(record, '_expanded', expandAll)
    // }

    Vue.set(record, '_expanded', expandAll)
    
    let _level = 1
    if (level !== undefined && level !== null) {
      _level = level + 1
    }
    Vue.set(record, '_level', _level)

    // 复选状态控制
    Vue.set(record, 'check', record.check)
    Vue.set(record, 'indeterminate', record.indeterminate)

    // 如果有父元素
    if (parent) {
      Vue.set(record, 'parent', parent)
    }

    tmp.push(record)
    if (record.children && record.children.length > 0) {
      record.children.forEach(item => {
        Vue.set(item, 'pid', record.id)
      })
      const children = treeToArray(record.children, expandAll, record, _level)
      tmp = tmp.concat(children)
    }
  })
  return tmp
}
