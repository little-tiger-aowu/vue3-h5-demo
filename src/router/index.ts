import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { VueCookieNext } from 'vue-cookie-next'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: (_) => {
            return { path: '/home' };
        }
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
        path: '/:currentPath(.*)*', // 路由未匹配到，进入这个
        name: '404',
        component: () => import('@/view/404.vue')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

// router.beforeEach((to, from, next) => {
//     if (VueCookieNext.getCookie('token')) {
//         next()
//     } else {
//
//         if (to.path === '/home') {
//             next()
//         } else {
//             next('/home')
//         }
//     }
//
// })

export default router;
