import request from '@/utils/premissionRequest'

// 权限中心登录
export function login(data) {
  return request({
    url: `/api/login`,
    method: 'post',
    data
  })
}

// 获取用户信息
export function getUserInfo(token) {
  return request({
    url: '/api/info/token',
    method: 'post',
    data: {
      token
    }
  })
}

// 获取子系统菜单树
export function getMenuTree(sysId) {
  return request({
    url: `/api/menus/sys/${sysId}`,
    methos: 'get'
  })
}

// 退出登录
export function logout(token) {
  return request({
    url: '/api/logout',
    method: 'post',
    data: {
      token
    }
  })
}

// 添加用户
export function addUser(data) {
  return request({
    url: '/data/users',
    method: 'post',
    data
  })
}

// 查询用户
export function getUserList(params) {
  return request({
    url: `/data/users/page`,
    method: 'get',
    params
  })
}

// 用户ID查询
export function getUserInfoById(id) {
  return request({
    url: `/data/users/${id}`,
    method: 'get'
  })
}

// 修改用户
export function updateUser(id, data) {
  return request({
    url: `/data/users/${id}`,
    method: 'put',
    data
  })
}

// 新增类别
export function addType(name) {
  return request({
    url: '/data/roles/kinds',
    method: 'post',
    data: {
      name
    }
  })
}

// 修改类别
export function updateType(code, name) {
  return request({
    url: `/data/roles/kinds/${code}`,
    method: 'put',
    data: {
      name
    }
  })
}

// 查看类别
export function getTypeList() {
  return request({
    url: '/data/roles/kinds',
    method: 'get'
  })
}

// 删除类别
export function deleteType(id) {
  return request({
    url: `/data/roles/kinds/${id}`,
    method: 'delete'
  })
}

// 新增角色
export function addRole(data) {
  return request({
    url: '/data/roles',
    method: 'post',
    data
  })
}

// 查询角色
export function getRoleList(params) {
  return request({
    url: `/data/roles/page`,
    method: 'get',
    params
  })
}

// 根据id查询角色
export function getRoleInfoById(id) {
  return request({
    url: `/data/roles/${id}`,
    method: 'get'
  })
}

// 修改角色
export function updateRole(id, data) {
  return request({
    url: `/data/roles/${id}`,
    method: 'put',
    data
  })
}

// 删除角色（单个）
export function delOneRole(id) {
  return request({
    url: `/data/roles/${id}`,
    method: 'delete'
  })
}

// 删除角色（批量）
export function delAllRole(data) {
  return request({
    url: '/data/roles/',
    method: 'delete',
    data
  })
}

// 删除角色
export function deleteRole(id) {
  return request({
    url: `/roles/kinds/${id}`,
    method: 'delete'
  })
}

// 应用-按应用分组
export function GroupBySys(params = {}) {
  return request({
    url: '/data/menus/group-by-sys',
    method: 'get',
    params
  })
}

// 角色-按类别分组
export function roleGroups() {
  return request({
    url: '/data/roles/grouped',
    method: 'get'
  })
}

// 获取岗位数据
export function getPost1() {
  return request({
    url: '/data/positions/page',
    method: 'get',
    params: {
      status: 1,
      size: 200
    }
  })
}

// 修改密码
export function updatePassword(id, data) {
  return request({
    url: `/data/users/${id}/pass/`,
    method: 'put',
    data
  })
}

// ---------------------------------------------- data premission ----------------l------------------------------ //
// 获取与用户关联的所有维度
export function userDimension() {
  return request({
    url: '/data/dAuth/fields/user',
    method: 'get'
  })
}

// 获取岗位关联的所有维度
export function positionDimension() {
  return request({
    url: '/data/dAuth/fields/position',
    method: 'get'
  })
}

// 获取所有维度类型
export function getAllDimension() {
  return request({
    url: '/data/dimension/type',
    method: 'get'
  })
}

// 用户授权
export function userAuth(user_id, data) {
  return request({
    url: `/data/dAuth/perms/users/${user_id}`,
    method: 'post',
    data
  })
}

// 组织单元授权
export function orgAuth(orgId, data) {
  return request({
    url: `/data/dAuth/perms/org/${orgId}`,
    method: 'post',
    data
  })
}

// 获取用户数据权限
export function getUserData(userId) {
  return request({
    url: `/data/dAuth/users/${userId}`,
    method: 'get'
  })
}

// 获取组织单元数据权限
export function getOrgData(orgId) {
  return request({
    url: `/data/dAuth/org/${orgId}`,
    method: 'get'
  })
}

// ----------------------- 应用管理 -----------------------

// 应用列表
export function functionList(page, size) {
  return request({
    url: `/data/systems/page?page=${page}&size=${size}`,
    method: 'get'
  })
}
// 应用搜索
export function searchFunction(name, page, size) {
  return request({
    url: `/data/systems/search?name=${name}&page=${page}&size=${size}`,
    method: 'get'
  })
}
// 编辑查询
export function searcchEdit(id) {
  return request({
    url: `/data/systems/${id}`,
    method: 'get'
  })
}
// 添加应用
export function addFunction(data) {
  return request({
    url: '/data/systems',
    method: 'post',
    data
  })
}
// 删除应用
export function delFunction(id) {
  return request({
    url: `/data/systems/${id}`,
    method: 'delete'
  })
}
// 修改应用
export function editFunction(id, data) {
  return request({
    url: `/data/systems/${id}`,
    method: 'put',
    data
  })
}

// ----------------------- 功能管理 -----------------------
// 菜单列表
export function systemList() {
  return request({
    url: `/data/menus/group-by-sys`,
    method: 'get'
  })
}
// 列表搜索
export function searchSystem(sysId = null, name = null) {
  return request({
    url: `/data/menus/group-by-sys?sysId=${sysId}&name=${name}`,
    method: 'get'
  })
}
// 新增
export function addSystem(data) {
  return request({
    url: '/data/menus',
    method: 'post',
    data
  })
}

// 编辑搜索
export function systemId(id) {
  return request({
    url: `/data/menus/${id}`,
    method: 'get'
  })
}

// 删除
export function delSystem(id) {
  return request({
    url: `/data/menus/${id}`,
    method: 'delete'
  })
}

// 修改
export function editSystem(id, data) {
  return request({
    url: `/data/menus/${id}`,
    method: 'put',
    data
  })
}

// ----------------------- 组织架构 -----------------------
// 基础资料新增
export function addBasicInfo(data) {
  return request({
    url: '/data/archs/',
    method: 'post',
    data
  })
}

// 基础资料查询
export function getBasicList(params) {
  return request({
    url: '/data/archs/page',
    method: 'get',
    params
  })
}

// 根据id查询基础资料
export function getBasicInfoById(id) {
  return request({
    url: `/data/archs/${id}`,
    method: 'get'
  })
}

// 基础资料修改
export function updateBasicInfo(id, data) {
  return request({
    url: `/data/archs/${id}`,
    method: 'put',
    data
  })
}

// 基础资料停用
export function stopBasicInfo(id) {
  return request({
    url: `/data/archs/${id}`,
    method: 'delete'
  })
}

// 基础资料类型新增
export function addBasicInfoType(tname) {
  return request({
    url: '/data/arch-types',
    method: 'post',
    data: {
      tname
    }
  })
}

// 基础资料类型修改
export function updateBasicInfoType(id, tname) {
  return request({
    url: `/data/arch-types/${id}`,
    method: 'put',
    data: {
      tname
    }
  })
}

// 基础资料类型查询
export function getBasicInfoType(id) {
  return request({
    url: `/data/arch-types/${id}`,
    method: 'delete'
  })
}

// 基础资料类型查询全部
export function getBasicInfoTypeAll() {
  return request({
    url: '/data/arch-types',
    method: 'get'
  })
}

// 岗位查询
export function getPost(data) {
  return request({
    url: '/data/positions/page',
    method: 'get',
    params: data
  })
}

// 父级组织单元 未被停用的数据
export function parentUnirNoStop(typeId) {
  return request({
    url: '/data/archs/query',
    method: 'get',
    params: {
      typeId
    }
  })
}
// 新增岗位
export function addPost(data) {
  return request({
    url: '/data/positions',
    method: 'post',
    data
  })
}

// 修改岗位
export function updatePost(id, data) {
  return request({
    url: `/data/positions/${id}`,
    method: 'put',
    data
  })
}

// 获取标准岗位
export function getStandardPost(typeId) {
  return request({
    url: `/data/archs/query`,
    method: 'get',
    params: {
      typeId
    }
  })
}

// 组织架构

// 组织树获取
export function orgTree(dept = null) {
  return request({
    url: `/data/orgs/tree`,
    method: 'get',
    params: {
      dept
    }
  })
}

// 查询组织详情信息
export function getOrgInfo(id) {
  return request({
    url: `data/orgs/${id}`,
    method: 'get'
  })
}

// 查询下级分部
export function getSubOrgList(id, params) {
  return request({
    url: `/data/orgs/${id}/sub_orgs`,
    method: 'get',
    params
  })
}

// 查询下级部门
export function getSubDeptList(id, params) {
  return request({
    url: `/data/orgs/${id}/sub_depts`,
    method: 'get',
    params
  })
}

// 组织架构 新增
export function addOrgs(data) {
  return request({
    url: '/data/orgs',
    method: 'post',
    data
  })
}

// 组织编辑
export function editOrgs(id, data) {
  return request({
    url: `/data/orgs/${id}`,
    method: 'put',
    data
  })
}

// 组织批量删除
export function deleteAllOrgs(data) {
  return request({
    url: `/data/orgs`,
    method: 'delete',
    data
  })
}

// 查询人员列表 部门
export function getUserListByBM(orgId) {
  return request({
    url: `/data/users/list`,
    method: 'get',
    params: { orgId }
  })
}

// 查询人员列表 角色
export function getUserListByJS(roleId, params) {
  return request({
    url: `/data/roles/${roleId}/users`,
    method: 'get',
    params
  })
}

// 修改角色关联用户数据
export function updateRoleRealtionUser(roleId, data) {
  return request({
    url: `/data/roles/${roleId}/users`,
    method: 'put',
    data
  })
}


// 查询人员列表 岗位
export function getUserListByGW(postId) {
  return request({
    url: `/data/users/list`,
    method: 'get',
    params: { postId }
  })
}

// 岗位类别新增
export function addJobType(data) {
  return request({
    url: '/data/ref_posts',
    method: 'post',
    data
  })
}

// 岗位类别查询
export function queryJobType(params) {
  return request({
    url: '/data/ref_posts/page',
    method: 'get',
    params
  })
}

// 岗位类别修改
export function updateJobType(id, data) {
  return request({
    url: `/data/ref_posts/${id}`,
    method: 'put',
    data
  })
}

// 岗位类别批量删除
export function delAllJobType(data) {
  return request({
    url: `/data/ref_posts`,
    method: 'delete',
  })
}

// 组织帮助框
export function orgsTrees(data) {
  return request({
    url: `/data/orgs/depts`,
    method: 'get',
    data
  })
}

// 删除角色下面的成员
export function delRoleUser(roleId, data) {
  return request({
    url: `/data/roles/user/${roleId}`,
    method: 'delete',
    data
  })
}