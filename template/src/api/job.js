import request from '@/utils/premissionRequest'

// 获取岗位列表
export function getJobListApi(params) {
  return request({
    url: '/data/positions/page',
    method: 'get',
    params
  })
}
// 启用或者停用岗位
export function targetJobApi(data) {
  return request({
    url: `/data/positions/${data.id}`,
    method: 'put',
    data:{status:data.status}
  })
}
// 删除岗位
export function delALLJobApi(data) {
  return request({
    url: `/data/positions`,
    method: 'delete',
    data
  })
}
// 岗位新增 标准岗位下拉
export function getBzJobList(params) {
  return request({
    url: `/data/ref_posts/page`,
    method: 'get',
    params
  })
}
// 新增岗位基本信息
export function addJobBase(data) {
  return request({
    url: `/data/positions`,
    method: 'post',
    data
  })
}
// 根据岗位获取关联权限
export function JobGetPermissionApi(postId) {
  return request({
    url: `/data/dAuth/postField/${postId}`,
    method: 'post',
  })
}
// 增加岗位数据权限
export function addJobApi(data) {
  return request({
    url: `/data/dAuth/assign`,
    method: 'post',
    data
  })
}
// 根据岗位ID 获取 岗位基本信息
export function getJobInfo(id) {
  return request({
    url: `/data/positions/${id}`,
    method: 'get',
  })
}
// 获取数据权限基础设置
export function getJobPermisson(id, menuId = '') {
  return request({
    url: `/data/dAuth/postField/${id}?menuId=${menuId}`,
    method: 'get',
  })
}

// 获取数据权限高级设置
export function getJobPermissonBase(id) {
  return request({
    url: `/data/dAuth/postField/${id}`,
    method: 'get',
  })
}

// 根据岗位ID 修改基本信息
export function editJob(data) {
  return request({
    url: `/data/positions/${data.id}`,
    method: 'put',
    data
  })
}

// 可变地址
export function changeApi(url, params = null) {
  return request({
    url,
    method: 'get',
    params
  })
}