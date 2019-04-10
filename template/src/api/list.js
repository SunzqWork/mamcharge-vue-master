import request from '@/utils/request'
// 列表编辑
export function addOrEdit(query) {
  return request({
    url: 'design/list/addOrEdit',
    method: 'post',
    params: query
  })
}
// 列表获取
export function getsList(query) {
  return request({
    url: 'design/list/get',
    method: 'post',
    params: query
  })
}
// 表单获取
export function getColumn(query) {
  return request({
    url: 'dbms/meterInfo/getColumn',
    method: 'post',
    params: query
  })
}
