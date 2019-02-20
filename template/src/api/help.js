import request from '@/utils/premissionRequest'

// 权限中心登录
export function helpUser(data) {
  return request({
    url: `/data/users/example?sys=false&name=${data.name}`,
    method: 'get',
    data
  })
}
// 岗位查询
export function positions(data) {
  return request({
    url: `/data/positions/list?name=${data.name}?orgId=${data.orgId}`,
    // url: `/data/positions/list?orgId=o1&name=${data.name}`,
    method: 'get',
    data
  })
}
// 只查ID岗位
export function positionsOrg(data) {
  return request({
    url: `/data/positions/list?orgId=${data}`,
    // url: `/data/positions/list?orgId=o1&name=${data.name}`,
    method: 'get',
    data
  })
}
// 
export function roles(data) {
  return request({
    url: `/data/roles/list?name=${data.name}`,
    // url: `/data/positions/list?orgId=o1&name=${data.name}`,
    method: 'get',
    data
  })
}
// 单角色查询
export function rolesOrg(data) {
  return request({
    url: `/data/roles/list?orgId=${data}`,
    // url: `/data/positions/list?orgId=o1&name=${data.name}`,
    method: 'get',
    data
  })
}
// 
export function getUserInfos(id) {
  return request({
    url: `/data/users/${id}`,
    // url: `/data/positions/list?orgId=o1&name=${data.name}`,
    method: 'get',
    data
  })
}
// group 
export function getGrouped(id) {
  return request({
    url: `data/positions/grouped`,
    // url: `/data/positions/list?orgId=o1&name=${data.name}`,
    method: 'get',
  })
}

// 查询人员按部门
export function getUserOrg(orgId) {
  return request({
    url: `/data/users/list`,
    method: 'get',
    params: { orgId }
  })
}