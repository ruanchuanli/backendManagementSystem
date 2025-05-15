import request from '@/utils/request'

// app标识列表
export function getList () {
  return request({
    url: '/crm/app/list',
    method: 'get'
  })
}

// 添加app标识
export function add (data) {
  return request({
    url: '/crm/app/add',
    method: 'post',
    data
  })
}

// 删除app标识
export function del (data) {
  return request({
    url: '/crm/app/del',
    method: 'post',
    data
  })
}

// app标识列表,下拉框
export function getSelectList () {
  return request({
    url: '/crm/app/selectList',
    method: 'get'
  })
}
