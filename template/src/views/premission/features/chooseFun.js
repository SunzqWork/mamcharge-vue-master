import { functionList, systemList } from '@/api/premission'
// 选择应用
export function chooseFun(callback) {
  functionList(1, 9999).then(res => {
    callback && callback(res.data.records)
    res.data.records.forEach((obj, index, l) => {
      for (const attr in obj) {
        if (attr !== 'id' && attr !== 'name') {
          delete obj[attr]
        }
      }
    })
  })
}
// 按照当前类型选择上级  非全部上级
export function chooseParent(callback, level) {
  systemList().then(res => {
    callback && callback(res.data)
    res.data.forEach((val, index, l) => {
      if (val.hasOwnProperty('menus')) {
        val['children'] = val.menus
      }
      for (const attr in val) {
        if (attr !== 'id' && attr !== 'name' && attr !== 'children') {
          delete val[attr]
        }
      }
      if (val.children && level !== 0) {
        getCascaderData(val.children, level)
      } else if (val.children && level === 0) {
        delete val.children
      }
    })
  })
}
// 深度遍历重组级联选择器数据结构
export function getCascaderData(obj, level) {
  for (const c of obj) {
    for (const attr in c) {
      if (attr !== 'type' && attr !== 'id' && attr !== 'name' && attr !== 'children') {
        delete c[attr]
      }
    }
    if (c.type > (level - 2)) {
      delete c.children
    }
    if (c.children) {
      delete c.type
      getCascaderData(c.children, level)
    } else {
      continue
    }
  }
}
