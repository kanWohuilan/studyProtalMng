/*
 * @Author: fgq
 * @Date: 2023-04-06 01:03:35
 * @LastEditors: fgq
 * @LastEditTime: 2023-04-22 23:08:43
 * @Description: 
 */
import request from "@/utils/system/request";

// 获取商品列表
export function getProductList(data: object) {
  return request({
    url: '/product/list',
    method: 'get',
    params:data
  })
}

// 获取商品列表
export function addProductAndSku(data: object) {
  return request({
    url: '/product/addproduct',
    method: 'post',
    data
  })
}