import request from '@/utils/premissionRequest'

// 新增维度
export function addDimension(data) {
  return request({
    url: '/data/dAuth/fieldtype/add',
    method: 'post',
    data
  })
}

// 修改维度
export function updateDimension(data) {
  return request({
    url: '/data/dAuth/fieldtype/edit',
    method: 'post',
    data
  })
}

// 获取维度信息
export function getDimensionById(id) {
  return request({
    url: `/data/dAuth/fieldtype/${id}`,
    method: 'get'
  })
}

// 获取维度列表
export function getDimensionList() {
  return request({
    url: '/data/dAuth/fieldtype/list',
    method: 'get'
  })
}

// 删除
export function deleteDimensionByIds(data) {
  return request({
    url: '/data/dAuth/fieldtype',
    method: 'delete',
    data
  })
}
