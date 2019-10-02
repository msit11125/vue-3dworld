import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: require("@/pages/Home.vue").default
        },
        {
            path: '/demo',
            name: 'demo',
            component: ()=> import("@/pages/Demo.vue")
        },
        {
            path: '/others',
            name: 'others',
            component: ()=> import("@/pages/Others.vue")
        },
    ]
});


router.beforeEach((to, from, next) => {
    next();
});

export default router;
