'use strict'

/**
 * auth: 于十月
 * 得到所有的父级id
 * @param {*} data 
 * @param {*} id 
 */

export function getParentObject(data, id) {
  let temp = []
  let pids = []
  let objs = []
  if (!Array.isArray(data)) {
    temp = [data]
  } else {
    temp = data
  }

  const loop = (obj, id) => {
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].id === id) {
        if (!obj[i].pid) {
          return false
        }
        pids.push(obj[i].pid)
        loop(temp, obj[i].pid)
      }
    }
  }

  loop(temp, id)

  // 根据id得到对象
  data.forEach(val => {
    pids.forEach(item => {
      if (item === val.id) {
        objs.push(val)
      }
    })
  })
  return objs
}

/**
 * auth: 于十月
 * 得到直接父级对象
 * @param {*} data 格式化后的数组
 * @param {*} pid  父级id
 */

export function getParent(data, pid) {
  let obj = new Object()
  data.forEach(val => {
    if (val.id === pid) {
      obj = val
    }
  })
  return obj
}