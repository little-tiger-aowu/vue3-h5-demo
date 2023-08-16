import { createRouter, createWebHistory,createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { VueCookieNext } from 'vue-cookie-next'
// @ts-ignore
import {wxShareFriend} from '../utils/wxapi'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: (_) => {
            return { path: '/login' };
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/view/login.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/view/home.vue')
    },

    {
        path: '/answer',
        name: 'answer',
        component: () => import('@/view/answer.vue')
    },
    {
        path: '/prize',
        name: 'prize',
        component: () => import('@/view/prize.vue')
    },
    {
        path: '/:currentPath(.*)*', // 路由未匹配到，进入这个
        name: '404',
        component: () => import('@/view/404.vue')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    wxShareFriend()
    if (VueCookieNext.getCookie('openId')) {
        next()
    } else {
        if (to.path === '/login') {
            next()
        } else {
            next('/login')
        }
    }

})

export default router;
