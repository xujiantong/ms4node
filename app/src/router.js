import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: () => import(/* webpackChunkName: "index" */ './views/Index.vue'),
      children:[
        {path:"", component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')},
        {path:"/home", name:"home", component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')},
        {path:"/infoshow", name:"infoshow", component: () => import(/* webpackChunkName: "home" */ './views/InfoSHow.vue')},
        {path:"/fundlist", name:"fundlist", component: () => import(/* webpackChunkName: "home" */ './views/FundList.vue')},
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '*',
      name: '/404',
      component: () => import(/* webpackChunkName: "notfound" */ './views/404.vue')

    }
  ]
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = !!localStorage.eleToken;
  if(to.path == "/login" || to.path == "/register"){
    next();
  } else {
    isLogin ? next() : next("/login");
  }

});

export default router;