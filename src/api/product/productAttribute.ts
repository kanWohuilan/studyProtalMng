/*
 * @Author: fgq
 * @Date: 2023-04-16 21:18:06
 * @LastEditors: fgq
 * @LastEditTime: 2023-04-16 21:18:20
 * @Description: 
 */
import request from "@/utils/system/request";

// 获取品牌列表
export function getProductAttributeList(data: object) {
  return request({
    url: '/product/attributelist',
    method: 'get',
    params:data     
  })
}