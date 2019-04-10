import request from '@/utils/premissionRequest'


export function notifyTypeUser(id){
  return request({
    url: `/data/test/list?postId=${id}`,
    method: 'get',
  })
}

export function adds(data){
  return request({
    url: `/data/test/add`,
    method: 'post',
    data
  })
}

export function deletesa(id){
  return request({
    url: `/data/test/delete/${id}`,
    method: 'post',
  })
}
