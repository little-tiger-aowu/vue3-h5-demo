import {createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw} from 'vue-router';
import {VueCookieNext} from 'vue-cookie-next'
// @ts-ignore
import {wxShareFriend} from '@/utils/wxapi.js'

const routes: Array<RouteRecordRaw> = [
    // {
    //     path: '/login',
    //     redirect: (_) => {
    //         return {path: '/login'};
    //     }
    // },
    {
        path: '/',
        name: 'login',
        component: () => import('@/view/logon.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/view/home.vue')
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
    if (VueCookieNext.getCookie('openId')) {
        wxShareFriend()
        next()
    } else {
        if (to.path === '/') {
            next()
        } else {
            next('/')
        }
    }

})

export default router;
