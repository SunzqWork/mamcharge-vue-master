import request from '@/utils/request'

// ost 开头的接口废弃

// 获取代理商/商户
export function getCommercialList() {
  return request({
    url: '/ost/support/redpacket/getCommercialList',
    method: 'post'
  })
}

// 根据商户名称获取商户
export function getSortCommercial(commName) {
  return request({
    url: '/ost/commercial/getSortCommList',
    method: 'post',
    data: { commName }
  })
}

// 获取区域列表数据
export function getAreaList(data) {
  return request({
    url: '/ost/commercial/getAreaList',
    method: 'post',
    data
  })
}

// 获取省份城市数据
export function getLatitude() {
  return request({
    url: '/ost/support/safe/getProvince',
    method: 'post'
  })
}
