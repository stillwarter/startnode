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
          {
            path:'iteratorsmode',
            name:'iteratorsmode',
            component:()=>import('../view/Stu/DesignModule/iteratorsmode.vue')
          },
          {
            path:'publishsubscriptionmode',
            name:'publishsubscriptionmode',
            component:()=>import('../view/Stu/DesignModule/publishsubscriptionmode.vue')
          },
          {
            path:'commandmode',
            name:'commandmode',
            component:()=>import('../view/Stu/DesignModule/commandmode.vue')
          },
          {
            path:'flyweightmode',
            name:'flyweightmode',
            component:()=>import('../view/Stu/DesignModule/flyweightmode.vue')
          },
        ]
      },
      {
        path: 'mdn',
        name: 'mdn',
        component: () => import("../view/Stu/MDN.vue"),
        children: [
          {
            path:'webaudio',
            name:'webaudio',
            component:()=>import('../view/Stu/MDN/webaudio.vue')
          },
        ]
      },
      {
        path: 'Vue',
        name: 'Vue',
        component: () => import("../view/Stu/VUE.vue"),
        children: [
          {
            path:'dostu',
            name:'dostu',
            component:()=>import('../view/Stu/VUE/dostu.vue')
          },
        ]
      },
      {
        path: 'React',
        name: 'React',
        component: () => import("../view/Stu/React.vue"),
        children: [
          {
            path:'laernReact',
            name:'laernReact',
            component:()=>import('../view/Stu/React/laernReact.vue')
          },
        ]
      },
      {
        path: 'Ts',
        name: 'Ts',
        component: () => import("../view/Stu/Ts.vue"),
        children: [
          {
            path:'ryfts',
            name:'ryfts',
            component:()=>import('../view/Stu/Ts/ryfTs.vue')
          },
        ]
      }
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
