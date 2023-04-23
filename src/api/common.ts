/*
 * @Author: fgq
 * @Date: 2023-04-23 23:14:57
 * @LastEditors: fgq
 * @LastEditTime: 2023-04-23 23:15:28
 * @Description: 
 */
import request from "@/utils/system/request";

/** 上传 */
export function upload(data: object) {
  return request({
    url: '/common/upload',
    method: 'post',
    data
  })
}

