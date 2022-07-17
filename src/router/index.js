import Vue from "vue";
import VueRouter from "vue-router";
// 配置路由有两种
// 第一种 直接引入登录组件 同步加载路由 (按需)
// 只要页面已刷新，说有的页面数据全部一次性加载
// import Login from '@/views/Login'

// 第二种 直接 component: () => import("@/views/Login"), 懒加载
// 访问到某个路由的时候再去加载当前陆游的文件

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "home",
  },
  {
    path: "/login",
    component: () => import("@/views/Login"),
  },
  {
    path: "/search",
    component: () => import("@/views/Search"),
  },
  {
    path: "/",
    component: () => import("@/views/layout"),
    children: [
      {
        path: "home",
        component: () => import("@/views/home"),
      },
      {
        path: "qa",
        component: () => import("@/views/qa"),
      },
      {
        path: "video",
        component: () => import("@/views/video"),
      },
      {
        path: "my",
        component: () => import("@/views/my"),
      },
    ],
  },
  {
    path: "/art/:articleId",
    component: () => import("@/views/article"),
    // 将路由鼎泰参数映射到组件 props中，更推荐
    props: true,
  },
  // 编辑用户资料
  {
    path: "/user/profile",
    component: () => import("@/views/user-profile/index.vue"),
  },
  {
    path: "/discount",
    component: () => import("@/views/discount-coupon"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
