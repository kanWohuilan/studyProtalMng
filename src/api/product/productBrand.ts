/*
 * @Author: fgq
 * @Date: 2023-04-06 01:03:35
 * @LastEditors: fgq
 * @LastEditTime: 2023-04-17 01:10:09
 * @Description: 
 */
import request from "@/utils/system/request";

// 获取品牌列表
export function getProductBrandList(data: object) {
  return request({
    url: '/product/brandlist',
    method: 'get',
    params:data     
  })
}