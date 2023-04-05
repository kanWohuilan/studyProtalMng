import { getMenuList } from "@/api/system/menu";
/** 引入vuex实例 */
import store from "@/store";

/** 引入路由相关的资源 */
import router, { modules } from "./index";
/*
 * @Date: 2023-03-25 00:58:47
 * @Description:
 */
/** 引入类型 */
import type { Route } from "./index.type";
import memberManage from "./modules/memberManage";
import SystemManage from "./modules/systemManage";

/** 登录后需要动态加入的本地路由 */
const asyncRoutes: Route[] = [
  // ...Dashboard,
  // ...Document,
  // ...Component,
  // ...Pages,
  // ...Menu,
  // ...Directive,
  // ...Chart,
  ...SystemManage,
  ...memberManage
  // ...Print,
  // ...Community,
  // ...Tab,
];
function parseMenus(menus, data) {
  return menus.map((item) => {
    if (data.some((item1) => item1.menuId === item.meta.menuId)) {
      if (item.children && item.children.length > 0) {
        return {
          ...item,
          children: parseMenus(item.children, data),
        };
      } else {
        return item;
      }
    }
  });
}

/**
 * @name 动态路由的权限新增，供登录后调用
 * @other 如果需要进行后端接口控制菜单的话，请在此拿到后端的菜单树与asyncRoutes对比，生成一个新的值
 */
async function addRoutes() {
  // 已验证完成，下面代码添加的可以实时同步至菜单中去，可以添加setTimeout(() => {}) 模拟异步代码的操作
  // 利用前端路由表模拟后端数据问题
  // 等待后端接口返回数据后再回调出去，防止刷新跳转404
  return new Promise<void>((resolve) => {
    getMenuList({}).then((res) => {
      const { data } = res;
      const routes = parseMenus(asyncRoutes, data);
      routes.forEach((item) => {
        //添加菜单和路由
        modules.push(item);
        router.addRoute(item);
      });
      resolve();
    });
    // asyncRoutes.forEach(item => {
    //   modules.push(item)
    //   router.addRoute(item)
    // })
  });
}

/**
 * @des 登录了之后会执行这个方法，实现动态路由的功能
 */
export async function getAuthRoutes() {
  // 判断token是否存在，存在则调用添加路由的方法
  if (store.state.user.token) {
    await addRoutes();
  }
}
