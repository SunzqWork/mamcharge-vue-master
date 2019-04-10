
/**
 * auth: 于十月
 * 得到所有的父级id
 * @param {*} data 
 * @param {*} id 
 */

export function getParentObject(data, id) {
  let temp = []
  let pids = []
  if (!Array.isArray(data)) {
    temp = [data]
  } else {
    temp = data
  }

  const loop = (obj, id) => {
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].id === id) {
        if (obj[i].pid === "0") {
          pids.push(obj[i].sysId)
        }

        if (!obj[i].pid) {
          return false
        }

        pids.push(obj[i].pid)
        loop(temp, obj[i].pid)
      }
    }
  }

  loop(temp, id)

  return pids
}

/**
 * auth: 于十月
 * 得到选中的节点
 * @param {*} data 
 */

export function getObjectId(data) {
  let checkList = []

  const loop = (tree) => {
    if (tree.children && tree.children.length > 0) {
      tree.children.forEach(item => {

        if (item.checkAll || item.isIndeterminate) {
          checkList.push({
            menuId: item.id,
            isIndeterminate: item.isIndeterminate,
            checkAll: item.checkAll
          })
        }
        
        if (item.btns && item.btns.length > 0) {
          item.btns.forEach(val => {

            if (val.checkAll) {
              checkList.push({
                menuId: val.id,
                isIndeterminate: val.isIndeterminate,
                checkAll: val.checkAll
              })
            }
            
          })
        }

        loop(item)
      })
    }
  }

  data.forEach(val => {
    
    if (val.checkAll || val.isIndeterminate) {
      checkList.push({
        menuId: val.id,
        isIndeterminate: val.isIndeterminate,
        checkAll: val.checkAll,
        sys: true
      })
    }
  
    loop(val)
  })

  return checkList
}

/**
 * auth: 于十月
 * 得到直接父级对象
 * @param {*} data 数组  对象是树形结构
 * @param {*} pid  父级id
 */

export function getParent(data, pid) {
  let obj = new Object()
  const loop = (tree) => {
    if (tree.children && tree.children.length > 0) {
      for (let i = 0; i < tree.children.length; i++) {
        if (tree.children[i].id === pid) {
          obj = tree.children[i]
          break
        }

        loop(tree.children[i])
      }
    }
  }
  for (let i = 0; i < data.length; i++) {
    loop(data[i])
  }

  return obj
}
