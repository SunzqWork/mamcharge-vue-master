import request from '@/utils/premissionRequest'



export function faillist(data) {
  return request({
    url: '/data/users/export/failList',
    method: 'post',
    data
  })
}

// 创建用户
export function createUser(data) {
  return request({
    url: '/data/users',
    method: 'post',
    data
  })
}

// 查询用户
export function queryUserList(params) {
  return request({
    url: `/data/users/page`,
    method: 'get',
    params
  })
}

// 删除
export function delAllUser(data) {
  return request({
    url: '/data/users',
    method: 'delete',
    data
  })
}

// 停用
export function stopFunc(id, data) {
  return request({
    url: `/data/users/${id}`,
    method: 'put',
    data
  })
}