import request from '@/utils/system/request'

// 获取菜单
export function getMenuList(data: object) {
  return request({
    url: '/menu/list',
    method: 'get',
    params:data
  })
}

