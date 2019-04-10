import request from '@/utils/premissionRequest'

export function getDecentList(page, size,keyword , sys = true) {
  return request({
    url: `/data/users/page?page=${page}&size=${size}&sys=true&keyword=${keyword}`,
    method: 'get'
  })
}
export function addDecent(data) {
  return request({
    url: '/data/users',
    method: 'post',
    data
  })
}
export function delDecent(data) {
  return request({
    url: '/data/users',
    method: 'delete',
    data
  })
}
export function getDetailMore(userId,pages) {
  return request({
    url: `/data/users/${userId}?page=${pages.page}&pageSize${pages.pageSize}`,
    method: 'get'
  })
}
export function getDetail(userId) {
  return request({
    url: `/data/users/${userId}`,
    method: 'get'
  })
}
export function updateDecent(id, data) {
  return request({
    url: `/data/users/${id}`,
    method: 'put',
    data
  })
}
