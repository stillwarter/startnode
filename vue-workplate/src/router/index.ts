import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

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
    component: () => import("../view/baseinfo/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
