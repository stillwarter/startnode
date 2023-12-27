import { createRouter, createWebHistory,createWebHashHistory , RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    alias: ["/home", "/home2"], // 别名，可以定义很多个
    component: () => import("../view/home/index.vue"),
    // 重定向
    // redirect: '/welcome',
    /*
    redirect: to => {
      console.log(to);
      return {
        path: '/test',
        query: {
          name: '欢迎'
        }
      }
    },
    */

    /*
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('../views/welcome.vue')    // component: import('../views/reg.vue')
      }
    ]
    */
  },
  {
    path: "/baseinfo",
    name: "baseinfo",
    component: () => import("../view/node/baseinfo/index.vue"),
  },
  {
    path: "/handfile",
    name: "handfile",
    component: () => import("../view/node/filehand/index.vue"),
  },

  /* log-日志 */
  {
    path: "/log",
    name: "log",
    component: () => import("../view/log/index.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
