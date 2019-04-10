import request from '@/utils/premissionRequest'

// 权限中心登录
export function DevelopmentPlatform(url, data) {
  return request({
    url: `${url}`,
    method: 'post',
    data
  })
}
