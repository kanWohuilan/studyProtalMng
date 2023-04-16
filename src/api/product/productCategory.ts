/*
 * @Author: fgq
 * @Date: 2023-04-06 01:03:35
 * @LastEditors: fgq
 * @LastEditTime: 2023-04-12 01:24:05
 * @Description: 
 */
import request from "@/utils/system/request";

// 获取所有分类列表
export function getProductCategoryList(data: object) {
  return request({
    url: '/product/categorylist',
    method: 'get',
    params:data
  })
}