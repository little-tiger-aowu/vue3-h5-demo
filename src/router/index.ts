import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import {VueCookieNext} from 'vue-cookie-next'
// @ts-ignore
import {wxShareFriend} from '../utils/wxapi'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: (_) => {
            return {path: '/home'};
        }
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/view/home.vue')
    },
    {
        path: '/rules',
        name: 'rules',
        component: () => import('@/view/rules.vue')
    },
    {
        path: '/form',
        name: 'form',
        component: () => import('@/view/form.vue')
    },
    {
        path: '/list',
        name: 'list',
        component: () => import('@/view/listPage.vue')
    },
    {
        path: '/listDetails',
        name: 'listDetails',
        component: () => import('@/view/listDetails.vue')

    },
    {
        path: '/posters',
        name: 'posters',
        component: () => import('@/view/posters.vue')
    },
    {
        path: '/ranking',
        name: 'ranking',
        component: () => import('@/view/ranking.vue')
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
        let url = `http://scanning.cdn-static.synconize.com/?helpOpenId=${VueCookieNext.getCookie('openId')}&periodId=${VueCookieNext.getCookie('periodId')}`
        wxShareFriend(url)
        next()
    } else {
        if (to.path === '/home') {
            next()
        } else {
            next('/home')
        }
    }

})

export default router;
