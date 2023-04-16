/*
 * @Author: fgq
 * @Date: 2023-04-08 22:40:49
 * @LastEditors: fgq
 * @LastEditTime: 2023-04-15 17:05:12
 * @Description: 
 */
import Layout from "@/layout/index.vue";

import { createNameComponent } from "../createNode";
import type { Route } from "../index.type";

const route: Route[] = [
  {
    path: "/product",
    component: Layout,
    redirect: "/product/productManage",
    meta: {
      title: "商品",
      icon: "sfont system-xitongzhuangtai",
      menuId: 6,
    },
    alwayShow: true,
    children: [
      {
        path: "productManage",
        component: createNameComponent(
          () => import("@/views/main/product/productManage/index.vue")
        ),
        meta: { title: "商品管理", menuId: 1062 },
      },
      {
        path: "addproduct",
        component: createNameComponent(
          () => import("@/views/main/product/addProduct/index.vue")
        ),
        meta: { title: "添加商品", menuId: 1063 },
      },
    ],
  },
];

export default route;
