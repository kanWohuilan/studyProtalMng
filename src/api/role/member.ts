import request from "@/utils/system/request";

// 获取会员列表
export function getMemberList(data: object) {
  return request({
    url: '/member/list',
    method: 'get',
    params:data
  })
}