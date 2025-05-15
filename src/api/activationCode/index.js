import request from '@/utils/request'

// 激活码列表
export function getList (params) {
  return request({
    url: '/crm/subAdmin/codeList',
    method: 'get',
    params
  })
}

// 激活码添加
export function add (data) {
  return request({
    url: '/crm/subAdmin/addCode',
    method: 'post',
    data
  })
}

// 激活码删除
export function del (data) {
  return request({
    url: '/crm/subAdmin/delCode',
    method: 'post',
    data
  })
}

// 拉黑/恢复
export function black (data) {
  return request({
    url: '/crm/subAdmin/blackCode',
    method: 'post',
    data
  })
}

// 激活码绑定数量
export function bindNum (data) {
  return request({
    url: '/crm/subAdmin/setNum',
    method: 'post',
    data
  })
}

// 客户端账号详情
export function getAppAccountDetail (params) {
  return request({
    url: '/crm/subAdmin/clientList',
    method: 'get',
    params
  })
}

// 客户端账号详情-删除
export function delClient (data) {
  return request({
    url: '/crm/subAdmin/delClient',
    method: 'post',
    data
  })
}
