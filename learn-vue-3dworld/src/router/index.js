import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

var myRoutes = [
    {
        path: '/',
        name: 'home',
        meta: { layout: "default"},
        component: require("@/pages/Home.vue").default
    },
    {
        path: '/demo',
        name: 'demo',
        meta: { layout: "default"},
        component: ()=> import("@/pages/Demo.vue")
    },
    {
        path: '/others',
        name: 'others',
        meta: { layout: "default"},
        component: ()=> import("@/pages/Others.vue")
    },
    
];

function loadView(view) {
    return () => import(/* webpackChunkName: "view-[request]" */ `@/components/${view}.vue`)
}

for(var i=1; i<=9; i++){
    myRoutes.push(
    {
        path: '/webgl' + i,
        name: 'webgl' + i,
        
        component: loadView("WebGL" + i)
    });        
}

for(var i=1; i<=9; i++){
    myRoutes.push(
    {
        path: '/tutorial' + i,
        name: 'tutorial' + i,
        
        component: loadView("GLTutorial" + i)
    });        
}

const router = new VueRouter({
    base: process.env.NODE_ENV === 'production' ?
    '/dist/' : '/',
    mode: 'history',
    routes: myRoutes
});


router.beforeEach((to, from, next) => {
    next();
});

export default router;
