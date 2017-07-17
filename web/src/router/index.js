import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
export default new VueRouter({
    routes: [
        { path: '/', name: 'home', component: r => require(['src/pages/index.vue'], r) },
        { path: '/detail/:id', name: 'detail', component: r=> require(['src/pages/detail.vue'], r) },
        { path: '/cart', name: 'cart', component: r=> require(['src/pages/cart.vue'], r) }
    ]
});
