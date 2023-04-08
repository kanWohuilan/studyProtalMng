/*
 * @Author: fgq
 * @Date: 2023-04-06 01:03:35
 * @LastEditors: fgq
 * @LastEditTime: 2023-04-06 01:03:58
 * @Description: 
 */
import request from "@/utils/system/request";

// 获取会员列表
export function getProductList(data: object) {
  return request({
    url: '/product/list',
    method: 'get',
    params:data
  })
}