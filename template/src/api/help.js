import request from '@/utils/premissionRequest'


// 权限中心登录
export function getExampleUser(data) {
  return request({
    url: `/data/users/example`,
    method: 'post',
    data
  })
}

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
    url: `/data/positions/list?name=${data.name}`,
    // url: `/data/positions/list?orgId=o1&name=${data.name}`,
    method: 'get',
    data
  })
}


export function extOrg() {
  return request({
    url: `/data/ext_confs/org/base`,
    method: 'get',
  })
}

// 只查ID岗位
export function extConfs() {
  return request({
    url: `/data/ext_confs/user/base`,
    method: 'get',
  })
}
// 只查ID岗位
export function positionsOrg(data) {
  return request({
    url: `/data/positions/list?orgId=${data}`,
    method: 'get',
    data
  })
}
// 
export function roles(data) {
  return request({
    url: `/data/roles/list?name=${data.name}`,
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
export function getUserOrgId(orgId) {
  return request({
    url: `/data/users/example`,
    method: 'get',
    params: {
      orgId
    }
  })
}

// 查询人员按部门
export function getUserOrg(roleId) {
  return request({
    url: `/data/users/example`,
    method: 'get',
    params: {
      roleId
    }
  })
}


// 查询角色树
export function getRoTree() {
  return request({
    url: `/data/roles/grouped`,
    method: 'get',
  })
}

// 查询角色树
export function getRoHelper(orgId) {
  return request({
    url: `/data/helper/roles`,
    method: 'get',
    params: {
      orgId
    }
  })
}

// 按岗位查询
export function getGroupedHelper() {
  return request({
    url: `/data/positions/grouped`,
    method: 'get',
  })
}

// 内容仔细查询
export function getGroupedHelperMsgUser(data) {
  return request({
    url: `/data/orgs/element/user`,
    method: 'post',
    data
  })
}

// 内容仔细查询
export function getGroupedHelperMsgOrg(data) {
  return request({
    url: `/data/orgs/element/org`,
    method: 'post',
    data
  })
}

// 内容仔细查询
export function getGroupedHelperMsgPosition(data) {
  return request({
    url: `/data/orgs/element/position`,
    method: 'post',
    data
  })
}


// 内容仔细查询
export function getGroupedHelperMsgRole(data) {
  return request({
    url: `/data/orgs/element/role`,
    method: 'post',
    data
  })
}

// daaochu
export function PasswordVs(data) {
  return request({
    url: `/data/users/admin/validate`,
    method: 'post',
    data
  })
}


export function changePassword(data,id){
  return request({
    url: `/data/users/admin/pass/${id}`,
    method: 'put',
    data
  })
}

export function notifyTypeUser(notifyType,id,token){
  return request({
    url: `/api/pwdNotifyUser?notifyType=${notifyType}&userId=${id}&token=${token}`,
    method: 'get',
  })
}

// 查重
export function getValueIs(type,value,userId){
  return request({
    url: `/data/users/count/${type}?value=${value}&userId=${userId}`,
    method: 'get',
  })
}

