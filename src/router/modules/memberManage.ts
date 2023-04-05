import Layout from "@/layout/index.vue";

import { createNameComponent } from "../createNode";
import type { Route } from "../index.type";

const route: Route[] = [
  {
    path: "/memberManage",
    component: Layout,
    redirect: "/memberManage/memberManage",
    meta: {
      title: "会员管理",
      icon: "sfont system-xitongzhuangtai",
      menuId: 5,
    },
    alwayShow: true,
    children: [
      {
        path: "memberManage",
        component: createNameComponent(
          () => import("@/views/main/roleManage/memberManage/index.vue")
        ),
        meta: { title: "会员管理", menuId: 1016 },
      },
    ],
  },
];

export default route;
