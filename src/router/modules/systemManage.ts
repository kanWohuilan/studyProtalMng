import type { Route } from "../index.type";
import Layout from "@/layout/index.vue";
import { createNameComponent } from "../createNode";
const route: Route[] = [
  {
    path: "/systemManage",
    component: Layout,
    redirect: "/systemManage/menu",
    meta: {
      title: "message.menu.systemManage.name",
      icon: "sfont system-xitongzhuangtai",
      menuId: 1,
    },
    alwayShow: true,
    children: [
      {
        path: "menu",
        component: createNameComponent(
          () => import("@/views/main/systemManage/menu/index.vue")
        ),
        meta: { title: "message.menu.systemManage.menu", menuId: 102 },
      },
      {
        path: "role",
        component: createNameComponent(
          () => import("@/views/main/systemManage/role/index.vue")
        ),
        meta: { title: "message.menu.systemManage.role", menuId: 101 },
      },
      {
        path: "user",
        component: createNameComponent(
          () => import("@/views/main/systemManage/users/index.vue")
        ),
        meta: { title: "message.menu.systemManage.user", menuId: 100 },
      },
    ],
  },
];

export default route;
