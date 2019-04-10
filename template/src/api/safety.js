import request from '@/utils/premissionRequest'

export function getSafetyData() {
  return request({
    url: '/data/setting/page',
    method: 'get'
  })
}

export function getSafetyDataList() {
  return request({
    url: '/data/setting/list',
    method: 'post'
  })
}

export function updateSafetyData(data) {
  return request({
    url: '/data/setting',
    method: 'put',
    data
  })
}
export function getIPList() {
  return request({
    url: '/data/ipStrategy/page',
    method: 'get'
  })
}
export function saveIP(data) {
  return request({
    url: '/data/ipStrategy',
    method: 'post',
    data
  })
}
export function delIP(data) {
  return request({
    url: '/data/ipStrategy',
    method: 'delete',
    data
  })
}
