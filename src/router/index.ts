import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import login from '../views/loginView.vue'
import home from '../views/homeView.vue'
const goods=()=>import('../views/home/GoodsView.vue')
const user=()=>import('../views/home/UserView.vue')
const role=()=>import('../views/home/RoleView.vue')
const routes: Array<RouteRecordRaw> = [{
  path: '/login',
  name: 'login',
  component: login
},{
  path: '/',
  name: 'home',
  component: home,
  children:[{
    path:'goods',
    name:'goods',
    component:goods,
    meta:{
      isShow:true,
      title:'商品管理'
    }
  },{
    path:'user',
    name:'user',
    component:user,
    meta:{
      isShow:true,
      title:'用户管理'
    }
  },
  {
    path:'role',
    name:'role',
    component:role,
    meta:{
      isShow:true,
      title:'角色管理'
    }
  }
]
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
