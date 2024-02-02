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
    component: () => import("../view/log/base.vue"),
  },

   /* paln-计划书 */
  {
    path: "/plan",
    name: "plan",
    component: () => import("../view/plan/base.vue"),
  },
  {
    path: "/planedit",
    name: "planedit",
    component: () => import("../view/plan/planedit.vue"),
  },
  {
    path: "/planpreview",
    name: "planpreview",
    component: () => import("../view/plan/planpreview.vue"),
  },

  /* lib-实验室 */
  {
    path:"/lib",
    name:"lib",
    component:()=> import("../view/lib/base.vue"),
    children: [
      {
        path: 'fish',
        name: 'fish',
        component: () => import("../view/lib/fish.vue")   
      },
      {
        path: 'sound',
        name: 'sound',
        component: () => import("../view/lib/sound/sound.vue")   
      },
      {
        path: 'Test',
        name: 'test',
        component: () => import("../view/lib/Test/test.vue")   
      },
    ]
  },

  /* stu-学习 */
  {
    path:"/stu",
    name:"stu",
    component:()=>import("../view/Stu/base.vue"),
    children: [
      {
        path: 'DesignModule',
        name: 'DesignModule',
        component: () => import("../view/Stu/DesignModule.vue"),
        children: [
          {
            path:'jsoop',
            name:'jsoop',
            component:()=>import('../view/Stu/DesignModule/JsOOP.vue')
          },
          {
            path:'singlemodule',
            name:'singlemodule',
            component:()=>import('../view/Stu/DesignModule/singlemodule.vue')
          },
          {
            path:'strategymode',
            name:'strategymode',
            component:()=>import('../view/Stu/DesignModule/strategymode.vue')
          },
           {
            path:'agentmode',
            name:'agentmode',
            component:()=>import('../view/Stu/DesignModule/agentmode.vue')
          },
        ]
      },
    ]
  },

  /* eight-八股文 */
  {
    path:"/eight",
    name:"eight",
    component:()=>import("../view/eight/base.vue"),
    children: [
      {
        path: 'vue',
        name: 'vue',
        component: () => import("../view/eight/eightvue.vue")   
      },
      {
        path: 'vue1',
        name: 'vue1',
        component: () => import("../view/eight/eightvue.vue")   
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
