import request from '@/utils/premissionRequest'

// 用户自定义查询
export function getCustomUser() {
  return request({
    url: `/data/ext_confs/user`,
    method: 'get',
  })
}

//用户自定义新增或修改

export function getCustomPut(data) {
  return request({
    url: `/data/ext_confs/user`,
    method: 'put',
    data
  })
}

//用户自定义删除

export function deleteCustomPut(data) {
  return request({
    url: `/data/ext_confs/user`,
    method: 'delete',
    data
  })
}


// 部门自定义查询
export function getOrgCustomUser() {
  return request({
    url: `/data/ext_confs/org`,
    method: 'get',
  })
}

//部门自定义新增或修改

export function getOrgCustomPut(data) {
  return request({
    url: `/data/ext_confs/org`,
    method: 'put',
    data
  })
}

//部门自定义删除

export function deleteOrgCustomPut(data) {
  return request({
    url: `/data/ext_confs/org`,
    method: 'delete',
    data
  })
}