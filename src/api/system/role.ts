import request from '@/utils/system/request'

// 获取菜单
export function getRoleList(data: object) {
  return request({
    url: 'system/role/list',
    method: 'get',
    params:data
  })
}
// 修改角色状态
export function changeStatus(data: object) {
  return request({
    url: 'system/role/changeStatus',
    method: 'post',
    data
  })
}

