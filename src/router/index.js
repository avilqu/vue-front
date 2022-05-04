import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/auth',
        props: { auth: true },
        component: () => import('../views/Login.vue')
    },
    {
        path: '/verify/:id/:token',
        props: { verify: true },
        component: () => import('../views/Login.vue')
    },
    {
        path: '/reset-password/:id/:token',
        component: () => import('../views/PasswordReset.vue')
    },
    {
        path: '/user/:id',
        name: 'Profile',
        component: () => import('../views/Profile.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('../views/404.vue')
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

// code below is to restrict all website except login
// page to logged in users - use for private app
// router.beforeEach((to, from, next) => {
//     const publicPages = ['/login', '/auth'];
//     const authRequired = !publicPages.includes(to.path);
//     const loggedIn = localStorage.getItem('user');
//     if (authRequired && !to.params.token && !loggedIn) {
//         return next('/login');
//     }
//     next();
// });

export default router;
