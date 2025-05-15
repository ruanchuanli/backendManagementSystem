import request from '@/utils/request'

// app标识列表
export function getList () {
  return request({
    url: '/crm/subAdmin/appList',
    method: 'get'
  })
}


// 删除app标识
export function del () {
  return request({
    url: '/crm/subAdmin/deleteApp',
    method: 'get',
  })
}

